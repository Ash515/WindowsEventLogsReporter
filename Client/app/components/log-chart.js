import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this._super(...arguments);
  
    console.log("Labels:", this.get('labels'));
    console.log("Counts:", this.get('counts'));
    
    this.drawChart();
  },

  drawChart() {
    let canvas = this.element.querySelector('#myPieChart');
    
    if (!canvas) {
      console.error('Canvas element with ID "myPieChart" not found');
      return;
    }
    
    let ctx = canvas.getContext('2d');

    let data = {
      labels: this.get('labels'), 
      datasets: [{
        data: this.get('counts'), 
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }]
    };

   
    new Chart(ctx, {
      type: 'pie',
      data: data
    });
  }
});
