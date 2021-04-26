import "reflect-metadata";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./app/store";
import {InversifyProvider} from "./iocReact";
import {container} from "./inversify.config";

ReactDOM.render(
  <React.StrictMode>
      <InversifyProvider container={container}>
          <Provider store={store}>
              <App />
          </Provider>
      </InversifyProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
