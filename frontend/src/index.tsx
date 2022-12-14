// Core Modules
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

// Custom Modules
import App from "./App";

// Styling
import "./pages/index.css";

// Routes
import routes from "./routes";

ReactDOM.render(
  <BrowserRouter>
    <ToastProvider placement="bottom-right">
      <App routes={routes} />
    </ToastProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
