import Ember from 'ember';

export default Ember.Service.extend({
  isAuthenticated: false,
  websocket: null,
  init() {
    this._super(...arguments);
    this.restoreSession();
    if (this.get('isAuthenticated')) {
      this.connectWebSocket();
    }
  },

  authenticate(username, password) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        url: 'http://localhost:8080/eventlogs/j_security_check',
        type: 'POST',
        data: {
          j_username: username,
          j_password: password
        },
        success: (response, textStatus, xhr) => {
        
          if (xhr.status === 200 && !response.includes("Login failed...")) {
            this.set('isAuthenticated', true);
            localStorage.setItem('isAuthenticated', 'true');
            this.connectWebSocket();
            resolve(true);
          } else {
            this.set('isAuthenticated', false);
            resolve(false);
          }
        },
        error: () => {
          this.set('isAuthenticated', false);
          resolve(false);
        }
      });
    });
  },

  restoreSession() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      this.set('isAuthenticated', true);
    }
  },

  connectWebSocket() {
    if (this.get('websocket')) {
      console.log("WebSocket already connected.");
      return;
    }

    this.set('websocket', new WebSocket('ws://localhost:8080/eventlogs/logsocket'));

    this.get('websocket').onopen = () => {
      console.log('WebSocket connection opened.');
    };

    this.get('websocket').onmessage = (event) => {
      console.log('Message from server ', event.data);
    };

    this.get('websocket').onclose = () => {
      console.log('WebSocket connection closed.');
      this.set('websocket', null);
    };

    this.get('websocket').onerror = (error) => {
      console.error('WebSocket error: ', error);
    };
  },


  logout() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        url: 'http://localhost:8080/eventlogs/logout',
        type: 'POST',
        success: () => {

           
              
          this.set('isAuthenticated', false);  
          localStorage.removeItem('isAuthenticated');
          if (this.get('websocket')) {
            this.get('websocket').close();
            this.set('websocket', null);
            console.log("websocket closed");
        } 
          resolve();
        },
        error: (xhr, status, error) => {
          console.error('Logout failed: ', status, error);
          reject();
        }
      });
    });
  }
});
