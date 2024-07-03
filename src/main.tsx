import React from "react";
import ReactDOM from "react-dom/client";
import App, { router } from "./App.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./lib/Auth.tsx";
/**
 * @deprecated Use {@link myNotDeprecatedFunction} instead.
 */

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
