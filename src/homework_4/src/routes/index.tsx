import React, { FC, memo } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import Dashboard from '../components/Dashboard';
import Courses from '../components/Dashboard';
import Course from '../components/Dashboard';
import NotFound from '../components/Dashboard';

const Routes: FC = () => {
  const auth = useAuth();
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/courses" render={() => (auth ? <Courses /> : <Redirect to="/" />)} />
        <Route exact path="/courses/:id" render={() => (auth ? <Course /> : <Redirect to="/" />)} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default memo(Routes);
