import { useState } from "react";

export function useSortingFilter(onSortChange) {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const toggleSort = (key) => {
    let newOrder;

    if (sortKey !== key) {
      newOrder = "desc";
    } else {
      newOrder = sortOrder === "asc" ? "desc" : "asc";
    }

    setSortKey(key);
    setSortOrder(newOrder);
    onSortChange?.(key, newOrder);
  };

  return {
    sortKey,
    sortOrder,
    toggleSort,
  };
}
