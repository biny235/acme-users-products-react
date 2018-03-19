import { createStore } from 'redux';

const GET_USERS_FROM_SERVER = 'GET_USERS_FROM_SERVER';
const STORE_NAME = 'STORE_NAME';
const ADD_USER = 'ADD_USER';
const SELECT_USER = 'SELECT_USER';
const RESET_SELECT = 'RESET_SELECT';
const EDIT_USER = 'EDIT_USER';


const getUsersFromServer = (users)=>{
    return {
        type: GET_USERS_FROM_SERVER,
        users: users
    };
};

const storeName = (name)=>{
    return{
        type: STORE_NAME,
        name: name
    }
};

const resetSelect = ()=>{
    return{
        type: RESET_SELECT
    }
}

const addUser = (user)=>{
    return{
        type: ADD_USER,
        user: user
    }
};
const selectUser = (user)=>{
    return{
        type: SELECT_USER,
        user: user
    }
};

const editUser = (user)=>{
    return{
        type: EDIT_USER,
        user: user
    }
}

const initialState = {
    users: [],
    name: '',
    selectedUser: ''
};


const reducer = (state = initialState, action)=>{
    switch(action.type){
        case GET_USERS_FROM_SERVER:
            return Object.assign({}, state, action.users)
            break;
        case STORE_NAME:
            return Object.assign({}, state, { name: action.name })
            break;
        case ADD_USER:
            return Object.assign({}, state, { users: [...state.users, action.user], name: '' })
            break;
        case SELECT_USER:
            return Object.assign({}, state, { selectedUser: action.user, name: action.user.name })
            break;
        case RESET_SELECT:
            return Object.assign({}, state, { selectedUser: '', name: '' })
            break;
        case EDIT_USER:
            return state
        default:
            return state;
    };

};

const store = createStore(reducer);
export default store;
export { getUsersFromServer, storeName, addUser, selectUser, resetSelect, editUser };