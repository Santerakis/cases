import { CaseType } from "../types";

type DateSum = {
  dateRep: string;
  cases: number;
  deaths: number;
};

export function chartFormatAndSum(
  data: CaseType[],
  countryName: keyof CaseType | string,
) {
  if (countryName === "sum") {
    // Создаем объект для хранения сумм по датам
    const dateSums: Record<string, DateSum> = {};

    // Итерация по всем записям данных
    data.forEach((record) => {
      const date = record.dateRep;
      if (!dateSums[date]) {
        dateSums[date] = { dateRep: date, cases: 0, deaths: 0 };
      }
      dateSums[date].cases += record.cases;
      dateSums[date].deaths += record.deaths;
    });

    // Преобразуем объект в массив и сортируем по датам в обратном порядке
    return Object.values(dateSums)
      .sort(
        (a, b) =>
          new Date(b.dateRep.split("/").reverse().join("-")).getTime() -
          new Date(a.dateRep.split("/").reverse().join("-")).getTime(),
      )
      .reverse();
  } else {
    // Фильтрация и реверс для конкретной страны
    return data
      .filter((record) => record.countriesAndTerritories === countryName)
      .map((record) => ({
        dateRep: record.dateRep,
        cases: record.cases,
        deaths: record.deaths,
      }))
      .reverse();
  }
}
