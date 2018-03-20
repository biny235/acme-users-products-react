import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import UserList from './UserList';
import store, { getUsersFromServer, getUsers }  from './store';
import UserUpdate from './UserUpdate';
import axios from 'axios';
import User from './User';

export default class Main extends React.Component{

    constructor(){
        super()
        this.state = store.getState();
        
    };

    componentDidMount(){
        this.unsubscribe = store.subscribe(()=>{
            this.setState(store.getState())
        });

    };

    componentWillUnmount(){
        this.unsubscribe();
    };

    render(){
        return(
           <div>
                <h2>Acme Users Products</h2>
                <Router>
                    <div>
                        <Route component={ Nav } />
                        <Route exact path='/' render={()=> <UserList /> } />
                        <Route path='/createuser' render={({location})=> <UserUpdate location={location}/> } />
                        <Route exact path='/users/:id' render={({location})=> <User location={location}/> } />
                    </div> 
                </Router>

           </div>
        );
    };

};