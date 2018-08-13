import React from 'react';
import ReactDOM from 'react-dom'
import app from './reducers/reducers';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Header from "./components/Header";
import Statistics from "./containers/Statistics";
import ScoreForm from "./containers/ScoreForm";
import SeasonStatistics from "./containers/SeasonStatistics";

import './css/style.css';

let storeMiddleware = [
  logger,
  thunk
];

const store = createStore(
  app,
  applyMiddleware(...storeMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <Router basename="/app/src">
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={SeasonStatistics} />
          <Route path="/game" component={ScoreForm}/>
          <Route path="/statistics" component={Statistics}/>
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('react-mount')
);