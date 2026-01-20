import React, { useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";

/* ---------------- PLAYER DATA ---------------- */

const PLAYERS = [
  { id: "1", name: "Messi", position: "RW", rating: 93, nation: "ARG", club: "PSG" },
  { id: "2", name: "Ronaldo", position: "ST", rating: 91, nation: "POR", club: "ALN" },
  { id: "3", name: "De Bruyne", position: "CM", rating: 91, nation: "BEL", club: "MCI" },
  { id: "4", name: "Modric", position: "CM", rating: 88, nation: "CRO", club: "RMA" },
  { id: "5", name: "Salah", position: "RW", rating: 90, nation: "EGY", club: "LIV" },
  { id: "6", name: "Mbappe", position: "LW", rating: 92, nation: "FRA", club: "PSG" },
  { id: "7", name: "Van Dijk", position: "CB", rating: 90, nation: "NED", club: "LIV" },
  { id: "8", name: "Ruben Dias", position: "CB", rating: 89, nation: "POR", club: "MCI" },
  { id: "9", name: "Hakimi", position: "RB", rating: 85, nation: "MAR", club: "PSG" },
  { id: "10", name: "Theo", position: "LB", rating: 86, nation: "FRA", club: "MIL" },
  { id: "11", name: "Neuer", position: "GK", rating: 89, nation: "GER", club: "BAY" }
];

/* ---------------- FORMATION (4-3-3) ---------------- */

const POSITIONS = {
  GK: { top: "85%", left: "45%" },
  LB: { top: "65%", left: "15%" },
  CB1: { top: "65%", left: "35%" },
  CB2: { top: "65%", left: "55%" },
  RB: { top: "65%", left: "75%" },
  CM1: { top: "45%", left: "30%" },
  CM2: { top: "45%", left: "50%" },
  CM3: { top: "45%", left: "70%" },
  LW: { top: "20%", left: "20%" },
  ST: { top: "15%", left: "45%" },
  RW: { top: "20%", left: "70%" }
};

/* ---------------- COMPONENTS ---------------- */

function PlayerCard({ player }) {
  return (
    <div className="player-card">
      <strong>{player.name}</strong>
      <div>{player.position}</div>
      <div>⭐ {player.rating}</div>
      <small>{player.nation} | {player.club}</small>
    </div>
  );
}

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

function Slot({ id, player, style }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="slot"
      style={{
        ...style,
        background: isOver ? "rgba(255,255,255,0.25)" : "transparent"
      }}
    >
      {player ? <PlayerCard player={player} /> : id}
    </div>
  );
}

/* ---------------- CHEMISTRY LOGIC ---------------- */

function calculateChemistry(squad) {
  const players = Object.values(squad);
  let chemistry = 0;

  // Correct position
  players.forEach(p => {
    if (p.assignedPosition && p.assignedPosition.startsWith(p.position))
      chemistry += 10;
  });

  // Nationality & club links
  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      if (players[i].nation === players[j].nation) chemistry += 3;
      if (players[i].club === players[j].club) chemistry += 5;
    }
  }

  return chemistry;
}

function calculateStrength(squad) {
  const players = Object.values(squad);
  if (!players.length) return 0;
  return Math.round(players.reduce((s, p) => s + p.rating, 0) / players.length);
}

/* ---------------- MAIN ---------------- */

export default function TeamBuilder() {
  const [squad, setSquad] = useState({});
  const [activePlayer, setActivePlayer] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleDragStart(e) {
    setActivePlayer(e.active.data.current.player);
  }

  function handleDragEnd(e) {
    const { active, over } = e;
    if (over) {
      setSquad(prev => ({
        ...prev,
        [over.id]: { ...active.data.current.player, assignedPosition: over.id }
      }));
    }
    setActivePlayer(null);
  }

  return (
    <>
      <style>{`
        body { background:#0b3d2e; color:white; font-family:Arial }
        .layout { display:flex; gap:20px; padding:20px }
        .pool { width:240px; background:#111; padding:10px }
        .player-card {
          background:gold;
          color:black;
          padding:10px;
          border-radius:10px;
          margin-bottom:10px;
          cursor:grab;
          user-select:none;
        }
        .pitch {
          position:relative;
          width:750px;
          height:500px;
          background:linear-gradient(#1b5e20,#2e7d32);
          border-radius:18px;
        }
        .slot {
          position:absolute;
          width:100px;
          height:120px;
          border:2px dashed rgba(255,255,255,0.6);
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:12px;
        }
        .stats {
          margin-top:15px;
          font-size:18px;
        }
      `}</style>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="layout">
          <div className="pool">
            <h3>Players</h3>
            {PLAYERS.map(p => (
              <DraggablePlayer key={p.id} player={p} />
            ))}
          </div>

          <div>
            <div className="pitch">
              {Object.entries(POSITIONS).map(([pos, style]) => (
                <Slot key={pos} id={pos} style={style} player={squad[pos]} />
              ))}
            </div>

            <div className="stats">
              <div>⭐ Team Strength: {calculateStrength(squad)}</div>
              <div>🔗 Chemistry: {calculateChemistry(squad)}</div>
            </div>
          </div>
        </div>

        <DragOverlay>
          {activePlayer && <PlayerCard player={activePlayer} />}
        </DragOverlay>
      </DndContext>
    </>
  );
}
