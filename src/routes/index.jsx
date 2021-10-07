import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loading from "pages/loading";

const Template = lazy(() => import("pages/template"));
const Login = lazy(() => import("pages/login"));

export default function Routes() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Switch>
            {/* Main Page */}
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Template />
            </Route>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
}
