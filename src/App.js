import React, {
  Fragment,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import "./App.css";

import "./generator/generator";
import { withTranslation } from "react-i18next";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import AuthProvider from "./context/AuthContext";
import  { LanguageContext } from "./context/LanguageProvider";

import { privateRoutes, publicRoutes } from "./routes/Route";
import { ToastContainer } from "react-toastify";
import i18n from "./languages/i18n";
import RenderRoute from "./routes/RenderRoute";
import "react-toastify/dist/ReactToastify.min.css";
function App() {
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
        <Router>
          <Routes>
            {publicRoutes.map((route, index) => RenderRoute(route, index))}
            {privateRoutes.map((route, index) =>
              RenderRoute(route, index, true)
            )}
          </Routes>
        </Router>
      </Suspense>
      <ToastContainer />
    </AuthProvider>
  );
}

export default withTranslation()(App);
