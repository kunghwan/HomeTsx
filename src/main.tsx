import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import StudentApp from "./StudentApp";
import RContainer from "./r/RContainer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <StudentApp /> */}
    <RContainer />
  </StrictMode>
);
