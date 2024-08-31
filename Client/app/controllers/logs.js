
// version 1

// import Ember from 'ember';

// export default Ember.Controller.extend({
//   queryParams: ['page', 'perPage', 'searchTerm', 'scrollId', 'sortBy','sortOrder'],
//   page: 1,
//   perPage: 10,
//   searchTerm: '',
//   scrollId: null,
//   sortBy: '', 
//   sortOrder: 'asc',
  

//   totalPages: Ember.computed('totalCount', 'perPage', function() {
    
//     let totalCount = this.get('model.totalCount') || 0;
//     let perPage = this.get('perPage');
//     return Math.ceil(totalCount / perPage);
//   }),

//   totalPagesArray: Ember.computed('totalPages', function() {
//         let totalPages = this.get('totalPages');
//         let pagesArray = [];
//         for (let i = 1; i <= totalPages; i++) {
//           pagesArray.push(i);
//         }
//         return pagesArray;
//       }),

//       logs: Ember.computed('model.logs', function() {
//             return this.get('model.logs') || [];
//           }),

//   sortedLogs: Ember.computed('logs.[].{EventCode,TimeGenerated}', 'sortBy', function() {
//     let sortBy = this.get('sortBy');
//     let logs = this.get('logs').toArray();

  
//     if (!['EventCode', 'TimeGenerated'].includes(sortBy)) {
//       sortBy = 'EventCode'; // Default if invalid
//     }

//     return logs.sort((a, b) => {
//       if (a.EventCode === b.EventCode) {
        
//         let timeA = new Date(a.TimeGenerated);
//         let timeB = new Date(b.TimeGenerated);
//         return timeA - timeB; // Ascending order
//       } else {
        
//         if (a.EventCode > b.EventCode) {
//           return 1;
//         } else if (a.EventCode < b.EventCode) {
//           return -1;
//         } else {
//           return 0;
//         }
//       }
//     });
//   }),

//   actions: {
//     searchLogs() {
//       this.set('page', 1);
//       this.set('scrollId', null);
//       this.get('target').send('refreshModel');
      
//     },
//     clearSearch() {
//       this.set('searchTerm', '');
//       this.set('scrollId', null); // Reset scrollId
//       this.get('target').send('refreshModel');
//     },
//     nextPage() {
//       let currentPage = this.get('page');
//       this.set('page', currentPage + 1);
//     },

//     previousPage() {
//       let currentPage = this.get('page');
//       if (currentPage > 1) {
//         this.set('page', currentPage - 1);
//       }
//     },

//     goToPage(page) {
//       this.set('page', page);
//     },

//     changePerPage(perPage) {
//       console.log('PerPage changed to:', perPage);
//       this.set('perPage', perPage);
//       this.set('scrollId', null); // resetting scrollid
      
//       this.get('target').send('refreshModel');



//           },

//     refreshModel() {
//       this.get('target').send('refreshModel');
//     },
//     sortByField(field) {
//             this.set('sortBy', field);
//             this.toggleProperty('sortOrder');
//           },

//     updateSortBy(field) {
//       this.set('sortBy', field);
//       this.get('target').send('refreshModel');
//     }
//   }
// });






//version 2  work for /fetchlogs

// import Ember from 'ember';  

// export default Ember.Controller.extend({
//     logs: Ember.A(),
//     pageSize: 10, // Adjust size for each scroll batch
//     currentPage: 1,
//     totalRecords: 0,
//     searchTerm: '',
//     scrollId: null, // For tracking scroll state

//     // Compute total pages based on total records and page size
//     totalPages: Ember.computed('totalRecords', 'pageSize', function() {
//         return Math.ceil(this.get('totalRecords') / this.get('pageSize'));
//     }),

  

//     actions: {
//         // Fetch logs with support for scrolling
//         fetchLogs() {
//             let pageSize = this.get('pageSize');
//             let searchTerm = this.get('searchTerm');
//             let currentPage = this.get('currentPage');
    
//             // Build the query parameters
//             let queryParams = {
//                 size: pageSize,
//                 page: currentPage,  // Use currentPage here
//                 searchTerm: searchTerm
//             };
    
//             Ember.$.ajax({
//                 url: `http://localhost:8080/eventlogs/fetchlogs`,
//                 method: 'GET',
//                 data: queryParams,
//                 success: (response) => {
//                     if (response.logs) {
//                         // Replace the logs array with the new data
//                         this.set('logs', response.logs);
//                         this.set('totalRecords', response.totalRecords); // Update total records
//                     }
//                 },
//                 error: (error) => {
//                     console.error("Failed to fetch logs:", error);
//                 }
//             });
//         },
    
//         // Set page size and reset pagination
//         setPageSize(pageSize) {
//             this.set('pageSize', parseInt(pageSize, 10));
//             this.set('currentPage', 1);
//             this.send('fetchLogs');
//         },
    
//         // Go to the previous page
//         previousPage() {
//             if (this.get('currentPage') > 1) {
//                 this.decrementProperty('currentPage');
//                 this.send('fetchLogs');
//             }
//         },
    
//         // Go to the next page
//         nextPage() {
//             if (this.get('currentPage') < this.get('totalPages')) {
//                 this.incrementProperty('currentPage');
//                 this.send('fetchLogs');
//             }
//         },
    
//         // Go to a specific page
//         goToPage(pageNumber) {
//             pageNumber = parseInt(pageNumber, 10);
//             if (pageNumber > 0 && pageNumber <= this.get('totalPages')) {
//                 this.set('currentPage', pageNumber);
//                 this.send('fetchLogs');
//             }
//         },
    
//         // Search and reset pagination
//         searchLogs() {
//             this.set('currentPage', 1); // Reset to first page on search
//             this.send('fetchLogs');
//         }
//     }
// });



import Ember from 'ember';

export default Ember.Controller.extend({
    logs: Ember.A(),
    pageSize: 10,
    currentPage: 1,
    totalRecords: 0,
    searchTerm: '',
    scrollId: null,
    sortField: 'TimeGenerated', // Default sort field
    sortOrder: 'asc', // Default sort order

    // Compute total pages based on total records and page size
    totalPages: Ember.computed('totalRecords', 'pageSize', function() {
        return Math.ceil(this.get('totalRecords') / this.get('pageSize'));
    }),

    // Computed property to sort logs
    sortedLogs: Ember.computed('logs', 'sortField', 'sortOrder', function() {
        let logs = this.get('logs');
        let sortField = this.get('sortField');
        let sortOrder = this.get('sortOrder');

        return logs.sortBy(sortField).reverse(); // Reverse for descending order
    }),

    actions: {
        // Fetch logs with support for sorting
        fetchLogs() {
            let pageSize = this.get('pageSize');
            let searchTerm = this.get('searchTerm');
            let currentPage = this.get('currentPage');
            let sortField = this.get('sortField');
            let sortOrder = this.get('sortOrder');

            // Build the query parameters
            let queryParams = {
                size: pageSize,
                page: currentPage,
                searchTerm: searchTerm,
                sortField: sortField,
                sortOrder: sortOrder
            };

            Ember.$.ajax({
                url: `http://localhost:8080/eventlogs/fetchlogs`,
                method: 'GET',
                data: queryParams,
                success: (response) => {
                    if (response.logs) {
                        this.set('logs', response.logs);
                        this.set('totalRecords', response.totalRecords);
                    }
                },
                error: (error) => {
                    console.error("Failed to fetch logs:", error);
                }
            });
        },

        // Set page size and reset pagination
        setPageSize(pageSize) {
            this.set('pageSize', parseInt(pageSize, 10));
            this.set('currentPage', 1);
            this.send('fetchLogs');
        },

        // Go to the previous page
        previousPage() {
            if (this.get('currentPage') > 1) {
                this.decrementProperty('currentPage');
                this.send('fetchLogs');
            }
        },

        // Go to the next page
        nextPage() {
            if (this.get('currentPage') < this.get('totalPages')) {
                this.incrementProperty('currentPage');
                this.send('fetchLogs');
            }
        },

        // Go to a specific page
        goToPage(pageNumber) {
            pageNumber = parseInt(pageNumber, 10);
            if (pageNumber > 0 && pageNumber <= this.get('totalPages')) {
                this.set('currentPage', pageNumber);
                this.send('fetchLogs');
            }
        },

        // Search and reset pagination
        searchLogs() {
            this.set('currentPage', 1); // Reset to first page on search
            this.send('fetchLogs');
        },

        // Sort logs based on selected criteria
        sortLogs(field) {
            this.set('sortField', field);
            this.toggleProperty('sortOrder'); // Toggle between 'asc' and 'desc'
            this.send('fetchLogs');
        }
    }
});
