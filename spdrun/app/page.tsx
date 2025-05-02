import VideoFeed from '@/components/video-feed';

export default function Home() {
  return (
      <main className="min-h-screen bg-gray-900 p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="w-full md:w-1/2 bg-gray-800 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">🔥 Trending Speedruns</h2>
            <VideoFeed /> {/* Replaced the placeholder */}
          </div>

          {/* ... keep your leaderboard code ... */}
        </div>
      </main>
  );
}