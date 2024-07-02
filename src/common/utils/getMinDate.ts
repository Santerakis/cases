import { CaseType } from "../types";
import { slashToDashDate } from "./slashToDashDate";

export function initMin(initialData: CaseType[]) {
  const dates = initialData.map((item) => slashToDashDate(item.dateRep));
  return dates.reduce((min, date) => (date < min ? date : min), dates[0]);
}
