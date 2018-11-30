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
                            <span>Home</span>
                        </NavLink>

                        <NavLink to='/create-broadcast' className={'nav-link'}>
                            <span>Create Broadcast</span>
                        </NavLink> 

                        <NavLink to='/history' className={'nav-link'}>
                            <span>Broadcast History</span>
                        </NavLink> 

                        <NavLink to='/history' className={'nav-link'}>
                            <span>Info Page</span>
                        </NavLink> 

                        <span onClick={logout} className={'nav-link logout'}>Logout</span>

                    </div> :
                    <div className="nav-bar-two">
                        <NavLink to='/signup' className={'nav-link'}>
                            <span>Sign Up</span>
                        </NavLink>

                        <NavLink to='/login' className={'nav-link'}>
                            <span>Login</span>
                        </NavLink>            
                    </div> 

                }   
                
                
            </nav>     
                
            
    
        </div>
       
    )
}

export default NavBar

