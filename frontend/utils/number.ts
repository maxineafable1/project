export function formatWeight(valKg: number) {
  const kg = Number.isInteger(valKg)
    ? valKg
    : Number(valKg.toFixed(0));

  const lbRaw = valKg * 2.205;
  const lb = Number.isInteger(lbRaw)
    ? lbRaw
    : Number(lbRaw.toFixed(2));

  return `${kg} kg (${lb} lb)`
}
