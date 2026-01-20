import React, { useState } from 'react';

const League = () => {
  // Array of objects for the 3 league cards
  const leagues = [
    { 
      name: "Premier League", 
      color: "bg-purple-700", 
      teams: ["1. Man City", "2. Arsenal", "3. Liverpool"] 
    },
    { 
      name: "La Liga", 
      color: "bg-yellow-500", 
      teams: ["1. Real Madrid", "2. Barcelona", "3. Atletico"] 
    },
    { 
      name: "Bundesliga", 
      color: "bg-red-700", 
      teams: ["1. Bayern Munich", "2. Leverkusen", "3. Dortmund"] 
    }
  ];

  const [flipped, setFlipped] = useState([false, false, false]);

  const toggleFlip = (index) => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-zinc-900 text-white p-6">
      <h1 className="text-4xl font-black mb-12 uppercase tracking-widest text-blue-500">
        Global League Standings
      </h1>
      
      {/* Centered Container */}
      <div className="flex flex-wrap justify-center gap-10 perspective-1000">
        {leagues.map((league, index) => (
          <div 
            key={index}
            onClick={() => toggleFlip(index)}
            className="relative w-80 h-48 cursor-pointer transition-all duration-700 preserve-3d"
            style={{ transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            {/* FRONT: League Name */}
            <div className="absolute inset-0 backface-hidden bg-zinc-800 border-2 border-white/10 rounded-xl flex items-center justify-center shadow-2xl">
              <h3 className="text-2xl font-bold uppercase tracking-tighter">{league.name}</h3>
              <div className="absolute bottom-4 text-xs text-gray-500 font-mono">CLICK TO REVEAL TOP 3</div>
            </div>

            {/* BACK: Top 3 Teams */}
            <div 
              className={`absolute inset-0 backface-hidden ${league.color} rounded-xl flex flex-col items-center justify-center shadow-2xl`}
              style={{ transform: 'rotateY(180deg)' }}
            >
              <h4 className="text-sm font-bold mb-2 opacity-80 uppercase">Top 3 Teams</h4>
              {league.teams.map((team, i) => (
                <p key={i} className="text-xl font-black italic uppercase">{team}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default League;