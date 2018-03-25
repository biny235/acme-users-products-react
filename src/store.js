import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import axios from "axios";

const GET_USERS_FROM_SERVER = "GET_USERS_FROM_SERVER";
const GET_PRODUCTS_FROM_SERVER = "GET_PRODUCTS_FROM_SERVER";
const STORE_NAME = "STORE_NAME";
const ADD_USER = "ADD_USER";
const SELECT_USER = "SELECT_USER";
const RESET_SELECT = "RESET_SELECT";
const EDIT_USER = "EDIT_USER";
const DELETE_USER = "DELETE_USER";

const getUsers = () => {
  return dispatch => {
    return axios
      .get("/api/users")
      .then(res => res.data)
      .then(users => dispatch(getUsersFromServer(users)));
  };
};
const getProducts = () => {
  return dispatch => {
    return axios
      .get("/api/products")
      .then(res => res.data)
      .then(products => dispatch(getProductsFromServer(products)));
  };
};

const getUsersFromServer = users => {
  return {
    type: GET_USERS_FROM_SERVER,
    users: users
  };
};

const getProductsFromServer = products => {
  return {
    type: GET_PRODUCTS_FROM_SERVER,
    products: products
  };
};

const storeName = name => {
  return {
    type: STORE_NAME,
    name: name
  };
};

const deleteUser = id => {
  return {
    type: DELETE_USER,
    id: id
  };
};

const resetSelect = () => {
  return {
    type: RESET_SELECT
  };
};

const addUser = user => {
  return {
    type: ADD_USER,
    user: user
  };
};
const selectUser = user => {
  return {
    type: SELECT_USER,
    user: user
  };
};

const editUser = user => {
  return {
    type: EDIT_USER,
    user: user
  };
};

const initialState = {
  users: [],
  products: [],
  name: "",
  selectedUser: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_FROM_SERVER:
      return Object.assign({}, state, action.users);
      break;
    case GET_PRODUCTS_FROM_SERVER:
      return Object.assign({}, state, action.products);
      break;
    case STORE_NAME:
      return Object.assign({}, state, { name: action.name });
      break;
    case ADD_USER:
      return Object.assign({}, state, {
        users: [...state.users, action.user],
        name: ""
      });
      break;
    case SELECT_USER:
      return Object.assign({}, state, {
        name: action.user.name,
        selectedUser: action.user
      });
      break;
    case RESET_SELECT:
      return Object.assign({}, state, { selectedUser: "", name: "" });
      break;
    case EDIT_USER:
      return Object.assign({}, state, {
        users: state.users.map(user => {
          return user.id === action.user.id ? action.user.name : user.name;
        }),
        selectedUser: "",
        name: ""
      });
      break;
    case DELETE_USER:
      return Object.assign({}, state, {
        users: state.users.filter(user => user.id !== action.id * 1)
      });
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunkMiddleware)
);
export default store;
export {
  getUsersFromServer,
  storeName,
  addUser,
  selectUser,
  resetSelect,
  editUser,
  deleteUser,
  getUsers,
  getProducts
};
