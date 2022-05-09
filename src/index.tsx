import React from "react";
import ReactDOM from "react-dom/client";
import "./common.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// Disabling it by default as it calls useEffect() twice
// which isn't ideal for calling APIs on render.
const enableStrictMode = false;
root.render(
  enableStrictMode ? (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  ) : (
    <Provider store={store}>
      <App />
    </Provider>
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
