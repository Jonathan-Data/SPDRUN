export default function Leaderboard() {
    return (
        <div className="bg-gray-800 rounded-lg p-4 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Recent runs</h2>
            <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between p-2 bg-gray-700 rounded">
                        <span>{i+1}. Player{i+1}</span>
                        <span className="text-yellow-400">4:3{i}2.10</span>
                    </div>
                ))}
            </div>
        </div>
    );
}