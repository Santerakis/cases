import { CaseType } from "../types";

export function getUniqueCountries(data: CaseType[]) {
  const countries = data.map((item) => item.countriesAndTerritories);
  return Array.from(new Set(countries));
}
