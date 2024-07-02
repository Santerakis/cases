import { useEffect, useState } from "react";
import { useAppSelector } from "./store";
import { appActions, appThunks } from "./appSlice";
import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { getUniqueCountries } from "../common/utils/getUniqueCountries";
import { initMin } from "../common/utils/getMinDate";
import { initMax } from "../common/utils/getMaxDate";
import { FilterByDate } from "../common/utils/FilterByDate";
import "./App.css";
import { CartPage } from "../pages/ChartPage/CartPage";
import { TablePage } from "../pages/TablePage/TablePage";

const App = () => {
  const rec = useAppSelector((state) => state.app.records);
  const dispatch = useAppDispatch();
  const [startConst, setStartConst] = useState<string>(() => initMin(rec));
  const [endConst, setEndConst] = useState<string>(() => initMax(rec));
  const [startDate, setStartDate] = useState<string>(() => initMin(rec));
  const [endDate, setEndDate] = useState<string>(() => initMax(rec));

  useEffect(() => {
    setStartConst(initMin(rec));
    setEndConst(initMax(rec));
    setStartDate(initMin(rec));
    setEndDate(initMax(rec));
    dispatch(appActions.setCountries({ countries: getUniqueCountries(rec) }));
  }, [rec]);

  useEffect(() => {
    dispatch(appThunks.setRecords());
  }, [dispatch]);

  const filteredByDate = FilterByDate(rec, startDate, endDate);

  return (
    <div className="container">
      <label>Начальная дата: </label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        min={startConst}
        max={endConst}
      />
      <label>Конечная дата: </label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        min={startConst}
        max={endConst}
      />

      <TablePage data={filteredByDate} />
      <CartPage data={filteredByDate} />
    </div>
  );
};
export default App;
