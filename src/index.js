import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'mobx-react';
import store from './store';
import './index.css';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
const stores = {
  store
}
root.render(
  <Provider {...stores}>
    <App />
  </Provider>
);

