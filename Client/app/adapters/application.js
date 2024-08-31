// app/adapters/application.js
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'http://localhost:8080',
  namespace: 'eventlogs'  
});
