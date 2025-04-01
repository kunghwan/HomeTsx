import { BrowserRouter, Route, Routes } from "react-router-dom";

import { lazy, Suspense } from "react";
import { AUTH } from "./context";

const Home = lazy(() => import("./Home"));
const Layout = lazy(() => import("./layouts/Layout"));
const Product = lazy(() => import("./UI/Product"));
const ProductDetail = lazy(() => import("./UI/ProductDetail"));
const Loading = lazy(() => import("./Loading/index"));
const MyAccount = lazy(() => import("./UI/MyAccount"));

const AppRouter = () => {
  const { user } = AUTH.use();

  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Layout}>
            <Route index Component={Home} />
            <Route path="product">
              <Route index Component={Product} />
              <Route path=":pid" Component={ProductDetail} />
            </Route>
            <Route path="myinfo" element={<MyAccount />} />

            {user && <Route path="myinfo" element={<MyAccount {...user} />} />}
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRouter;
