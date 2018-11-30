import React from 'react'

import API from '../../API'
import './LoginForm.css'

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
            <div className="login-page">
                <div className="form" >
                <form className="login-form" >
                    <h2>Login</h2>
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


export default LoginForm


// <div class="login-page">
//   <div class="form">
//     <form class="register-form">
//       <input type="text" placeholder="name"/>
//       <input type="password" placeholder="password"/>
//       <input type="text" placeholder="email address"/>
//       <button>create</button>
//       <p class="message">Already registered? <a href="#">Sign In</a></p>
      
//     </form>
//     <form class="login-form">
//       <input type="text" placeholder="username"/>
//       <input type="password" placeholder="password"/>
//       <button>login</button>
//       <p class="message">Not registered? <a href="#">Create an account</a></p>
//     </form>
//   </div>
// </div>




// import React from 'react'
// import API from '../../API'


// import { Button, Form } from 'semantic-ui-react'



// class LoginForm extends React.Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             username: "",
//             password: ""
//         }
//     }

//     handleChange = (e) => {
//         this.setState({ [e.target.name]: e.target.value })
//     }

//     handleSubmit = (e) => {
//         console.log("SUBMIT")
//         e.preventDefault()
//         this.login(this.state)
//         this.setState({
//             username: "",
//             password: ""
//         })
//     }

//     login = (obj) => {
//         API.login(obj)
//             .then(user => {
//                 this.props.login(user)
//             })
//     }


//     render() {

//         return (
//             <div>
//                 <h2>Login</h2>
//                 <Form>
//                     <Form.Field onSubmit={this.handleSubmit} >
//                     <label>Username</label>
//                     <input
//                         name="username"
//                         type="text"
//                         value={this.state.username}
//                         onChange={this.handleChange}
//                         required 
//                     />
//                     </Form.Field>
//                     <Form.Field>
//                     <label>Password</label>
//                     <input
//                         name="password"
//                         type="password"
//                         value={this.state.password}
//                         onChange={this.handleChange}
//                         required 
//                     />
//                     </Form.Field>
//                     <Button color='blue' type='submit'>Submit</Button>
//                 </Form>
//             </div>
//         )

//     }

// }


// export default LoginForm


