import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { DashboardFilters } from "../../dataTypes/DashboardFilters";
import { intialFilterState } from "../../utils/DropdownData";

export interface FiltersState {
  value: DashboardFilters;
  status: "idle" | "loading" | "failed";
}

const initialState : FiltersState = {
  value: intialFilterState,
  status: "idle",
};

/**
 * Stores the state for dashboard filters.
 */
const FiltersSlice = createSlice({
  name: "FiltersSlice",
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const SelectFilters = (state: RootState) => state.filters.value;

export const { updateFilters } = FiltersSlice.actions;
export default FiltersSlice.reducer;
