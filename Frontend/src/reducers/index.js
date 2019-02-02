import loginReducer from "./loginreducer";
import orderReducer from "./orderReducer";
import itemReducer from "./itemReducer";
import alertReducer from "./alertReducer";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

export default history =>
  combineReducers({
    router: connectRouter(history),
    loginReducer,
    orderReducer,
    itemReducer,
    alertReducer
  });

// export default rootReducer;
