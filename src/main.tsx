import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./Home";
import "./index.css";
import AuthProvider from "./provider/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <Home />
    </AuthProvider>
  </StrictMode>
);
