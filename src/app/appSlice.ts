import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { casesApi } from "../api/cases-api";
import { CaseType } from "../common/types";

const slice = createSlice({
  name: "app",
  initialState: {
    records: [] as CaseType[],
    countries: [] as string[],
  },
  reducers: {
    setCountries: (state, action: PayloadAction<{ countries: string[] }>) => {
      state.countries = action.payload.countries;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setRecords.fulfilled, (state, action) => {
      state.records = action.payload.records;
    });
  },
});

//thunks
const setRecords = createAsyncThunk("app/setRecords", async () => {
  const res = await casesApi.getRecords();
  return { records: res };
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export const appThunks = { setRecords };
