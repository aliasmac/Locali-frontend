import React, { Component } from 'react';
import './App.css';
import { Route, withRouter, Switch} from 'react-router-dom';

import API from './API'
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import LoginForm from './components/LoginForm/LoginForm'
import DashBoard from './components/DashBoard/DashBoard'
import LandingPage from './components/LandingPage/LandingPage'


class App extends Component {

  state = {
    user: null,
    renderMap: false,
    userObject: null
  }

 
  setUser = user => {
    this.setState({
      user,
      renderSignUp: false,
      renderLogin: false
    })
  }


  login = (user) => {
    console.log("Hello from inside login in App.js", user.id)
    localStorage.setItem('token', user.token)
    this.setState({ user: user })
    API.getUserObj(this.state.user.id)
      .then(user => {
        this.setState({ userObject: user })
      })
    this.props.history.push('/dashboard')
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
        console.log(user)
        this.login(user)
      })
      .catch(error => this.props.history.push('/'))
  }


  render() {
    console.log("Hello from start of render in APP.js", this.state.userObject)
    
    const {user, renderMap, userObject} = this.state

    return (
      <div>
          <Route path='/' render={(routerProps) => 
            <div>
              <NavBar {...routerProps} 
                user={this.state.user}
                logout={this.logout}
              /> 
            </div>
          } />
        {/* BODY PAGES */}
        {
          !user ?
          <div>
              {/* <Route path='/dashboard' render={(routerProps) => <DashBoard /> } /> */}
              <Route path='/signup' render={(routerProps) => <SignUpForm
                login={this.login}
                history={this.props.history}
                /> } />
              <Route path='/login' render={(routerProps) => <LoginForm
              login={this.login}
              history={this.props.history}
              /> } />
          </div>      
          :
          // Add container here
          <Route path='/dashboard' render={(routerProps) =>
                <DashBoard
                  user={user}
                  userObject={userObject}
                />
              } />
          
        }        
        
      </div>
    )
  }
}

export default withRouter(App)



