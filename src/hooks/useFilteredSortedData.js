import { useState, useMemo } from "react";
import { filterAndSortData } from "../utils/storageDataUtils";

export function useFilteredSortedData(initialData) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredData = useMemo(() => {
    return filterAndSortData(initialData, searchTerm, sortKey, sortOrder);
  }, [initialData, searchTerm, sortKey, sortOrder]);

  return {
    searchTerm,
    setSearchTerm,
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
    filteredData,
  };
}
