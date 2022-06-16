import cardsDashboardReducer, {
  CardsDashboardState,
} from "./cardsDashboardSlice";

describe("Cards dashboard slice is working.", () => {
  const initialState: CardsDashboardState = {
    value: [],
    status: "idle",
  };

  it("should handle initial state", () => {
    expect(cardsDashboardReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });
});
