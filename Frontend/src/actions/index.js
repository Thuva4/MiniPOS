import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  LOGIN_REQUESTED,
  ADD_ALERT,
  REMOVE_ALERT,
  ORDER_UPDATED,
  ORDERS_LOADED,
  ORDER_ADDED,
  ORDER_UPDATE_MODAL,
  ORDER_NEW_MODAL,
  ITEMS_LOADED
} from "../constants/action-types.js"


const baseUrl = "http://localhost:3001/api";

export function isLogged(payload) {
  return function(dispatch) {
    return fetch(`${baseUrl}/auth/login`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(function(res) {
        if (res.ok) {
          res.json().then(json => {
            dispatch({ type: "IS_LOGGED", payload: json });
          });
        } else {
          dispatch({
            type: ADD_ALERT,
            text: "Athentication Failed! Please login again",
            style: "warning"
          });
          dispatch({ type: LOGIN_FAILED, payload: {} });
        }
      })
      .catch((error) => {
        dispatch({
          type: ADD_ALERT,
          text: error.toString(),
          style: "error"
        });
      });
  };
}


export function loginUser(payload) {
  return function(dispatch) {
    return fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: payload.username,
        password: payload.password
      })
    })
      .then(function(res) {
        if (res.ok) {
          res.json().then(json => {
            localStorage.setItem("isLogged", true);
            dispatch({
              type: ADD_ALERT,
              text: "Logged In!",
              style: "success"
            });
            dispatch({ type: LOGIN_SUCCESS, payload: json });
          });
        } else {
          dispatch({
            type: ADD_ALERT,
            text: "Athentication Failed! Check your credentials",
            style: "warning"
          });
          dispatch({ type: LOGIN_FAILED, payload: {} });
        }
      })
      .catch((error) => {
        dispatch({
          type: ADD_ALERT,
          text: error.toString(),
          style: "error"
        });
      });
  };
}

export function logout(payload) {
  return function(dispatch) {
    return fetch(`${baseUrl}/auth/logout`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(function(res) {
        if (res.ok) {
          res.json().then(json => {
            localStorage.removeItem("isLogged");
            dispatch({
              type: ADD_ALERT,
              text: "Logged Out!",
              style: "success"
            });
            dispatch({ type: LOGOUT_SUCCESS, payload: json });
          });
        }
      })
      .catch(function(error) {
        dispatch({
          type: ADD_ALERT,
          text: error.toString(),
          style: "success"
        });
      });
  };
}

export function updateQuantity(payload) {
  return function(dispatch) {
    return fetch(
      `${baseUrl}/order/${payload.orderId}/items/${
        payload.itemId
      }`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quantity: payload.quantity
        })
      }
    )
      .then(function(res) {
        if (res.ok) {
          return res.json().then(json => {
            dispatch({
              type: ADD_ALERT,
              text: "Quantity Updated!",
              style: "success"
            });
            dispatch({ type: ORDER_UPDATED, payload: json });
            return true;
          });
        } else {
          if (res.status === 401) {
            localStorage.removeItem("isLogged");
            dispatch({
              type: ADD_ALERT,
              text: "Athentication Failed! Please login again",
              style: "warning"
            });
            dispatch({ type: LOGIN_REQUESTED, payload: {} });
          } else {
            res.text().then(text => {
              dispatch({
                type: ADD_ALERT,
                text: text,
                style: "warning"
              });
            });
          }
          return false;
        }
      })
      .catch((error) => {
        dispatch({
          type: ADD_ALERT,
          text: error.toString(),
          style: "error"
        });
      });
  };
}

export function loadOrders() {
  return function(dispatch) {
    return fetch(`${baseUrl}/orders`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(function(res) {
        if (res.ok) {
          return res.json().then(json => {
            dispatch({ type: ORDERS_LOADED, payload: json });
            return true;
          });
        } else {
          if (res.status === 401) {
            localStorage.removeItem("isLogged");
            dispatch({
              type: ADD_ALERT,
              text: "Athentication Failed! Please login again",
              style: "warning"
            });
            dispatch({ type: LOGIN_REQUESTED, payload: {} });
          } else {
            res.text().then(text => {
              dispatch({
                type: ADD_ALERT,
                text: text,
                style: "warning"
              });
            });
          }
        }
        return false;
      })
      .catch((error) => {
        dispatch({
          type: ADD_ALERT,
          text: error.toString(),
          style: "error"
        });
      });
  };
}

export function addItem(payload) {
  return function(dispatch) {
    return fetch(`${baseUrl}/order/${payload.orderId}/items`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...payload.item[0]
      })
    })
      .then(function(res) {
        if (res.ok) {
          return res.json().then(json => {
            dispatch({ type: ORDER_UPDATED, payload: json });
            dispatch({
              type: ADD_ALERT,
              text: "Item Added",
              style: "success"
            });
            return true;
          });
        } else {
          if (res.status === 401) {
            localStorage.removeItem("isLogged");
            dispatch({
              type: ADD_ALERT,
              text: "Athentication Failed! Please login again",
              style: "warning"
            });
            dispatch({ type: LOGIN_REQUESTED, payload: {} });
          } else {
            res.text().then(text => {
              dispatch({
                type: ADD_ALERT,
                text: text,
                style: "warning"
              });
            });
          }
          return false;
        }
      })
      .catch((error) => {
        dispatch({
          type: ADD_ALERT,
          text: error.toString(),
          style: "error"
        });
      });
  };
};

export function removeItem(payload) {
  return function(dispatch) {
    return fetch(`${baseUrl}/order/${payload.orderId}/items/${payload.itemId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(function(res) {
        if (res.ok) {
          return res.json().then(json => {
            dispatch({ type: ORDER_UPDATED, payload: json });
            dispatch({
              type: ADD_ALERT,
              text: "Item Removed",
              style: "success"
            });
            return true;
          });
        } else {
          if (res.status === 401) {
            localStorage.removeItem("isLogged");
            dispatch({
              type: ADD_ALERT,
              text: "Athentication Failed! Please login again",
              style: "warning"
            });
            dispatch({ type: LOGIN_REQUESTED, payload: {} });
          } else {
            res.text().then(text => {
              dispatch({
                type: ADD_ALERT,
                text: text,
                style: "warning"
              });
            });
          }
          return false;
        }
      })
      .catch((error) => {
        dispatch({
          type: ADD_ALERT,
          text: error.toString(),
          style: "error"
        });
      });
  };
};


export function addOrder(payload) {
  return function(dispatch) {
    return fetch(`${baseUrl}/orders`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...payload
      })
    })
      .then(function(res) {
        if (res.ok) {
          return res.json().then(json => {
            
            dispatch({ type: ORDER_ADDED, payload: json });
            dispatch({
              type: ADD_ALERT,
              text: "Order Added",
              style: "success"
            });
            return json;
          });
        } else {
          if (res.status === 401) {
            localStorage.removeItem("isLogged");
            dispatch({
              type: ADD_ALERT,
              text: "Athentication Failed! Please login again",
              style: "warning"
            });
            dispatch({ type: LOGIN_REQUESTED, payload: {} });
          } else {
            res.text().then(text => {
              dispatch({
                type: ADD_ALERT,
                text: text,
                style: "warning"
              });
            });
          }
          return false;
        }
      })
      .catch((error) => {
        dispatch({
          type: ADD_ALERT,
          text: error.toString(),
          style: "error"
        });
      });
  };
}

export function loadOrder(orderId) {
  return function(dispatch) {
    return fetch(`${baseUrl}/orders/${orderId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(function(res) {
        if (res.ok) {  
          return res.json().then(json => {
            dispatch({ type: "ORDER_LOADED", payload: json });
            return true;
          });
        } else {
          if (res.status === 401) {
            localStorage.removeItem("isLogged");
            dispatch({
              type: ADD_ALERT,
              text: "Athentication Failed! Please login again",
              style: "warning"
            });
            dispatch({ type: LOGIN_REQUESTED, payload: {} });
          } else {
            res.text().then(text => {
              dispatch({
                type: ADD_ALERT,
                text: text,
                style: "warning"
              });
            });
          }
          return false;
        }
      })
      .catch((error) => {
        dispatch({
          type: ADD_ALERT,
          text: error.toString(),
          style: "error"
        });
      });
  };
}

export function loadItems(name) {
  return function(dispatch) {
    let url = `${baseUrl}/items`;
    if (name) {
      url = url + `?name=${name}`;
    }
    return fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(function(res) {
        if (res.ok) {
          res.json().then(json => {
            dispatch({ type: ITEMS_LOADED, payload: json });
          });
        } else {
          if (res.status === 401) {
            localStorage.removeItem("isLogged");
            dispatch({
              type: ADD_ALERT,
              text: "Athentication Failed! Please login again",
              style: "warning"
            });
            dispatch({ type: LOGIN_REQUESTED, payload: {} });
          } else {
            res.text().then(text => {
              dispatch({
                type: ADD_ALERT,
                text: text,
                style: "warning"
              });
            });
          }
        }
      })
      .catch((error) => {
        dispatch({
          type: ADD_ALERT,
          text: error.toString(),
          style: "error"
        });
      });
  };
}

export function addAlert(text, style) {
  return {
    type: ADD_ALERT,
    text,
    style
  };
}

export function removeAlert(id) {
  return {
    type: REMOVE_ALERT,
    id
  };
}

export function updateModal() {
  return {
    type: ORDER_UPDATE_MODAL
  };
}

export function newModal(id) {
  return {
    type: ORDER_NEW_MODAL
  };
}
