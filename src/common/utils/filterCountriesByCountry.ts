import { CountryData } from "./getTableItems";

export function filterCountriesByCountry(
  arr: CountryData[],
  searchString: string,
) {
  if (searchString === "allStates") {
    return arr;
  } else if (searchString === "sumStates") {
    const sumResult = arr.reduce(
      (acc, curr) => {
        acc.cases += curr.cases;
        acc.deaths += curr.deaths;
        acc.allCases += curr.allCases;
        acc.allDeaths += curr.allDeaths;
        acc.popData2019 += curr.popData2019;
        return acc;
      },
      {
        country: "Сумма",
        cases: 0,
        deaths: 0,
        allCases: 0,
        allDeaths: 0,
        casesPer1000: 0,
        deathsPer1000: 0,
        popData2019: 0,
      },
    );

    sumResult.casesPer1000 = Math.round(
      (sumResult.allCases / sumResult.popData2019) * 1000,
    );
    sumResult.deathsPer1000 = Number(
      ((sumResult.allDeaths / sumResult.popData2019) * 1000).toFixed(2),
    );

    return [sumResult];
  }

  return arr.filter((item) => item.country.includes(searchString));
}
