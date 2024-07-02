import { CaseType } from "../types";

export type CountryData = {
  country: string;
  cases: number;
  deaths: number;
  allCases: number;
  allDeaths: number;
  casesPer1000: number;
  deathsPer1000: number;
  popData2019: number;
};

export function getTableItems(data: CaseType[]): CountryData[] {
  const countryData: Record<string, CountryData> = {};

  data.forEach((entry) => {
    const { countriesAndTerritories, cases, deaths, popData2019 } = entry;

    if (!countryData[countriesAndTerritories]) {
      countryData[countriesAndTerritories] = {
        country: countriesAndTerritories,
        cases,
        deaths,
        allCases: 0, // Инициализируем allCases значением 0
        allDeaths: 0, // Инициализируем allDeaths значением 0
        casesPer1000: 0,
        deathsPer1000: 0,
        popData2019,
      };
    }

    countryData[countriesAndTerritories].allCases += cases;
    countryData[countriesAndTerritories].allDeaths += deaths;
  });

  Object.keys(countryData).forEach((country) => {
    const { allCases, allDeaths, popData2019 } = countryData[country];

    const casesPer1000 = Number(((allCases / popData2019!) * 1000).toFixed(2));
    if (Number.isFinite(casesPer1000)) {
      countryData[country].casesPer1000 = casesPer1000;
    }
    const deathsPer1000 = Number(
      ((allDeaths / popData2019!) * 1000).toFixed(2),
    );
    if (Number.isFinite(deathsPer1000)) {
      countryData[country].deathsPer1000 = deathsPer1000;
    }
    // countryData[country].casesPer1000 = Number(
    //   ((allCases / popData2019!) * 1000).toFixed(2),
    // );
    // countryData[country].deathsPer1000 = Number(
    //   (allDeaths / (popData2019! / 1000)).toFixed(2),
    // );

    // delete countryData[country].popData2019;
  });

  return Object.values(countryData);
}
