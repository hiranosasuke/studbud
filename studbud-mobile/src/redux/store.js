import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "./reducers";

const middlewares = [promiseMiddleware(), thunk];

if (__DEV__) {
  // eslint-disable-line
  const { createLogger } = require("redux-logger");

  middlewares.push(createLogger());
}

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducers,
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares))
);
