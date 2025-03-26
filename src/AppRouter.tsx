import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { lazy, Suspense } from "react";
import Layout from "./layouts/Layout";

const Product = lazy(() => import("./UI/Product"));
const Loading = lazy(() => import("./Loading/index"));
const MyAccount = lazy(() => import("./UI/MyAccount"));
const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Layout}>
            <Route index Component={Home} />
            <Route path="product" Component={Product} />
            <Route path="myaccount" Component={MyAccount} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRouter;
