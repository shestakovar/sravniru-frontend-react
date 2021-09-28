import React, { FC } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import ProposalListPage from "../pages/ProposalListPage";

const AppRouter: FC = () => {
  const routes = [
    { path: "/", component: ProposalListPage, exact: true },
  ]
  return (
    <Switch>
      {routes.map(route =>
        <Route path={route.path} component={route.component} exact={route.exact} key={route.path}/>
      )}
      <Redirect to='/'/>
    </Switch>
  );
};

export default AppRouter;