import React from 'react';
import store, { getUsers } from './store';
import  { Link } from 'react-router-dom'

export default class UserList extends React.Component{

    constructor(){
        super()
        this.state = store.getState()
       
    };

     componentDidMount(){
        this.unsubscribe = store.subscribe(()=>{
            this.setState(store.getState())
        });
        store.dispatch(getUsers())

    };

    componentWillUnmount(){
        this.unsubscribe()
    };
    


    render(){
        const { users } = this.state
        return(
            <ul>
                { users.map(user=><li key={user.id}><Link to={`/users/${user.id}`}>{user.name}</Link></li>) }
            </ul>
        )
    }
}