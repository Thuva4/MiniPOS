import { combineReducers } from "redux";
import uuid from "uuid";

var alertsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ALERT":
      return [
        ...state,
        {
          text: action.text,
          style: action.style,
          id: uuid()
        }
      ];

    case "REMOVE_ALERT":
      return state.filter(alert => {
        if (alert.id === action.id) {
          return false;
        } else {
          return true;
        }
      });

    default:
      return state;
  }
};

export default combineReducers({
  alerts: alertsReducer
});
