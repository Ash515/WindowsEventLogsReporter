import DS from 'ember-data';

export default DS.Model.extend({
  logtype: DS.attr('string'),
  message: DS.attr('string'),
  sourceName: DS.attr('string'),
  leveltype: DS.attr('string'),
  eventcode: DS.attr('number'),
  timeGenerated: DS.attr('date'),
  timestamp: DS.attr('date')
});


