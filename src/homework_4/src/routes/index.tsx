import React, { FC, memo } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import Courses from '../components/Courses';
import Course from '../components/Course';
import NotFound from '../components/NotFound';

const Routes: FC = () => {
  console.log('hello route');

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/courses" component={Courses} />
        <Route path="/courses/:id" component={Course} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  )
};

export default memo(Routes);
