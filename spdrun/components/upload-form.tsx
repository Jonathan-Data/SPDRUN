"use client";
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '@/lib/firebase';

export default function UploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');

    const handleUpload = async () => {
        if (!file || !title) return;

        try {
            // Upload video
            const storageRef = ref(storage, `videos/${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const videoUrl = await getDownloadURL(snapshot.ref);

            // Save metadata to Firestore
            await addDoc(collection(db, 'videos'), {
                title,
                videoUrl,
                runner: "Anonymous", // Replace with auth user
                views: 0,
                timestamp: serverTimestamp()
            });

            alert('Speedrun uploaded successfully!');
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    return (
        <div className="p-4 bg-gray-800 rounded-lg">
            <input
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <input
                placeholder="Speedrun title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}