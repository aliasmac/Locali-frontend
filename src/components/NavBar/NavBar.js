import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavBar.css'


const NavBar = ({setSignUp, setLogin, username}) => {

    return (
        <nav >
            <div>      
                {
                    username ?
                    <div>
                        <NavLink to='/'>
                        Home
                        </NavLink>
    
                        <NavLink to='/dashboard'>
                        Dashboard
                        </NavLink>    
                    </div>
                    :
                    <div className="nav-bar-one">
                        <NavLink to='/'>
                            Sign Up
                        </NavLink>
    
                        <NavLink to='/dashboard'>
                        Dashboard
                        </NavLink>   

                        <span onClick={() => setSignUp()} className={'block-link'}>
                            Signup
                        </span>
    
                        <span onClick={() => setLogin()} className={'block-link'}>
                            Login
                        </span>
                    </div>
                }
        
            </div>
        </nav>
    )
}

export default NavBar

