import { ComponentPropsWithoutRef, FC } from "react";
import { Column, Sort } from "../../../app/types";

export const TableHeader: FC<
  Omit<
    ComponentPropsWithoutRef<"thead"> & {
      columns: Column[];
      sort?: Sort;
      onSort?: (sort: Sort) => void;
      range: string;
    },
    "children"
  >
> = ({ columns, sort, onSort, range, ...restProps }) => {
  const handleSort = (key: string, sortable: boolean) => () => {
    if (!onSort || !sortable) return;
    if (sort?.key !== key) return onSort({ key, direction: "asc" });
    if (sort.direction === "desc") return onSort(null); // set default state
    return onSort({
      key,
      direction: sort?.direction === "asc" ? "desc" : "asc",
    });
  };

  return (
    <thead {...restProps}>
      <tr>
        {columns.map(({ title, key, sortable = true }) => (
          <th
            // className={sort?.key === key ? "thActive" : "th"}
            className={`${range === key ? "rangeActive" : ""} ${sort?.key === key ? "thActive" : "th"}`}
            key={key}
            onClick={handleSort(key, sortable)}
          >
            {title}
            {sort && sort.key === key && (
              <span>{sort.direction === "asc" ? " ⬆" : " ⬇"}</span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};
