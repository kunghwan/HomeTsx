import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { lazy, Suspense } from "react";
import Layout from "./layouts/Layout";

const Product = lazy(() => import("./UI/Product"));
const Loading = lazy(() => import("./Loading/index"));
const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Layout}>
            <Route index Component={Home} />
            <Route path="product" Component={Product} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRouter;
