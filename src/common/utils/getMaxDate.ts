import { CaseType } from "../types";
import { slashToDashDate } from "./slashToDashDate";

export function initMax(initialData: CaseType[]) {
  const dates = initialData.map((item) => slashToDashDate(item.dateRep));
  return dates.reduce((max, date) => (date > max ? date : max), dates[0]);
}
