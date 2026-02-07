export function formatWeight(valKg: number) {
  const kg = Number.isInteger(valKg)
    ? valKg
    : +valKg.toFixed(2);

  const lbRaw = kg * 2.205;
  const lb = Number.isInteger(lbRaw)
    ? lbRaw
    : Number(lbRaw.toFixed(2));

  return `${kg} kg (${lb} lb)`
}
