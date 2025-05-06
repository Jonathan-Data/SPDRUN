import Leaderboard from '@/components/leaderboard';
import VideoFeed from '@/components/video-feed';
import Categories from '@/components/categories';

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-900 text-white">
            {/* Main grid container */}
            <div className="container mx-auto px-4 py-8 grid grid-cols-12 gap-6">

                {/* Left Column - Leaderboard (20% width) */}
                <div className="col-span-12 md:col-span-3 lg:col-span-2">
                    <Leaderboard />
                </div>

                {/* Middle Column - Video Feed (60% width) */}
                <div className="col-span-12 md:col-span-6 lg:col-span-8">
                    <VideoFeed />
                </div>

                {/* Right Column - Categories (20% width) */}
                <div className="col-span-12 md:col-span-3 lg:col-span-2">
                    <Categories />
                </div>

            </div>
        </main>
    );
}