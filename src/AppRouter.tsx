import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Signin from "./Login/Signin";
import PasswordChange from "./Login/PasswordChange";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index Component={App} />
          <Route path="signin" Component={Signin} />
          <Route path="passwordChange" Component={PasswordChange} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
