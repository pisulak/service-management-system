export function filterAndSortData(data, searchTerm, sortKey, sortOrder) {
  const lower = searchTerm.toLowerCase();

  const filtered = data.filter((item) =>
    Object.values(item).some((val) => String(val).toLowerCase().includes(lower))
  );

  if (!sortKey) return filtered;

  return [...filtered].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];

    if (typeof valA === "number" && typeof valB === "number") {
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }

    return sortOrder === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });
}
