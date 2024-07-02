import axios from "axios";
import { ResponseApiType } from "../common/types";

// Api
const instance = axios.create({
  baseURL: "https://opendata.ecdc.europa.eu/covid19/casedistribution/json/",
});
export const casesApi = {
  async getRecords() {
    const res = await instance.get<ResponseApiType>("");
    return res.data.records;
  },
};
