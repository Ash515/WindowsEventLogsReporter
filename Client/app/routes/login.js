import Ember from 'ember';

export default Ember.Route.extend({
  authentication: Ember.inject.service(),

  actions: {
    login() {
      const username = this.get('controller.username');
      const password = this.get('controller.password');
      console.log('Login attempt with:', username, password);

      this.get('authentication').authenticate(username, password).then((authenticated) => {
        if (authenticated) {
          this.transitionTo('index');  
        } else {
          alert('Login failed. Please check your credentials.');
          this.transitionTo('login'); 
        }
      }).catch((error) => {
        alert('An error occurred during login. Please try again.');
        console.error('Login error:', error);
      });
    }
  }
});
