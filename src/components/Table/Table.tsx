import React from "react";
import { TableHeader } from "./TableHeader";
import { Column, Sort } from "../../app/types";
import "./table.scss";
import { TableBody } from "./TableBody/TableBody";
import { TableItem } from "../../common/types";

type Table = {
  columns: Column[];
  sort?: Sort;
  tableData: TableItem[];
  onSort?: (sort: Sort) => void;
  range: string;
};

export const Table = ({ columns, sort, tableData, onSort, range }: Table) => {
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        sort={sort}
        onSort={onSort}
        range={range}
      />
      <TableBody tableData={tableData} />
    </table>
  );
};
