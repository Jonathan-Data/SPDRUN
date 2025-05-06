"use client";
import { useEffect, useRef, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Video = {
    id: string;
    title: string;
    videoUrl: string;
    runner: string;
    time: string;
    views: number;
    thumbnailUrl?: string;
};

export default function VideoFeed() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    useEffect(() => {
        const q = query(collection(db, 'videos'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const videosData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Video[];
            setVideos(videosData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <div className="text-center py-8">Loading speedruns...</div>;

    return (
        <div className="space-y-6">
            {videos.map((video, i) => (
                <div key={video.id} className="bg-gray-800 rounded-xl overflow-hidden">
                    <video
                        ref={el => videoRefs.current[i] = el}
                        src={video.videoUrl}
                        // ... other video props
                    />
                    {/* ... video metadata display ... */}
                </div>
            ))}
        </div>
    );
}