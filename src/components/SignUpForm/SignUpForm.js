import React from 'react'
import API from '../../API'

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
        const {username, password} = this.state
        API.signup(username, password)
            .then(user => {
                this.props.login(user)
            })
    }


    render() {

        return (
            <div>
                <h2>Sign Up</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input
                        name="username"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleChange}
                        required 
                        />
                    </div>
                    <div>
                        <input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required 
                        />
                    </div>
                    <button className='main-btn'>
                        SUBMIT
                    </button>
                </form>
            </div>
        )

    }

}


export default SignUpForm