import React from 'react'

import API from '../../API'
import './SignUpForm.css'

class SignUpForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            errors: {
                username: false,
              }
        }
    }

    handleChange = (e) => {
        
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.signup()
        this.setState({
            username: "",
            password: ""
        })
    }

    signup = () => {
        console.log("HELLO FROM SIGNUP")
        const {username, password} = this.state
        API.signup(username, password).then(user => {
            if (user.error) {
                this.setState({
                    errors: {
                      username: "Username already taken",
                }})
                this.props.history.push('/signup')
                console.log("HELLO FROM SIGN UP", user.error)
            } else {
                this.props.login(user)              
            }           
        })
            
    }


    render() {

        return (
            <div className="signup-page">
                <div className="error-box"
                // style={{
                //     transform: this.state.errors.username  ? 'translateY(-60vh)' : 'translateY(-100vh)',
                //     opacity: this.state.errors.username ? '1' : '0',
                //     }}
                >
                    <h3>{this.state.errors.username}</h3>
                </div>      
                
                <div className="form" >
                <form className="signup-form" >
                    <h2>Sign Up</h2>
                        <div>
                            <label className="form-label">Username</label>
                        </div>
                        <input
                        name="username"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleChange}
                        required 
                        />
                    
                
                        <div>
                            <label className="form-label">Password</label>
                        </div>
                        <input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required 
                        />
                    
                    <button onClick={this.handleSubmit} className='main-btn'>
                        <span>SUBMIT</span>
                    </button>
                </form>       
                </div>
            </div>
        )

    }

}


export default SignUpForm


            