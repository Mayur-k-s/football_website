export function calculateStrength(squad) {
  const players = Object.values(squad);
  if (!players.length) return 0;

  const total = players.reduce((sum, p) => sum + p.rating, 0);
  return Math.round(total / players.length);
}

export function calculateChemistry(squad) {
  const players = Object.values(squad);
  let chemistry = 0;

  players.forEach(p => {
    if (p.position === p.assignedPosition) chemistry += 10;
  });

  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      if (players[i].nationality === players[j].nationality)
        chemistry += 5;
      if (players[i].club === players[j].club)
        chemistry += 5;
    }
  }

  return chemistry;
}
