import { intialFilterState } from "../../utils/DropdownData";
import filtersReducer, { FiltersState } from "./filtersSlice";
  
  describe("Filters Slice is working.", () => {
    const initialState: FiltersState = {
      value: intialFilterState,
      status: "idle",
    };
  
    it("should handle initial state", () => {
      expect(filtersReducer(undefined, { type: "unknown" })).toEqual(
        initialState
      );
    });
  });
  