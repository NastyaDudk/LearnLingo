import React, { lazy, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import SharedLayout from "./SharedLayout/SharedLayout.jsx";
import { PrivateRoute } from "./PrivateRoute.jsx";

const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
const Teachers = lazy(() => import("../pages/Teachers/Teachers.jsx"));
const Favorites = lazy(() => import("../pages/Favorites/Favorites.jsx"));

const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      location.pathname = "/home";
    }
    if (location.pathname === "/favorites") {
      localStorage.setItem("lastPath", location.pathname);
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index path="home" element={<HomePage />} />
          <Route path="teachers" element={<Teachers />} />
          <Route
            path="favorites"
            element={
              <PrivateRoute
                redirectTo="/home"
                component={<Favorites />}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;