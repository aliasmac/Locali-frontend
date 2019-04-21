
class API {
    static init () {
      this.baseUrl = 'http://localhost:3000/api/v1'
      this.loginUrl = this.baseUrl + '/login'
      this.signupUrl = this.baseUrl + '/users'
      this.validateUrl = this.baseUrl + '/validate'
      this.broadcastsUrl = this.baseUrl + '/broadcasts'
    }

    // http://localhost:3000/api/v1
    // https://locali-communications.herokuapp.com/api/v1

    static signup (username, password) {
      console.log(username)
        return fetch(this.signupUrl, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username,
            password
          })
        }).then(resp => resp.json())
    }

    
    static login (obj) {
      return fetch(this.loginUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: obj.username,
          password: obj.password
        })
      }).then(resp => resp.json())
    }


    static validate () {
      const token = localStorage.getItem('token')
      return fetch(this.validateUrl, {
        headers: {'Authorization': token}
      }).then(resp => resp.json())
    }

    static getUserObj (id) {
      return fetch(`http://localhost:3000/api/v1/users/${id}`)
        .then(resp => resp.json())
    }


    static newBroadCast (broadcast) {
      console.log(broadcast)
      return fetch('http://localhost:3000/api/v1/broadcasts', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: broadcast.name,
          code: broadcast.code,
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
        method: 'PATCH', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          saved: true,
        })
      })
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

  API.init()

  export default API

 




  