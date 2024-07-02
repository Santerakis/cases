import { CountryData } from "./getTableItems";

export function getMinMax(
  arr: CountryData[],
  property: keyof CountryData | "",
) {
  // if (arr.length === 0) {
  //   return { min: null, max: null };
  // }
  if (property === "country" || property === "") return { min: 0, max: 0 };
  const values = arr.map((item) => item[property]);

  const min = Math.min(...values);
  const max = Math.max(...values);

  return { min, max };
}
