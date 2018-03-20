import React from 'react';
import { NavLink } from 'react-router-dom';



const Nav = (props)=>{
    const path = props.location.pathname
    return(
        <ul>
            <li>{ path === '/' ? 
                <span>Users</span>
                :
                <NavLink to='/'> Users </NavLink>
            }</li>
            <li>{ path === '/products' ? 
                <span>Products</span>
                :
                <NavLink to='/products'> Products </NavLink>
            }</li>
            <li>{ path === '/createuser' ? 
                <span>Create User</span>
                :
                <NavLink to='/createuser'> Create User </NavLink>
            }</li>
        </ul>
    )
};

export default Nav;