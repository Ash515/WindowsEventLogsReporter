

import Ember from 'ember';

export default Ember.Service.extend({
    socket: null,

    init() {
        this._super(...arguments);
    },

    closeWebSocket() {
        let socket = this.get('socket');
        if (socket) {
            socket.close();
        }
    }
});



