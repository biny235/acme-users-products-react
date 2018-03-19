import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import UserList from './UserList';
import store, { getUsersFromServer }  from './store';
import UserUpdate from './UserUpdate';
import axios from 'axios';
import User from './User';

export default class Main extends React.Component{

    constructor(){
        super()
        this.state = store.getState();
        this.getUsers = this.getUsers.bind(this)
    };

    componentDidMount(){
        this.unsubscribe = store.subscribe(()=>{
            this.setState(store.getState())
        });
        this.getUsers();

    };

    componentWillUnmount(){
        this.unsubscribe()
    };
    getUsers(){
        axios.get('/api/users')
            .then(res => res.data)
            .then(users => store.dispatch(getUsersFromServer(users)));
    }

    render(){
        return(
           <div>
                <h2>Acme Users Products</h2>
                <Router>
                    <div>
                        <Route component={ Nav } />
                        <Route exact path='/' render={()=> <UserList /> } />
                        <Route path='/createuser' component={ UserUpdate } />
                        <Route path='/users/:id' render={()=> <User /> } />
                    </div> 
                </Router>

           </div>
        );
    };

};