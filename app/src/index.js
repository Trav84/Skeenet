import React from 'react';
import ReactDOM from 'react-dom'
import ScoreForm from './containers/ScoreForm.js';
import { createStore, applyMiddleware } from 'redux';
import app from './reducers/reducers';
import * as actions from './actions/actions';
import logger from 'redux-logger';
import { Provider } from 'react-redux';

const store = createStore(
  app,
  applyMiddleware(logger)
);

// store.dispatch(actions.postScore(290));
// store.dispatch(actions.postScore(190));
// store.dispatch(actions.postScore(240));
// store.dispatch(actions.postScore(220));

ReactDOM.render(
  <Provider store={store}>
    <ScoreForm />
  </Provider>,
  document.getElementById('react-mount')
);