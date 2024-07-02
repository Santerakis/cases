import { CaseType } from "../types";
import { slashToDashDate } from "./slashToDashDate";

export function FilterByDate(
  date: CaseType[],
  startDate: string,
  endDate: string,
) {
  return date.filter((item: any) => {
    const itemDate = new Date(slashToDashDate(item.dateRep));
    return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
  });
}
