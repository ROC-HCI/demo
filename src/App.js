import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

import home from './pages/Home';
import results from './pages/results';
import task_tutorial from './pages/task_tutorial';
import task_record from './pages/task_record';
import task_finish from './pages/task_finish';
import Feedback from './pages/Feedback';
import { Box, Container, CssBaseline } from '@material-ui/core';

function App() {
  return (
    <Box paddingX={8}>
      <CssBaseline/>
      <Router>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/results" component={results} />
          <Route exact path="/task_tutorial" component={task_tutorial} />
          <Route exact path="/task_record" component={task_record} />
          <Route exact path="/task_finish" component={task_finish} />
          <Route exact path="/feedback" component={Feedback} />
        </Switch>
      </Router>
    </Box>
  );
}

export default App;
 