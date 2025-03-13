import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Person from "./0313실험/Person";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Person />
  </StrictMode>
);
