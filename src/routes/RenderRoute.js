import React from "react";
import { Route } from "react-router-dom";
import PrivateRouting from "./PrivateRouting";

const RenderRoute = (route, index, isPrivate = false) => {
  const Layout = route.layout || React.Fragment; // Use Fragment if no layout specified
  const Page = route.component;

  return (
    <Route key={index} element={isPrivate ? <PrivateRouting /> : undefined}>
      <Route
        index={route.index}
        path={index != null ? route.path : undefined} // Use path if it's defined
        element={
          <Layout>
            <Page />
          </Layout>
        }
      >
        {route.children?.map((childRoute, childIndex) => {
          const ChildPage = childRoute.component;
          return (
            <Route
              key={childIndex}
              index={childRoute.index}
              path={childRoute.path}
              element={<ChildPage />}
            />
          );
        })}
      </Route>
    </Route>
  );
};

export default RenderRoute;
