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
    renderSignUp: false,
    renderLogin: false
  }

  setSignUp = () => {
    this.setState({
      renderSignUp: true,
      renderLogin: false
    })
  }

  setLogin = () => {
    this.setState({
      renderLogin: true,
      renderSignUp: false
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
    this.props.history.push('/signin')
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

    const {renderSignUp, renderLogin, username} = this.state

    return (
      <div>
          <Route path='/' render={(routerProps) => 
            <div>
              <NavBar {...routerProps} 
                user={this.state.user}
                setSignUp={this.setSignUp}
                setLogin={this.setLogin}
              /> 
              <LandingPage />
            </div>
          } />


        {
          username && 
          <Route path='/dashboard' render={(routerProps) => <DashBoard /> } />
        }  

        {
          !username &&
          <Switch>
            {
              renderSignUp && 
              <SignUpForm
                login={this.login}
                history={this.props.history}
              /> || renderLogin && 
              <LoginForm
                login={this.login}
                history={this.props.history}
              />
            }
          </Switch>
        }


        {/* {
          renderSignUp && 
                      <SignUpForm
                        login={this.login}
                        history={this.props.history}
                      />
                    
        }

        {
          renderLogin && 
                      <LoginForm
                        login={this.login}
                        history={this.props.history}
                      />
        } */}
      
        
      </div>
    )
  }
}

export default withRouter(App)



