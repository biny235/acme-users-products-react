import { createStore } from 'redux';

const GET_USERS_FROM_SERVER = 'GET_USERS_FROM_SERVER';


const getUsersFromServer = (users)=>{
    return {
        type: GET_USERS_FROM_SERVER,
        users: users
    };
};

const initialState = {
    users: []
};

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case GET_USERS_FROM_SERVER:
            return Object.assign({}, store, { users: action.users })
            break;
    };

};

const store = createStore(reducer);
export default store;
export { getUsersFromServer };