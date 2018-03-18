import React from 'react';
import store, { getUsersFromServer } from './store';
import axios from 'axios';

export default class UserList extends React.Component{

    constructor(){
        super()
        this.state = store.getState();
        this.getUsers = this.getUsers.bind(this)
    };


    getUsers(){
        axios.get('/api/users')
            .then(res => res.data)
            .then(users => store.dispatch(getUsersFromServer(users)));
    }
    componentDidMount(){
        this.unsubscribe = store.subscribe(()=>{
            this.setState(store.getState())
        });
        this.getUsers();
    };
    componentWillUnmount(){
        this.unsubscribe()
    };

    render(){
        console.log(store.getState())
        return(
            <ul>


            </ul>
        )
    }
}