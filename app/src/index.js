import React from 'react';
import ReactDOM from 'react-dom'
import app from './reducers/reducers';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
// import { fetchSingleGameScore } from './actions/actions';
import Statistics from "./containers/Statistics";
import ScoreForm from "./containers/ScoreForm";
import Header from "./components/Header";

let storeMiddleware = [
  logger,
  thunk
];

const store = createStore(
  app,
  applyMiddleware(...storeMiddleware)
);


// store.dispatch(actions.postScore(290));
// store.dispatch(actions.postScore(190));
// store.dispatch(actions.postScore(240));
// store.dispatch(actions.postScore(220));

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Header />
      <Statistics />
      <ScoreForm />
    </div>
  </Provider>,
  document.getElementById('react-mount')
);