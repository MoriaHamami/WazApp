import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/main.scss';
import App from './root-cmp';
import { BrowserRouter as Router } from 'react-router-dom'
// import { Switch } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './services/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <StateProvider initialState={initialState} reducer={reducer}>
  <Provider store={store}>

  <Router>
      <App />
  </Router>
  </Provider>
  // </StateProvider>
);

