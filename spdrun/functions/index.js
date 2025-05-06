const functions = require('firebase-functions');
const admin = require('firebase-admin');
const ffmpeg = require('fluent-ffmpeg');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const os = require('os');
const fs = require('fs');

admin.initializeApp();
const gcs = new Storage();

exports.transcodeVideo = functions.storage.object().onFinalize(async (object) => {
  const fileBucket = object.bucket;
  const filePath = object.name;
  const contentType = object.contentType;

  // Exit if not video
  if (!contentType.startsWith('video/')) return null;

  const fileName = path.basename(filePath);
  const bucket = gcs.bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const tempTranscodedPath = path.join(os.tmpdir(), `transcoded_${fileName}`);

  // Download original
  await bucket.file(filePath).download({ destination: tempFilePath });

  // Transcode to multiple resolutions
  const resolutions = [
    { suffix: '_720p', size: '1280x720' },
    { suffix: '_480p', size: '854x480' },
    { suffix: '_360p', size: '640x360' }
  ];

  const transcodeJobs = resolutions.map(res => {
    return new Promise((resolve, reject) => {
      ffmpeg(tempFilePath)
        .size(res.size)
        .output(tempTranscodedPath.replace('.mp4', `${res.suffix}.mp4`))
        .on('end', resolve)
        .on('error', reject)
        .run();
    });
  });

  await Promise.all(transcodeJobs);

  // Upload transcoded versions
  const uploadJobs = resolutions.map(res => {
    const transcodedFileName = fileName.replace('.mp4', `${res.suffix}.mp4`);
    return bucket.upload(
      tempTranscodedPath.replace('.mp4', `${res.suffix}.mp4`)),
      { destination: `transcoded/${transcodedFileName}` }
    );
  });

  await Promise.all(uploadJobs);

  // Update Firestore
  const videoId = path.basename(filePath, path.extname(filePath));
  const db = admin.firestore();
  await db.collection('videos').doc(videoId).update({
    transcoded: true,
    resolutions: resolutions.map(res => ({
      quality: res.suffix.replace('_', ''),
      url: `transcoded/${fileName.replace('.mp4', `${res.suffix}.mp4`)}`
    }))
  });

  // Cleanup
  resolutions.forEach(res => {
    fs.unlinkSync(tempTranscodedPath.replace('.mp4', `${res.suffix}.mp4`)));
  });
  fs.unlinkSync(tempFilePath);

  return null;
});
