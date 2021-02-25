import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

import home from './pages/home';
import results from './pages/results';
import results_buffer from './pages/results_buffer';
import task_tutorial from './pages/task_tutorial';
import task_record from './pages/task_record';
import task_finish from './pages/task_finish';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/results" component={results} />
          <Route exact path="/results_buffer" component={results_buffer} />
          <Route exact path="/task_tutorial" component={task_tutorial} />
          <Route exact path="/task_record" component={task_record} />
          <Route exact path="/task_finish" component={task_finish} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
 