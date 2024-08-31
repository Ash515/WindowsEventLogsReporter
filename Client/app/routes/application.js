import Ember from 'ember';

export default Ember.Route.extend({
  authentication: Ember.inject.service(),

  beforeModel(transition) {
    this.get('authentication').restoreSession();
    if (!this.get('authentication.isAuthenticated')) {
      this.transitionTo('login'); 
    }
  },

  actions: {
    logout() {
      Ember.$.ajax({
        url: 'http://localhost:8080/eventlogs/logout', 
        type: 'POST',
        success: () => {
        
          this.get('authentication').set('isAuthenticated', false);
          this.get('authentication').logout();
          this.transitionTo('login');  
          console.log("logged out");  
        },
        error: (xhr, status, error) => {
          console.error('Logout failed: ', status, error);
  
        }
      });
    }
  }
});
