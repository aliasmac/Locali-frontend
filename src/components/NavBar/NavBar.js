import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavBar.css'
import logo from '../../logo.png'


const NavBar = ({user, logout, history}) => {

    return (
    
        <div>      
            
            <nav >
            {/* onClick={() => {history.push('/') } } */}
                {
                    user ?
                    <div className="nav-bar-one">
                    <div className="left-nav">
                        <img src={logo} className='logo' alt='logo' />
                    </div>
                    <div className="right-nav"> 
                        {/* <NavLink to='/' className={'nav-link'}>
                            <span>Home</span>
                        </NavLink> */}

                        <NavLink to='/create-broadcast' className={'nav-link'}>
                            <span>Broadcast Manager</span>
                        </NavLink> 

                        <NavLink to='/history' className={'nav-link'}>
                            <span>Dashboard</span>
                        </NavLink> 

                        <span onClick={logout} className={'nav-link logout'}>Logout</span>
                    </div>   

                    </div> :
                    <div className="nav-bar-two">
                    <div className="left-nav">
                        <img src={logo} className='logo' alt='logo' onClick={() => {history.push('/') } }/>
                    </div>
                    <div className="right-nav" >
                        <NavLink to='/signup' className={'nav-link'}>
                            <span>Sign Up</span>
                        </NavLink>

                        <NavLink to='/login' className={'nav-link'}>
                            <span>Login</span>
                        </NavLink>            
                    </div>   
                    </div> 

                }   
                
                
            </nav>     
                
            
    
        </div>
       
    )
}

export default NavBar

