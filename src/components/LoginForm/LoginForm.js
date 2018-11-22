import React from 'react'
import API from '../../API'

class LoginForm extends React.Component {

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
        console.log("SUBMIT")
        e.preventDefault()
        this.login(this.state)
        this.setState({
            username: "",
            password: ""
        })
    }

    login = (obj) => {
        API.login(obj)
            .then(user => {
                this.props.login(user)
            })
    }


    render() {

        return (
            <div>
                <h2>Login</h2>
                <form >
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
                </form>
                <button onClick={this.handleSubmit} className='main-btn'>
                    SUBMIT
                </button>
            </div>
        )

    }

}


export default LoginForm