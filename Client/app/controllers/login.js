import Ember from 'ember';

export default Ember.Controller.extend({
 
  username: '',
  password: '',
  actions: {
    updateUsername(event) {
      console.log('Username:', event.target.value);  
      this.set('username', event.target.value);
    },
    
    updatePassword(event) {
      console.log('Password:', event.target.value);  
      this.set('password', event.target.value);
    }
  }
});

