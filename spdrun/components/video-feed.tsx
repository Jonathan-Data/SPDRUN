"use client";
import { useEffect, useRef } from 'react';

export default function VideoFeed() {
    const videos = [
        { id: 1, title: 'Minecraft Any% WR', url: '/videos/speedrun1.mp4' },
        { id: 2, title: 'Celeste 100%', url: '/videos/speedrun2.mp4' },
    ];

    // Properly typed ref array
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    // Correct ref callback - no return value
    const setVideoRef = (index: number) => (el: HTMLVideoElement | null) => {
        videoRefs.current[index] = el;
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const video = entry.target as HTMLVideoElement;
                    if (entry.isIntersecting) {
                        video.play().catch(console.error);
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.8 }
        );

        videoRefs.current.forEach(video => {
            if (video) observer.observe(video);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="space-y-6">
            {videos.map((video, index) => (
                <div key={video.id} className="bg-gray-800 rounded-xl overflow-hidden">
                    <video
                        ref={setVideoRef(index)}  // Fixed ref assignment
                        src={video.url}
                        loop
                        muted
                        className="w-full aspect-video bg-black"
                        playsInline
                    />
                    {/* ... rest of your component ... */}
                </div>
            ))}
        </div>
    );
}