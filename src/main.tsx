import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Person from "./0313실험/Person";
import Silder2 from "./슬라이드쇼 실험/Silder2";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {/* <Person /> */}
    <Silder2 />
  </StrictMode>
);
