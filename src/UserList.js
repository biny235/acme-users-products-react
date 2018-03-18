import React from 'react';
import store from './store';

export default class UserList extends React.Component{

    constructor(){
        super()
        this.state = store.getState()
       
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
        const { users } = this.state
        return(
            <ul>
                { users.map(user=><li key={user.id}>{user.name}</li>) }
            </ul>
        )
    }
}