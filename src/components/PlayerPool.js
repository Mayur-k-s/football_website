import React from "react";
import { useDraggable } from "@dnd-kit/core";
import PlayerCard from "./PlayerCard.js";

function DraggablePlayer({ player }) {
  const { setNodeRef, listeners, attributes } = useDraggable({
    id: player.id,
    data: { player }
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      <PlayerCard player={player} />
    </div>
  );
}

function PlayerPool({ players }) {
  return (
    <div className="player-pool">
      <h3>Players</h3>
      {players.map(p => (
        <DraggablePlayer key={p.id} player={p} />
      ))}
    </div>
  );
}

export default PlayerPool;
