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
    username: null,
    renderMap: false
  }

  renderMapInDashboard = () => {
    this.setState({
      renderMap: true
    })
  }

  
  setUser = user => {
    this.setState({
      user,
      renderSignUp: false,
      renderLogin: false
    })
  }


  login = (user) => {
    console.log("Hello from inside login in App.js", user)
    localStorage.setItem('token', user.token)
    this.setState({ username: user.username })
    this.props.history.push('/dashboard')
  }

  logout = () => {
    localStorage.removeItem('token')
    this.setState({ username: null })
    this.props.history.push('/')
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) return
    API.validate()
      .then(user => {
        console.log(user)
        this.login(user)
        // this.props.history.push('/dashboard')
      })
      .catch(error => this.props.history.push('/'))
  }


  render() {
    console.log("Hello from start of render in APP.js", this.state.username)
    
    const {username, renderMap} = this.state

    return (
      <div>
          <Route path='/' render={(routerProps) => 
            <div>
              <NavBar {...routerProps} 
                username={this.state.username}
                logout={this.logout}
              /> 
            </div>
          } />
        {/* BODY PAGES */}
        {
          !username ?
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
                  username={username}
                  renderMap={renderMap}
                  renderMapInDashboard={this.renderMapInDashboard}
                />
              } />
          
        }        
        
      </div>
    )
  }
}

export default withRouter(App)



