import React, { Fragment, Suspense, useContext, useEffect, useState } from "react";
import "./App.css";

import "./generator/generator";
import { withTranslation } from "react-i18next";
import { Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import LanguageProvider, { LanguageContext } from "./context/LanguageProvider";

import { publicRoutes } from "./routes/Route";
import DefaultLayout from "./Components/Layouts/DefaultLayout";
import { ToastContainer } from "react-toastify";
import i18n from "./languages/i18n";
function App(props) {
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    const blocklySvg = document.querySelector(".blocklySvg");
    if (blocklySvg) {
      blocklySvg.focus();
    }
  }, []);
  useEffect(() => {
    // Cập nhật ngôn ngữ của i18n theo ngôn ngữ trong context
    i18n.changeLanguage(language);
  }, [language]);
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
