import { TableItem } from "../types";
import { CountryData } from "./getTableItems";

export function sortByField(
  arr: CountryData[],
  field: keyof TableItem = "country",
  direction: "asc" | "desc" = "asc",
): CountryData[] {
  if (direction !== "asc" && direction !== "desc") {
    console.error('Invalid direction. Please use "asc" or "desc".');
    return arr;
  }

  return arr.slice().sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (aValue < bValue) {
      return direction === "asc" ? -1 : 1;
    } else if (aValue > bValue) {
      return direction === "asc" ? 1 : -1;
    } else {
      return 0;
    }
  });
}
