import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { MagicCardItem } from "../../dataTypes/MagicCardItem";
import { fetchCardsAsync } from "./magicCardsAPI";

export interface CardsDashboardState {
  value: MagicCardItem[];
  status: "idle" | "loading" | "failed";
}

const initialState = {
  value: [],
  status: "idle",
} as CardsDashboardState;

export const getCardsForDashboardAsync = createAsyncThunk(
  "cards/getDashboardData",
  async () => {
    const magicCards = await fetchCardsAsync().then((data) =>
      data.map((d) => d as MagicCardItem)
    );
    return magicCards;
  }
);

const cardsDashboardSlice = createSlice({
  name: "magicCards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCardsForDashboardAsync.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(getCardsForDashboardAsync.fulfilled, (state, action) => {
        state.value = action.payload;
        state.status = "idle";
      }),
      builder.addCase(getCardsForDashboardAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectCards = (state: RootState) => state.cardsOnDashboard.value;

export default cardsDashboardSlice.reducer;
