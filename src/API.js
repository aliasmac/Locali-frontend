
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

    static getUserObj (id) {
      return fetch(`http://localhost:3000/api/v1/users/${id}`)
        .then(resp => resp.json())
    }

  
    static getUserBroadcasts () {
      return fetch('http://localhost:3000/items', {
        headers: { 'Authorization': localStorage.token }
      }).then(resp => resp.json())
    }


    static newBroadCast (broadcast) {
      console.log(broadcast)
      return fetch('http://localhost:3000/api/v1/broadcasts', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: broadcast.name,
          pin: broadcast.pin,
          broadcaster_id: broadcast.broadcaster_id
        })
      }).then(resp => resp.json())
    }

    static addMessage (messageObj) {
      return fetch('http://localhost:3000/api/v1/messages', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          content: messageObj.message,
          geofence: messageObj.geofence,
          broadcast_id: messageObj.broadcast_id
        })
      }).then(resp => resp.json())
    }

    static saveBroadCast (id) {
      return fetch(`http://localhost:3000/api/v1/broadcasts/${id}`, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          saved: true,
        })
      })
    }

    static getLastbroadcast () {
      return fetch(`http://localhost:3000/api/v1/lastbroadcast`)
        .then(resp => resp.json())
    }

    static deleteBroadcast (id) {
      return fetch(`http://localhost:3000/api/v1/broadcasts/${id}`, {
        method: 'DELETE',
      })
    }

    static removeMessage (id) {
      return fetch(`http://localhost:3000/api/v1/messages/${id}`, {
        method: 'DELETE',
      })
    }

    static editMessage (message, id) {
      return fetch( `http://localhost:3000/api/v1/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: message
        })
      }).then(resp => resp.json())
    }

  }

  
  export default API

 




  