import React from 'react';
import store, { storeName, addUser } from './store';
import axios from 'axios';

export default class UserUpdate extends React.Component{

    constructor(){
        super();
        this.state = store.getState();
        this.prevDef = this.prevDef.bind(this);
        this.onClick = this.onClick.bind(this);
    };
    componentDidMount(){
        this.unsubscribe = store.subscribe(()=>{
            this.setState(store.getState());
        })
    };
    componentWillUnmount(){
        this.unsubscribe();
    };
    prevDef(ev){
        ev.preventDefault();
    };
    changeName(ev){
        store.dispatch(storeName(ev.target.value))
    };
    onClick(ev){
        this.prevDef(ev);
        const name = this.state.name
        axios.post('/api/users', { name })
            .then(res => res.data)
            .then(user =>{
                store.dispatch(addUser(user))
                document.location = '/'
            })
    }

    render(){
        const {prevDef, changeName, onClick} = this;
        console.log(this.state)
        return(
            <form onSubmit={prevDef}>
                <input onChange={changeName} name='name' placeholder='Input user name' />
                <button onClick={ onClick }>Submit</button>
            </form>
        );
    };


};