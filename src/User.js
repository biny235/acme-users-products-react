import React from 'react';
import store, { selectUser, resetSelect, deleteUser } from './store';
import UserUpdate from './UserUpdate';
import axios from 'axios';

export default class User extends React.Component {
    constructor(){
        super();
        this.state = store.getState();
        this.onClick = this.onClick.bind(this);
    };

    findUser(id){
        return this.state.users.filter(user => user.id * 1 === id *  1)[0];
    };

    componentDidMount(){
        this.unsubscribe = store.subscribe(()=>{
            this.setState(store.getState());
        });
        store.dispatch(selectUser(this.findUser(location.hash.split('/')[2])));
       
    };
    componentDidUpdate(prevProps, prevState){
        
        if(!this.state.selectedUser){
            console.log('in if')
            store.dispatch(selectUser(this.findUser(location.hash.split('/')[2])));
        }
    }
    componentWillUnmount(){
        this.unsubscribe();
        store.dispatch(resetSelect());
    };

    onClick(ev){
        const {selectedUser} = this.state;
        axios.delete(`/api/users/${selectedUser.id}`)
            .then(()=>{
                store.dispatch(deleteUser(selectedUser.id))
                document.location.hash = '/'
            })
    };
    
    render(){
        const { selectedUser } = this.state;
        const { onClick } = this;
        return(
            <div>
                <UserUpdate user={ selectedUser }/>
                <button onClick={onClick}> DELETE </button>
            </div>
        )
    }
}