import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

/**
 * To test if the Magic Cards dashboard is rendered
 * with a blank state.
 */
test("Renders Magic Cards Dashboard Application", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(getByText("Magic Cards Dashboard"));
});
