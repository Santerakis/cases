// Types
export type CaseType = {
  dateRep: string;
  day: string;
  month: string;
  year: string;
  cases: number;
  deaths: number;
  countriesAndTerritories: string;
  geoId: string;
  countryterritoryCode: string;
  popData2019: number;
  continentExp: string;
  "Cumulative_number_for_14_days_of_COVID-19_cases_per_100000": string;
};

export type ResponseApiType = {
  records: CaseType[];
};

export type TableItem = {
  country: string;
  cases: number;
  deaths: number;
  allCases: number;
  allDeaths: number;
  casesPer1000: number;
  deathsPer1000: number;
};
