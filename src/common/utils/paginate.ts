import { TableItem } from "../types";

export function paginate(
  array: TableItem[],
  pageNumber: number,
  pageSize: number,
) {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return array.slice(startIndex, endIndex);
}
