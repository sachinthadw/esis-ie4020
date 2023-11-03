import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from 'redux';
import allreducers from './Reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
//STORE



const store = createStore(
  allreducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


