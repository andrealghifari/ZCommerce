import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { Provider } from "react-redux";
import { configureStore, createReducer } from "@reduxjs/toolkit";
import cardReducer from "./state";
const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({
  reducer: { cart: cardReducer },
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
