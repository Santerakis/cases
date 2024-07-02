import { CountryData } from "./getTableItems";

export function filterByRange(
  data: CountryData[],
  field: keyof CountryData | "",
  min: number,
  max: number,
) {
  return data.filter((item) => {
    if (field === "") return data;
    const value = item[field];
    if (typeof value === "number") {
      return value >= min && value <= max;
    }
  });
}
