import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminPanel from "./admin/AdminPanel";
import PageRouter from "./pages/pageRouter";

const MainRouter = () => {
  return (
    <Switch>
      <Route path="/admin" component={AdminPanel}/>
      <Route path="/" component={PageRouter}/>
    </Switch>
  );
};

export default MainRouter;