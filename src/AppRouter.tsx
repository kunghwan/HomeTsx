import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginBrowser from "./LoginBrowser";
import ContentN from "./list/ContentN";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={LoginBrowser} />
        <Route path="/intr" Component={ContentN} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
