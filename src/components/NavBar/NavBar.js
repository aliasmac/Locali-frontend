import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavBar.css'


const NavBar = ({user, logout}) => {

    return (
    
        <div>      
            
            <nav >
                {
                    user ?
                    <div className="nav-bar-one">
                        <NavLink to='/' className={'nav-link'}>
                            Home
                        </NavLink>

                        <NavLink to='/dashboard' className={'nav-link'}>
                            Dashboard
                        </NavLink> 

                        <span onClick={logout} className={'nav-link'}>Logout</span>

                    </div> :
                    <div className="nav-bar-two">
                        <NavLink to='/signup' className={'nav-link'}>
                            Sign Up
                        </NavLink>

                        <NavLink to='/login' className={'nav-link'}>
                            Login
                        </NavLink>            
                    </div> 

                }   
                
                
            </nav>     
                
            
    
        </div>
       
    )
}

export default NavBar

