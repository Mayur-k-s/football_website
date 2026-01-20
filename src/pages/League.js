import React, { useState } from 'react';

const League = () => {
    // Track which cards are flipped
    const [flipped, setFlipped] = useState([false, false, false]);

    const toggleFlip = (index) => {
        const newFlipped = [...flipped];
        newFlipped[index] = !newFlipped[index];
        setFlipped(newFlipped);
    };

    const teams = [
        { name: "Real Madrid", league: "La Liga", color: "bg-blue-600" },
        { name: "Manchester City", league: "Premier League", color: "bg-sky-400" },
        { name: "Bayern Munich", league: "Bundesliga", color: "bg-red-600" }
    ];

    return (
        <div className="min-h-screen bg-zinc-900 text-white p-10 flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-12">Global Leagues</h2>

            <div className="flex gap-8 perspective-1000">
                {teams.map((team, index) => (
                    <div
                        key={index}
                        onClick={() => toggleFlip(index)}
                        className="relative w-64 h-80 cursor-pointer transition-all duration-500 preserve-3d"
                        style={{ transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                    >
                        {/* Front of Card */}
                        <div className="absolute inset-0 backface-hidden bg-zinc-800 border border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 shadow-xl">
                            <div className="w-16 h-16 bg-white/10 rounded-full mb-4 flex items-center justify-center">
                                🏆
                            </div>
                            <h3 className="text-xl font-semibold text-gray-400">{team.league}</h3>
                            <p className="mt-4 text-sm uppercase tracking-widest text-blue-400 font-bold">Click to Reveal</p>
                        </div>

                        {/* Back of Card (Team Name) */}
                        <div
                            className={`absolute inset-0 backface-hidden ${team.color} rounded-2xl flex items-center justify-center p-6 shadow-2xl`}
                            style={{ transform: 'rotateY(180deg)' }}
                        >
                            <h2 className="text-3xl font-black text-center uppercase leading-tight">
                                {team.name}
                            </h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default League;
