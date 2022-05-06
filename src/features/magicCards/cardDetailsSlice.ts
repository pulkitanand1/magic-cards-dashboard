import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { MagicCardItem } from "../../dataTypes/MagicCardItem";
import { getCardDetailsAsync } from "./magicCardsAPI";

export interface MagicCardDetailsState {
  value: MagicCardItem;
  state: "idle" | "loading" | "failed";
}

const initialState = {
  value: {} as MagicCardItem,
  status: "idle",
};

export const getDetailsForCardAsync = createAsyncThunk(
  "cards/getCardDetails",
  async (id: string) => {
    const magicCardDetails = await getCardDetailsAsync(id).then(
      (card) => card as MagicCardItem
    );
    return magicCardDetails;
  }
);

const cardDetailsSlice = createSlice({
  name: "magicCardDetails",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDetailsForCardAsync.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(getDetailsForCardAsync.fulfilled, (state, action) => {
        state.value = action.payload;
        state.status = "idle";
      }),
      builder.addCase(getDetailsForCardAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectCardDetails = (state: RootState) => state.cardDetails.value;

export default cardDetailsSlice.reducer;
