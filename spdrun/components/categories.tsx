export default function Categories() {
    const categories = [
        'Any%', 'Glitchless', '100%', 'Low%',
        'Meme Runs', 'TAS', 'Co-op', 'Randomizer'
    ];

    return (
        <div className="bg-gray-800 rounded-lg p-4 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <div className="space-y-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className="w-full text-left p-2 hover:bg-gray-700 rounded transition"
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}