"use client";
import { useEffect, useRef } from 'react';

export default function VideoFeed() {
    const videos = [
        { id: 1, url: '/videos/speedrun1.mp4', title: 'Minecraft Any% World Record' },
        { id: 2, url: '/videos/speedrun2.mp4', title: 'Celeste Farewell 100%' },
    ];

    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const video = entry.target as HTMLVideoElement;
                    if (entry.isIntersecting) {
                        video.play().catch(error => {
                            console.error('Video playback failed:', error);
                            // Optional: Show user feedback
                        });
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.5 }
        );

        videoRefs.current.forEach(video => {
            if (video) observer.observe(video);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="h-screen snap-y snap-mandatory overflow-y-scroll">
            {videos.map((video, index) => (
                <div key={video.id} className="h-screen snap-start relative">
                    <video
                        ref={(el) => {
                            videoRefs.current[index] = el;
                        }}
                        src={video.url}
                        loop
                        muted
                        className="w-full h-full object-cover"
                        playsInline // Important for mobile Safari
                    />
                    <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">{video.title}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}