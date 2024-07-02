import React, { useState } from "react";
import { CountryData, getTableItems } from "../../common/utils/getTableItems";
import { getMinMax } from "../../common/utils/getMinMax";
import { Table } from "../../components/Table/Table";
import { columns } from "../../app/data";
import Loader from "../../components/Loader/Loader";
import { Pagination } from "../../components/Pagination";
import { createOptions } from "../../common/utils/createOptions";
import { useAppSelector } from "../../app/store";
import { sortByField } from "../../common/utils/sortByField";
import { CaseType, TableItem } from "../../common/types";
import { filterByRange } from "../../common/utils/filterByRange";
import { filterCountriesByCountry } from "../../common/utils/filterCountriesByCountry";
import { paginate } from "../../common/utils/paginate";
import { Sort } from "../../app/types";

type TablePage = {
  data: CaseType[];
};

export const TablePage = ({ data }: TablePage) => {
  const countries = useAppSelector((state) => state.app.countries);
  const [selectValue, setSelectValue] = useState("allStates");
  const [rangeValue, setRangeValue] = useState<keyof CountryData | "">("");
  const [pageNumber, setPageNumber] = useState(1);
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(0);
  const [sort, setSort] = useState<Sort>(null);
  const [pageSize, setPageSize] = useState(5);

  const mappedOptions = createOptions(countries, [
    { value: "allStates", title: "Все страны" },
    { value: "sumStates", title: "Сумма" },
  ]);

  const rangeParams = [
    "",
    "cases",
    "deaths",
    "allCases",
    "allDeaths",
    "casesPer1000",
    "deathsPer1000",
  ];
  const mappedOptionsForRange: any[] = rangeParams.map((o) => {
    return (
      <option key={o} value={o}>
        {o}
      </option>
    );
  });

  const tableItems = getTableItems(data);
  const sortedData = sortByField(
    tableItems,
    sort?.key as keyof TableItem,
    sort?.direction,
  );
  const filteredByRange = filterByRange(
    sortedData,
    rangeValue,
    minRange,
    maxRange,
  );
  const filteredByCountry = filterCountriesByCountry(
    filteredByRange,
    selectValue,
  );
  const tableData = paginate(filteredByCountry, pageNumber, pageSize);

  return (
    <div className="container">
      <select
        title="Выберите страну"
        style={{ width: "100px" }}
        onChange={(e) => {
          setSelectValue(e.currentTarget.value);
        }}
        value={selectValue}
      >
        {mappedOptions}
      </select>
      <select
        title="Выберите столбец"
        style={{ width: "115px" }}
        onChange={(e) => {
          setRangeValue(e.currentTarget.value as keyof CountryData);
          setPageNumber(1);
          // setMinMaxRange(
          //   getMinMax(tableItems, e.currentTarget.value as keyof CountryData),
          // );
          setMaxRange(
            getMinMax(tableItems, e.currentTarget.value as keyof CountryData)
              .max,
          );
          setMinRange(
            getMinMax(tableItems, e.currentTarget.value as keyof CountryData)
              .min,
          );
        }}
        value={rangeValue}
      >
        {mappedOptionsForRange}
      </select>
      <input
        style={{ width: 50 }}
        type="number"
        value={rangeValue === "" ? "" : minRange}
        onChange={(e) => {
          setMinRange(+e.currentTarget.value);
          setPageNumber(1);
        }}
      />
      <input
        style={{ width: 60 }}
        type="number"
        value={rangeValue === "" ? "" : maxRange}
        onChange={(e) => {
          setMaxRange(+e.currentTarget.value);
          setPageNumber(1);
        }}
      />

      <Table
        columns={columns}
        sort={sort}
        onSort={setSort}
        tableData={tableData}
        range={rangeValue}
      />

      {tableData.length ? "" : <Loader />}

      <Pagination
        totalItems={filteredByRange.length}
        currentPage={pageNumber}
        onPageChange={setPageNumber}
        itemsPerPage={pageSize}
        onItemsPerPageChange={setPageSize}
      />
    </div>
  );
};
