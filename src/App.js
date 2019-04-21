import React, { Component } from 'react';
import './App.css';
import { Route, withRouter} from 'react-router-dom';

import API from './API'
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import LoginForm from './components/LoginForm/LoginForm'
import DashBoard from './components/DashBoard/DashBoard'
import Stats from './components/Stats/Stats'
import NycTraffic from './NycTraffic.mp4'


class App extends Component {

  state = {
    user: null,
    renderMap: false,
    userObject: null,
    showVideo: false
  }

 
  setUser = user => {
    this.setState({
      user,
      renderSignUp: false,
      renderLogin: false
    })
  }


  login = (user) => {
    localStorage.setItem('token', user.token)
    this.setState({ user: user })
    API.getUserObj(this.state.user.id)
      .then(user => {
        this.setState({ userObject: user })
      })
    this.props.history.push('/create-broadcast')
  }

  logout = () => {
    localStorage.removeItem('token')
    this.setState({ user: null })
    this.props.history.push('/')
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) return
    API.validate()
      .then(user => {
        this.login(user)
      })
      .catch(error => this.props.history.push('/'))
  }


  render() {
    
    const {user, userObject} = this.state

    return (
      <div className="main">
          <Route path='/' render={(routerProps) => 
          <>
            <div className="" >
              <NavBar {...routerProps} 
                user={this.state.user}
                logout={this.logout}
              /> 
              
            </div> 
          </>  
          } />

          {
            this.props.history.location.pathname === '/' &&
            <div>
              <div id="video-box" >
                <div id="video_overlays"></div>
                <div className="banner-text-overlay">
                  <div className="banner-text">
                    <h1><span>Locali</span> helps you<br/> connect with your <br/>customers where<br/> it matters.</h1>
                    <p>An intelligent location-based marketing system that helps<br/> you
                      deliver your message to your customers in real-time.</p>
                  </div>
                </div>  
              <div>
                <video className='videoTag' autoPlay loop muted >
                  <source src={NycTraffic} type='video/mp4' />      
                </video>
              </div>  
            </div>
            <footer>
                <div className="copyright">
                  <span>&copy; 2018 Locali. By Aliasgar Makda</span>
                </div>
            </footer> 
          </div>
          }
        
        {
          !user ?
          <div>
              {/* <Route path='/dashboard' render={(routerProps) => <DashBoard /> } /> */}
              <div className="landing-nav">
                <Route path='/signup' render={(routerProps) => <SignUpForm
                  login={this.login}
                  history={this.props.history}
                  /> } />
                <Route
                path='/login'
                render={(routerProps) => <LoginForm
                login={this.login}
                history={this.props.history}
                /> } />
              </div>

          </div>      
          :
          // Add container here
          <>
          
          <Route path='/create-broadcast' render={(routerProps) =>
                <DashBoard
                  user={user}
                  userObject={userObject}
                />
              } />

          <Route path='/dashboard' render={(routerProps) =>
              <Stats />
            } />   
          
          </>
        }        
        
      </div>
    )
  }
}

export default withRouter(App)



