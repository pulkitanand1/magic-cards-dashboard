import { MagicCardItem } from "../../dataTypes/MagicCardItem";
import cardDetailsReducer, { MagicCardDetailsState } from "./cardDetailsSlice";

  
  describe("Card details slice is working.", () => {
    const initialState: MagicCardDetailsState = {
      value: {} as MagicCardItem,
      status: "idle",
    };
  
    it("should handle initial state", () => {
      expect(cardDetailsReducer(undefined, { type: "unknown" })).toEqual(
        initialState
      );
    });
  });
  