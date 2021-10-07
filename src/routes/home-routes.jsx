import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";

const Dashboard = lazy(() => import("pages/dashboard"));
const Kategori = lazy(() => import("pages/kategori"));
const Audio = lazy(() => import("pages/audio"));
const Sejarah = lazy(() => import("pages/sejarah"));

export default function Routes() {
  return (
    <Switch>
      {/* Main Page */}
      <Route exact path={`/`}>
        <Dashboard />
      </Route>
      <Route path={`/kategori`}>
        <Kategori />
      </Route>
      <Route path={`/audio`}>
        <Audio />
      </Route>
      <Route path={`/sejarah`}>
        <Sejarah />
      </Route>
    </Switch>
  );
}
