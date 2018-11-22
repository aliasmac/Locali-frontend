
class API {
    static init () {
      this.baseUrl = 'http://localhost:3000'
      this.loginUrl = this.baseUrl + '/api/v1/login'
      this.signupUrl = this.baseUrl + '/api/v1/users'
      this.validateUrl = this.baseUrl + '/api/v1/validate'
      this.broadcastsUrl = this.baseUrl + '/api/v1/broadcasts'
    }

    

    static signup (username, password) {
        return fetch('http://localhost:3000/api/v1/users', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username,
            password
          })
        }).then(resp => resp.json())
    }
    

    static login (obj) {
    console.log("HELLO FROM LOGIN IN API.js", obj)
      return fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: obj.username,
          password: obj.password
        })
      }).then(resp => resp.json())
    }


    static validate () {
    console.log("Hello from inside API.validate") 
      const token = localStorage.getItem('token')
      console.log("TOKEN", token)
      return fetch('http://localhost:3000/api/v1/validate', {
        headers: {'Authorization': token}
      }).then(resp => resp.json())
    }
  
    static getUserBroadcasts () {
      return fetch('http://localhost:3001/items', {
        headers: { 'Authorization': localStorage.token }
      }).then(resp => resp.json())
    }
  }
  
  
  export default API

