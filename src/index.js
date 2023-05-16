import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/main.scss';
import App from './root-cmp';
import { BrowserRouter as Router } from 'react-router-dom'
// import { Switch } from 'react-router'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <App />
  </Router>
);

