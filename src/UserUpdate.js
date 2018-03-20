import React from 'react';
import store, { storeName, addUser, editUser } from './store';
import axios from 'axios';

export default class UserUpdate extends React.Component{

    constructor(){
        super();
        this.state = store.getState();
        this.prevDef = this.prevDef.bind(this);
        this.createUser = this.createUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    };
    componentDidMount(){
        this.unsubscribe = store.subscribe(()=>{
            this.setState(store.getState());
        })

        this.props.location.pathname === '/createuser' ? 
            store.dispatch(storeName('')) :
            null
    };
    prevDef(ev){
        ev.preventDefault()
    }
    componentWillUnmount(){
        this.unsubscribe();
    };

    changeName(ev){
        store.dispatch(storeName(ev.target.value))
    };
    handleSubmit(ev){
        this.prevDef(ev);
        const { name, selectedUser }  = this.state;
        const {updateUser, createUser} = this;
        selectedUser.name ? updateUser(name) : createUser(name);
    };

    createUser(name){
        axios.post('/api/users', { name })
            .then(res => res.data)
            .then(user =>{
                store.dispatch(addUser(user))
                location.hash = '/'
            })
    };

    updateUser(name){
        axios.patch(`/api/users/${document.location.hash.split('/')[2]}`, { name })
            .then(res => res.data)
            .then(user =>{
                store.dispatch(editUser(user))
                location.hash = '/'
            })
    }
 
    render(){
        const { prevDef, changeName, handleSubmit } = this;
        const { selectedUser, name } = this.state;
        return(
            <form onSubmit={prevDef}>
                <input onChange={ changeName } name='name' value={ name } placeholder='Input user name' />
                <button onClick={ handleSubmit }>
                    {  selectedUser.name ? 'Update User' : 'Add User'}
                </button>
            </form>
        );
    };


};