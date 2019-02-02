import rootReducer from "../reducers/index";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createHistory();

const store = createStore(
  rootReducer(history),
  storeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
);

export default store;
