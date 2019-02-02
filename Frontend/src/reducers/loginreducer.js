function loginReducer(
  state = { user: "", alert: "", isAuthenticated: false },
  action
) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("isLogged", true);
      return {
        ...state,
        userId: action.payload._id,
        isAuthenticated: true,
        alert: ""
      };
    case "IS_LOGGED":
      return {
        ...state,
        userId: action.payload._id,
        isAuthenticated: true,
        alert: ""
      };
    case "LOGIN_FAILED":
      localStorage.removeItem("isLogged");
      return {
        ...state,
        userId:"",
        isAuthenticated: false
      };
    case "LOGIN_REQUESTED":
      localStorage.removeItem("isLogged");
      return {
        ...state,
        userId: "",
        isAuthenticated: false
      };
    case "API_ERROR":
      return {
        ...state,
        userId: "",
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export default loginReducer;
