import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./context/Loading";
import { Suspense, lazy } from "react";

const App = lazy(() => import("./App"));
const Signin = lazy(() => import("./Login/Signin"));
const PasswordChange = lazy(() => import("./Login/PasswordChange"));
const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index Component={App} />
            <Route path="signin" Component={Signin} />
            <Route path="passwordChange" Component={PasswordChange} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRouter;
