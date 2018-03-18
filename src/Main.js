import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';

import Nav from './Nav';
import UserList from './UserList';

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
        this.unsubscribe()
    };


    render(){

        return(
           <div>
                <h2>Acme Users Products</h2>
                <Router>
                    <div>
                        <Route component={ Nav } />
                        <Route path='/' component={ UserList } />
                    </div>
                        
                </Router>

           </div>
        );
    };

};