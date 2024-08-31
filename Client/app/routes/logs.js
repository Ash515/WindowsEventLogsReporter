
// version 1

// import Ember from 'ember';

// export default Ember.Route.extend({
//   queryParams: {
//     page: {
//       refreshModel: true
//     },
//     perPage: {
//       refreshModel: true
//     },
//     searchTerm: {
//       refreshModel: true
//     },
//     scrollId: {
//       refreshModel: true
//     },
//     sortBy: {
//       refreshModel: true
//     },
//     sortOrder: {
//       refreshModel: true
//     }
//   },

//   model(params) {
//     let { page, perPage, searchTerm, scrollId, sortBy, sortOrder } = params;

//     page = page || 1;
//     perPage = perPage || 10;
//     searchTerm = searchTerm || '';
//     scrollId = scrollId || '';
//     sortBy = sortBy || ''; 
//     sortOrder = sortOrder || 'asc';

//     return Ember.$.ajax({
//       url: 'http://localhost:8080/eventlogs/getlogs',
//       method: 'GET',
//       data: {
//         page,
//         perPage,
//         searchTerm,
//         scrollId,
//         sortBy,
//         sortOrder
//       }
//     }).then((response) => {
//       return {
//         logs: response.logs,
//         scrollId: response.scrollId,
//         totalCount: response.totalCount
//       };
//     });
//   },

//   setupController(controller, model) {
//     this._super(controller, model);

//     controller.set('logs', model.logs);
//     controller.set('scrollId', model.scrollId);
//     controller.set('totalCount', model.totalCount);
//   },

//   actions: {
//     searchLogs(searchTerm) {
//       this.transitionTo({ queryParams: { searchTerm, page: 1, scrollId: null } });
//     },

//     nextPage() {
//       let nextPage = this.controller.get('page') + 1;
//       this.transitionTo({ queryParams: { page: nextPage } });
//     },

//     previousPage() {
//       let prevPage = this.controller.get('page') - 1;
//       this.transitionTo({ queryParams: { page: prevPage } });
//     },

//     goToPage(page) {
//       this.transitionTo({ queryParams: { page } });
//     },

//     changePerPage(perPage) {
//       this.transitionTo({ queryParams: { perPage} });
//     },

//     updateSortBy(sortBy) {
//       this.transitionTo({ queryParams: { sortBy } });
//     },

//     updateSortOrder(sortOrder) {
//       this.transitionTo({ queryParams: { sortOrder } });
//     },

//     refreshModel() {
//       this.refresh();
//     }
//   }
// });





//version 2

import Ember from 'ember';

export default Ember.Route.extend({
    setupController(controller) {
        this._super(...arguments);
        controller.send('fetchLogs'); // Fetch initial logs when the route is loaded
    },

    actions: {
        fetchLogs() {
            this.controller.send('fetchLogs');
        }
    }
});
