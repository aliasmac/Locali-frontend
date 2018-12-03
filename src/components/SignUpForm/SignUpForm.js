import React from 'react'

import API from '../../API'
import './SignUpForm.css'

class SignUpForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
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
        API.signup(username, password)
            .then(user => {
                this.props.login(user)
            })
    }


    render() {

        return (
            <div className="signup-page">
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


            