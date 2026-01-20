import React from "react";

function PlayerCard({ player }) {
  return (
    <div className="player-card">
      <strong>{player.name}</strong>
      <div>{player.position}</div>
      <div>{player.rating}</div>
    </div>
  );
}

export default PlayerCard;
