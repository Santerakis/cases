export function formatCountryNames(countryName: string) {
  if (countryName.length <= 11) {
    return countryName;
  } else {
    return countryName.slice(0, 11) + "..";
  }
}
