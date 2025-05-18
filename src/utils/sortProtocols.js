export function sortProtocolsByDate(data, ascending = true) {
  return [...data].sort((a, b) => {
    const [aDay, aMonth, aYear] = a.date.split(".").map(Number);
    const [bDay, bMonth, bYear] = b.date.split(".").map(Number);

    const dateA = new Date(aYear, aMonth - 1, aDay);
    const dateB = new Date(bYear, bMonth - 1, bDay);

    return ascending ? dateA - dateB : dateB - dateA;
  });
}
