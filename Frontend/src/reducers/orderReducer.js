function orderReducer(state = { orders: [], alert: "", order: {
          createdDate: new Date(),
          modifiedDate: new Date(),
          userId: "",
          discountPercentage: 10,
          openStatus: true,
          amount: 0,
          items: []
        }, }, action) {
  switch (action.type) {
    case "ORDERS_LOADED":
      return {
        ...state,
        orders: action.payload
      };
    case "ORDER_LOADED":
      return {
        ...state,
        order: action.payload
      };
    case "ORDER_UPDATED":
      return {
        ...state,
        order: action.payload
      };
    case "ORDER_UPDATE_MODAL":
      return {
        ...state,
        isUpdate: true
      };
    case "ORDER_NEW_MODAL":
      return {
        ...state,
        order: {
          createdDate: new Date(),
          userId: localStorage.getItem("isLogged"),
          discountPercentage: 10,
          openStatus: true,
          amount: 0,
          items: []
        },
        isUpdate: false
      };
    default:
      return state;
  }
}

export default orderReducer;
