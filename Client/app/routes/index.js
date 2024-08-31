import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.$.ajax({
      url: 'http://localhost:8080/eventlogs/logtypecounts',
      dataType: 'text'
    }).then((response) => {
      try {
        let cleanedResponse = response.trim();
        if (cleanedResponse.endsWith(',')) {
          cleanedResponse = cleanedResponse.slice(0, -1);
        }

        const data = JSON.parse(cleanedResponse);

        console.log("Parsed data:", data);

        return {
          labels: Object.keys(data),
          counts: Object.values(data)
        };
      } catch (e) {
        console.error('Error parsing JSON:', e);
        return {
          labels: [],
          counts: []
        };
      }
    }).fail((jqXHR, textStatus, errorThrown) => {
      console.error('Error fetching log type counts:', textStatus, errorThrown);
      return {
        labels: [],
        counts: []
      };
    });
  }
});

