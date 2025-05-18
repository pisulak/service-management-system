export function getDiffDays(date) {
  if (!date) return undefined;
  const today = new Date();
  const [day, month, year] = date.split(".").map(Number);
  const protocolDate = new Date(year, month - 1, day);
  const diffTime = protocolDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
