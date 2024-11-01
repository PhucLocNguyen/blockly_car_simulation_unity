import React, { Fragment, Suspense, useState } from "react";
import "./App.css";

import "./generator/generator";
import { withTranslation } from "react-i18next";
import { Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import { publicRoutes } from "./routes/Route";
import DefaultLayout from "./Components/Layouts/DefaultLayout";
import { ToastContainer } from "react-toastify";
function App(props) {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {publicRoutes.map((route, index) => {
            let Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              // Route cho nhung thanh phan cha
              <Route
                key={index}
                index={route.index ? true : undefined}
                path={route.index ? undefined : route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              >
                {/* Route neu co child trong file Route.jsx */}
                {route.children &&
                  route.children.map((childRoute, childIndex) => {
                    let ChildPage = childRoute.component;
                    return (
                      <Route
                        key={childIndex}
                        index={childRoute.index ? true : undefined}
                        path={childRoute.index ? undefined : childRoute.path}
                        element={<ChildPage />}
                      />
                    );
                  })}
              </Route>
                
            );
          })}
          
        </Routes>
      </Suspense>
      <ToastContainer />
    </AuthProvider>
  );
}

export default withTranslation()(App);
