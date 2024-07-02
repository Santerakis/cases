import React from "react";
import { TableItem } from "../../../common/types";
import { formatCountryNames } from "../../../common/utils/shortCountry";

type TableBody = {
  tableData: TableItem[];
};
// country, cases, deaths, allCases, allDeaths, casesPer1000, deathsPer1000

export const TableBody = ({ tableData }: TableBody) => {
  return (
    <tbody>
      {tableData.map((country, index) => (
        <tr key={index} className={index % 2 === 0 ? "" : "tr"}>
          <td title={country.country} className="td">
            {formatCountryNames(country.country)}
          </td>
          <td className="td">{country.cases}</td>
          <td className="td">{country.deaths}</td>
          <td className="td">{country.allCases}</td>
          <td className="td">{country.allDeaths}</td>
          <td className="td">{country.casesPer1000}</td>
          <td className="td">{country.deathsPer1000}</td>
        </tr>
      ))}
    </tbody>
  );
};
