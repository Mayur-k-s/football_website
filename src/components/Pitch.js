import React, { useState } from "react";
import {
  DndContext,
  useDroppable,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import PlayerCard from "./PlayerCard.js";

const POSITIONS = {
  GK: { top: "80%", left: "45%" },
  CB: { top: "60%", left: "45%" },
  CM: { top: "40%", left: "45%" },
  ST: { top: "20%", left: "45%" }
};

function Slot({ id, player, style }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="position-slot"
      style={{
        ...style,
        background: isOver ? "rgba(255,255,255,0.25)" : "transparent"
      }}
    >
      {player && <PlayerCard player={player} />}
    </div>
  );
}

function Pitch({ squad, setSquad }) {
  const [activePlayer, setActivePlayer] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }
    })
  );

  function handleDragStart(event) {
    setActivePlayer(event.active.data.current.player);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (over) {
      setSquad(prev => ({
        ...prev,
        [over.id]: {
          ...active.data.current.player,
          assignedPosition: over.id
        }
      }));
    }

    setActivePlayer(null);
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="pitch">
        {Object.entries(POSITIONS).map(([pos, style]) => (
          <Slot
            key={pos}
            id={pos}
            style={style}
            player={squad[pos]}
          />
        ))}
      </div>

      {/* 🔥 THIS MAKES THE FULL CARD MOVE */}
      <DragOverlay>
        {activePlayer ? <PlayerCard player={activePlayer} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

export default Pitch;
