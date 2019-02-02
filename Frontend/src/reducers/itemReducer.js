function itemReducer(state = { items: [], alert: "" }, action) {
  switch (action.type) {
    case "ITEMS_LOADED":
      return {
        ...state,
        items: action.payload,
        alert: ""
      };
    default:
      return state;
  }
}

export default itemReducer;
