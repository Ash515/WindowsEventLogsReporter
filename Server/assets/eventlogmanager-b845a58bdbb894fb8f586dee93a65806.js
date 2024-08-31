"use strict";define("eventlogmanager/adapters/application",["exports","ember-data"],function(e,t){e.default=t.default.RESTAdapter.extend({host:"http://localhost:8080",namespace:"eventlogs"})}),define("eventlogmanager/app",["exports","ember","ember/resolver","ember/load-initializers","eventlogmanager/config/environment"],function(e,t,n,a,r){var o=void 0;t.default.MODEL_FACTORY_INJECTIONS=!0,o=t.default.Application.extend({modulePrefix:r.default.modulePrefix,podModulePrefix:r.default.podModulePrefix,Resolver:n.default}),(0,a.default)(o,r.default.modulePrefix),e.default=o}),define("eventlogmanager/components/app-title",["exports","ember"],function(e,t){e.default=t.default.Component.extend({})}),define("eventlogmanager/components/app-version",["exports","ember-cli-app-version/components/app-version","eventlogmanager/config/environment"],function(e,t,n){var a=n.default.APP.name,r=n.default.APP.version;e.default=t.default.extend({version:r,name:a})}),define("eventlogmanager/components/log-chart",["exports","ember"],function(e,t){e.default=t.default.Component.extend({didInsertElement:function(){this._super.apply(this,arguments),console.log("Labels:",this.get("labels")),console.log("Counts:",this.get("counts")),this.drawChart()},drawChart:function(){var e=this.element.querySelector("#myPieChart");if(!e)return void console.error('Canvas element with ID "myPieChart" not found');var t=e.getContext("2d"),n={labels:this.get("labels"),datasets:[{data:this.get("counts"),backgroundColor:["#FF6384","#36A2EB","#FFCE56"]}]};new Chart(t,{type:"pie",data:n})}})}),define("eventlogmanager/components/logout-button",["exports","ember"],function(e,t){e.default=t.default.Component.extend({})}),define("eventlogmanager/controllers/array",["exports","@ember/controller"],function(e,t){e.default=t.default}),define("eventlogmanager/controllers/index",["exports","ember"],function(e,t){e.default=t.default.Controller.extend({})}),define("eventlogmanager/controllers/login",["exports","ember"],function(e,t){e.default=t.default.Controller.extend({username:"",password:"",actions:{updateUsername:function(e){console.log("Username:",e.target.value),this.set("username",e.target.value)},updatePassword:function(e){console.log("Password:",e.target.value),this.set("password",e.target.value)}}})}),define("eventlogmanager/controllers/logs",["exports","ember"],function(e,t){e.default=t.default.Controller.extend({logs:t.default.A(),pageSize:10,currentPage:1,totalRecords:0,searchTerm:"",totalPages:t.default.computed("totalRecords","pageSize",function(){return Math.ceil(this.get("totalRecords")/this.get("pageSize"))}),actions:{fetchLogs:function(){this.get("target").send("fetchLogs")},setPageSize:function(e){this.set("pageSize",parseInt(e,10)),this.set("currentPage",1),this.send("fetchLogs")},previousPage:function(){this.get("currentPage")>1&&(this.decrementProperty("currentPage"),this.send("fetchLogs"))},nextPage:function(){this.get("currentPage")<this.get("totalPages")&&(this.incrementProperty("currentPage"),this.send("fetchLogs"))},goToPage:function(e){(e=parseInt(e,10))>0&&e<=this.get("totalPages")&&(this.set("currentPage",e),this.send("fetchLogs"))},searchLogs:function(){this.set("currentPage",1),this.send("fetchLogs")}}})}),define("eventlogmanager/controllers/object",["exports","@ember/controller"],function(e,t){e.default=t.default}),define("eventlogmanager/helpers/eq",["exports","ember"],function(e,t){function n(e){var t=a(e,2);return t[0]===t[1]}var a=function(){function e(e,t){var n=[],a=!0,r=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(a=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{!a&&i.return&&i.return()}finally{if(r)throw o}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.eq=n,e.default=t.default.Helper.helper(n)}),define("eventlogmanager/helpers/gte",["exports","ember"],function(e,t){function n(e){var t=a(e,2);return t[0]>=t[1]}var a=function(){function e(e,t){var n=[],a=!0,r=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(a=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{!a&&i.return&&i.return()}finally{if(r)throw o}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.gte=n,e.default=t.default.Helper.helper(n)}),define("eventlogmanager/helpers/lte",["exports","ember"],function(e,t){function n(e){var t=a(e,2);return t[0]<=t[1]}var a=function(){function e(e,t){var n=[],a=!0,r=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(a=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{!a&&i.return&&i.return()}finally{if(r)throw o}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.lte=n,e.default=t.default.Helper.helper(n)}),define("eventlogmanager/helpers/range",["exports","ember"],function(e,t){function n(e){for(var t=a(e,2),n=t[0],r=t[1],o=[],l=n;l<=r;l++)o.push(l);return o}var a=function(){function e(e,t){var n=[],a=!0,r=!1,o=void 0;try{for(var l,i=e[Symbol.iterator]();!(a=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{!a&&i.return&&i.return()}finally{if(r)throw o}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.range=n,e.default=t.default.Helper.helper(n)}),define("eventlogmanager/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","eventlogmanager/config/environment"],function(e,t,n){e.default={name:"App Version",initialize:(0,t.default)(n.default.APP.name,n.default.APP.version)}}),define("eventlogmanager/initializers/export-application-global",["exports","ember","eventlogmanager/config/environment"],function(e,t,n){function a(){var e=arguments[1]||arguments[0];if(!1!==n.default.exportApplicationGlobal){var a;if("undefined"!=typeof window)a=window;else if("undefined"!=typeof global)a=global;else{if("undefined"==typeof self)return;a=self}var r,o=n.default.exportApplicationGlobal;r="string"==typeof o?o:t.default.String.classify(n.default.modulePrefix),a[r]||(a[r]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete a[r]}}))}}e.initialize=a,e.default={name:"export-application-global",initialize:a}}),define("eventlogmanager/models/log",["exports","ember-data"],function(e,t){e.default=t.default.Model.extend({logtype:t.default.attr("string"),message:t.default.attr("string"),sourceName:t.default.attr("string"),leveltype:t.default.attr("string"),eventcode:t.default.attr("number"),timeGenerated:t.default.attr("date"),timestamp:t.default.attr("date")})}),define("eventlogmanager/router",["exports","ember","eventlogmanager/config/environment"],function(e,t,n){var a=t.default.Router.extend({location:n.default.locationType});a.map(function(){this.route("index",{path:"/home"}),this.route("login"),this.route("logs"),this.route("signup")}),e.default=a}),define("eventlogmanager/routes/application",["exports","ember"],function(e,t){e.default=t.default.Route.extend({authentication:t.default.inject.service(),beforeModel:function(e){this.get("authentication").restoreSession(),this.get("authentication.isAuthenticated")||this.transitionTo("login")},actions:{logout:function(){var e=this;t.default.$.ajax({url:"http://localhost:8080/eventlogs/logout",type:"POST",success:function(){e.get("authentication").set("isAuthenticated",!1),e.get("authentication").logout(),e.transitionTo("login"),console.log("logged out")},error:function(e,t,n){console.error("Logout failed: ",t,n)}})}}})}),define("eventlogmanager/routes/index",["exports","ember"],function(e,t){e.default=t.default.Route.extend({model:function(){return t.default.$.ajax({url:"http://localhost:8080/eventlogs/logtypecounts",dataType:"text"}).then(function(e){try{var t=e.trim();t.endsWith(",")&&(t=t.slice(0,-1));var n=JSON.parse(t);return console.log("Parsed data:",n),{labels:Object.keys(n),counts:Object.values(n)}}catch(e){return console.error("Error parsing JSON:",e),{labels:[],counts:[]}}}).fail(function(e,t,n){return console.error("Error fetching log type counts:",t,n),{labels:[],counts:[]}})}})}),define("eventlogmanager/routes/login",["exports","ember"],function(e,t){e.default=t.default.Route.extend({authentication:t.default.inject.service(),actions:{login:function(){var e=this,t=this.get("controller.username"),n=this.get("controller.password");console.log("Login attempt with:",t,n),this.get("authentication").authenticate(t,n).then(function(t){t?e.transitionTo("index"):(alert("Login failed. Please check your credentials."),e.transitionTo("login"))}).catch(function(e){alert("An error occurred during login. Please try again."),console.error("Login error:",e)})}}})}),define("eventlogmanager/routes/logs",["exports","ember"],function(e,t){e.default=t.default.Route.extend({websocket:t.default.inject.service(),pageSize:10,currentPage:1,searchTerm:"",setupController:function(e){this._super.apply(this,arguments),e.set("currentPage",this.currentPage),e.set("pageSize",this.pageSize),e.set("searchTerm",this.searchTerm),this.connectWebSocket(e)},connectWebSocket:function(e){var t=this,n=new WebSocket("ws://localhost:8080/eventlogs/fetchlogs");this.set("socket",n),n.onopen=function(){console.log("WebSocket connection opened"),t.sendFetchLogs()},n.onmessage=function(t){var n=JSON.parse(t.data);e.set("totalRecords",n.totalRecords),e.set("currentLogs",n.logs)},n.onerror=function(e){console.error("WebSocket Error:",e)},n.onclose=function(){console.log("WebSocket connection closed")},e.set("socket",n)},sendFetchLogs:function(){var e=this.get("socket"),t=(this.controller.get("currentPage")-1)*this.controller.get("pageSize"),n=this.controller.get("pageSize"),a=this.controller.get("searchTerm");e&&e.readyState===WebSocket.OPEN?e.send(t+";"+n+";"+a):console.error("WebSocket is not open")},actions:{fetchLogs:function(){this.sendFetchLogs()},setPageSize:function(e){this.controller.set("pageSize",parseInt(e,10)),this.controller.set("currentPage",1),this.sendFetchLogs()},previousPage:function(){this.controller.get("currentPage")>1&&(this.controller.decrementProperty("currentPage"),this.sendFetchLogs())},nextPage:function(){this.controller.get("currentPage")<this.controller.get("totalPages")&&(this.controller.incrementProperty("currentPage"),this.sendFetchLogs())},goToPage:function(e){(e=parseInt(e,10))>0&&e<=this.controller.get("totalPages")&&(this.controller.set("currentPage",e),this.sendFetchLogs())},searchLogs:function(){this.controller.set("searchTerm",this.controller.get("searchTerm")),this.controller.set("currentPage",1),this.sendFetchLogs()}},sendFetchLogs:function(){var e=this.get("socket"),t=(this.controller.get("currentPage")-1)*this.controller.get("pageSize"),n=this.controller.get("pageSize"),a=this.controller.get("searchTerm");e&&e.readyState===WebSocket.OPEN?e.send(t+";"+n+";"+a):console.error("WebSocket is not open")},deactivate:function(){var e=this.get("socket");e&&e.close()}})}),define("eventlogmanager/services/authentication",["exports","ember"],function(e,t){e.default=t.default.Service.extend({isAuthenticated:!1,websocket:null,init:function(){this._super.apply(this,arguments),this.restoreSession(),this.get("isAuthenticated")&&this.connectWebSocket()},authenticate:function(e,n){var a=this;return new t.default.RSVP.Promise(function(r,o){t.default.$.ajax({url:"http://localhost:8080/eventlogs/j_security_check",type:"POST",data:{j_username:e,j_password:n},success:function(e,t,n){200!==n.status||e.includes("Login failed...")?(a.set("isAuthenticated",!1),r(!1)):(a.set("isAuthenticated",!0),localStorage.setItem("isAuthenticated","true"),a.connectWebSocket(),r(!0))},error:function(){a.set("isAuthenticated",!1),r(!1)}})})},restoreSession:function(){"true"===localStorage.getItem("isAuthenticated")&&this.set("isAuthenticated",!0)},connectWebSocket:function(){var e=this;if(this.get("websocket"))return void console.log("WebSocket already connected.");this.set("websocket",new WebSocket("ws://localhost:8080/eventlogs/logsocket")),this.get("websocket").onopen=function(){console.log("WebSocket connection opened.")},this.get("websocket").onmessage=function(e){console.log("Message from server ",e.data)},this.get("websocket").onclose=function(){console.log("WebSocket connection closed."),e.set("websocket",null)},this.get("websocket").onerror=function(e){console.error("WebSocket error: ",e)}},logout:function(){var e=this;return new t.default.RSVP.Promise(function(n,a){t.default.$.ajax({url:"http://localhost:8080/eventlogs/logout",type:"POST",success:function(){e.set("isAuthenticated",!1),localStorage.removeItem("isAuthenticated"),e.get("websocket")&&(e.get("websocket").close(),e.set("websocket",null),console.log("websocket closed")),n()},error:function(e,t,n){console.error("Logout failed: ",t,n),a()}})})}})}),define("eventlogmanager/services/websocket",["exports","ember"],function(e,t){e.default=t.default.Service.extend({socket:null,init:function(){this._super.apply(this,arguments)},closeWebSocket:function(){var e=this.get("socket");e&&e.close()}})}),define("eventlogmanager/templates/application",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:6,column:12}},moduleName:"eventlogmanager/templates/application.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n\n\n\n  \n  ");e.appendChild(t,n);var n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(2);return a[0]=e.createMorphAt(t,0,0,n),a[1]=e.createMorphAt(t,2,2,n),e.insertBoundary(t,0),e.insertBoundary(t,null),a},statements:[["content","app-title",["loc",[null,[1,0],[1,13]]]],["content","outlet",["loc",[null,[6,2],[6,12]]]]],locals:[],templates:[]}}())}),define("eventlogmanager/templates/components/app-title",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:7,column:0}},moduleName:"eventlogmanager/templates/components/app-title.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("div");e.setAttribute(n,"class","title-bar");var a=e.createTextNode("\n");e.appendChild(n,a);var a=e.createElement("h2");e.setAttribute(a,"id","app-title-id");var r=e.createTextNode("Windows Event Logs360");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),a},statements:[["content","yield",["loc",[null,[1,0],[1,9]]]]],locals:[],templates:[]}}())}),define("eventlogmanager/templates/components/log-chart",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:5,column:0}},moduleName:"eventlogmanager/templates/components/log-chart.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createElement("div");e.setAttribute(n,"class","chart-wrapper");var a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("canvas");e.setAttribute(a,"id","myPieChart"),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),a},statements:[["content","yield",["loc",[null,[1,0],[1,9]]]]],locals:[],templates:[]}}())}),define("eventlogmanager/templates/components/logout-button",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:2,column:0}},moduleName:"eventlogmanager/templates/components/logout-button.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),a},statements:[["content","yield",["loc",[null,[1,0],[1,9]]]]],locals:[],templates:[]}}())}),define("eventlogmanager/templates/index",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){var e=function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:3,column:25},end:{line:3,column:49}},moduleName:"eventlogmanager/templates/index.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("Home");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}(),t=function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:4,column:25},end:{line:4,column:51}},moduleName:"eventlogmanager/templates/index.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("LogBase");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:19,column:10}},moduleName:"eventlogmanager/templates/index.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("nav"),a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("ul");e.setAttribute(a,"class","nav-list");var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("li");e.setAttribute(r,"class","nav-item");var o=e.createComment("");e.appendChild(r,o),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("li");e.setAttribute(r,"class","nav-item");var o=e.createComment("");e.appendChild(r,o),e.appendChild(a,r);var r=e.createTextNode("\n    \n    ");e.appendChild(a,r);var r=e.createElement("button");e.setAttribute(r,"id","logout-button");var o=e.createTextNode("Logout");e.appendChild(r,o),e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n\n\n\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n\n");e.appendChild(t,n);var n=e.createElement("h3");e.setAttribute(n,"id","chart-title");var a=e.createTextNode("Log Type Counts");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n\n");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[0,1]),r=e.childAt(a,[5]),o=new Array(5);return o[0]=e.createMorphAt(e.childAt(a,[1]),0,0),o[1]=e.createMorphAt(e.childAt(a,[3]),0,0),o[2]=e.createElementMorph(r),o[3]=e.createMorphAt(t,4,4,n),o[4]=e.createMorphAt(t,6,6,n),e.insertBoundary(t,null),o},statements:[["block","link-to",["index"],[],0,null,["loc",[null,[3,25],[3,61]]]],["block","link-to",["logs"],[],1,null,["loc",[null,[4,25],[4,63]]]],["element","action",["logout"],[],["loc",[null,[6,31],[6,50]]]],["inline","log-chart",[],["labels",["subexpr","@mut",[["get","model.labels",["loc",[null,[17,19],[17,31]]]]],[],[]],"counts",["subexpr","@mut",[["get","model.counts",["loc",[null,[17,39],[17,51]]]]],[],[]]],["loc",[null,[17,0],[17,53]]]],["content","outlet",["loc",[null,[19,0],[19,10]]]]],locals:[],templates:[e,t]}}())}),define("eventlogmanager/templates/login",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:13,column:0}},moduleName:"eventlogmanager/templates/login.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("div");e.setAttribute(n,"class","login-container");var a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("h2"),r=e.createTextNode("Login");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("form");e.setAttribute(a,"class","login-form");var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("label");e.setAttribute(r,"for","username");var o=e.createTextNode("Username:");e.appendChild(r,o),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("input");e.setAttribute(r,"type","text"),e.setAttribute(r,"id","username"),e.setAttribute(r,"class","input-field"),e.appendChild(a,r);var r=e.createTextNode("\n    \n    ");e.appendChild(a,r);var r=e.createElement("label");e.setAttribute(r,"for","password");var o=e.createTextNode("Password:");e.appendChild(r,o),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("input");e.setAttribute(r,"type","password"),e.setAttribute(r,"id","password"),e.setAttribute(r,"class","input-field"),e.appendChild(a,r);var r=e.createTextNode("\n    \n    ");e.appendChild(a,r);var r=e.createElement("button");e.setAttribute(r,"type","submit"),e.setAttribute(r,"class","submit-button");var o=e.createTextNode("Login");e.appendChild(r,o),e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[0,3]),r=e.childAt(a,[3]),o=e.childAt(a,[7]),l=new Array(5);return l[0]=e.createElementMorph(a),l[1]=e.createAttrMorph(r,"value"),l[2]=e.createAttrMorph(r,"oninput"),l[3]=e.createAttrMorph(o,"value"),l[4]=e.createAttrMorph(o,"oninput"),l},statements:[["element","action",["login"],["on","submit"],["loc",[null,[3,8],[3,38]]]],["attribute","value",["get","username",["loc",[null,[5,45],[5,53]]]]],["attribute","oninput",["subexpr","action",[["subexpr","mut",[["get","username",["loc",[null,[5,78],[5,86]]]]],[],["loc",[null,[5,73],[5,87]]]]],["value","target.value"],["loc",[null,[5,64],[5,110]]]]],["attribute","value",["get","password",["loc",[null,[8,49],[8,57]]]]],["attribute","oninput",["subexpr","action",[["subexpr","mut",[["get","password",["loc",[null,[8,82],[8,90]]]]],[],["loc",[null,[8,77],[8,91]]]]],["value","target.value"],["loc",[null,[8,68],[8,114]]]]]],locals:[],templates:[]}}())}),define("eventlogmanager/templates/logs",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){var e=function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:176,column:8},end:{line:185,column:8}},moduleName:"eventlogmanager/templates/logs.hbs"},arity:1,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("            ");e.appendChild(t,n);var n=e.createElement("tr"),a=e.createTextNode("\n                ");e.appendChild(n,a);var a=e.createElement("td"),r=e.createComment("");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n                ");e.appendChild(n,a);var a=e.createElement("td"),r=e.createComment("");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n                ");e.appendChild(n,a);var a=e.createElement("td"),r=e.createComment("");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n                ");e.appendChild(n,a);var a=e.createElement("td"),r=e.createComment("");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n                ");e.appendChild(n,a);var a=e.createElement("td"),r=e.createComment("");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n                ");e.appendChild(n,a);var a=e.createElement("td"),r=e.createComment("");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n            ");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[1]),r=new Array(6);return r[0]=e.createMorphAt(e.childAt(a,[1]),0,0),r[1]=e.createMorphAt(e.childAt(a,[3]),0,0),r[2]=e.createMorphAt(e.childAt(a,[5]),0,0),r[3]=e.createMorphAt(e.childAt(a,[7]),0,0),r[4]=e.createMorphAt(e.childAt(a,[9]),0,0),r[5]=e.createMorphAt(e.childAt(a,[11]),0,0),r},statements:[["content","log.Type",["loc",[null,[178,20],[178,32]]]],["content","log.EventCode",["loc",[null,[179,20],[179,37]]]],["content","log.Logfile",["loc",[null,[180,20],[180,35]]]],["content","log.SourceName",["loc",[null,[181,20],[181,38]]]],["content","log.TimeGenerated",["loc",[null,[182,20],[182,41]]]],["content","log.Message",["loc",[null,[183,20],[183,35]]]]],locals:["log"],templates:[]}}();return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:188,column:0}},moduleName:"eventlogmanager/templates/logs.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("h2"),a=e.createTextNode("Logs");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("div");e.setAttribute(n,"class","search-container");var a=e.createTextNode("\n    ");e.appendChild(n,a);var a=e.createElement("input");e.setAttribute(a,"type","text"),e.setAttribute(a,"placeholder","Search logs..."),e.appendChild(n,a);var a=e.createTextNode("\n    ");e.appendChild(n,a);var a=e.createElement("button"),r=e.createTextNode("Search");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("div");e.setAttribute(n,"class","pagination-controls");var a=e.createTextNode("\n    ");e.appendChild(n,a);var a=e.createElement("button"),r=e.createTextNode("Previous");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n\n    ");e.appendChild(n,a);var a=e.createElement("label");e.setAttribute(a,"for","page-select");var r=e.createTextNode("Go to Page:");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n    ");e.appendChild(n,a);var a=e.createElement("input");e.setAttribute(a,"type","number"),e.setAttribute(a,"id","page-select"),e.setAttribute(a,"min","1"),e.appendChild(n,a);var a=e.createTextNode("\n    ");e.appendChild(n,a);var a=e.createElement("button"),r=e.createTextNode("Go");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n\n    ");e.appendChild(n,a);var a=e.createElement("span"),r=e.createTextNode(" of ");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n\n    ");e.appendChild(n,a);var a=e.createElement("button"),r=e.createTextNode("Next");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("div");e.setAttribute(n,"class","page-size-controls");var a=e.createTextNode("\n    ");e.appendChild(n,a);var a=e.createElement("label");e.setAttribute(a,"for","page-size");var r=e.createTextNode("Records per page:");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n    ");e.appendChild(n,a);var a=e.createElement("select");e.setAttribute(a,"id","page-size");var r=e.createTextNode("\n        ");e.appendChild(a,r);var r=e.createElement("option");e.setAttribute(r,"value","10");var o=e.createTextNode("10");e.appendChild(r,o),e.appendChild(a,r);var r=e.createTextNode("\n        ");e.appendChild(a,r);var r=e.createElement("option");e.setAttribute(r,"value","25");var o=e.createTextNode("25");e.appendChild(r,o),e.appendChild(a,r);var r=e.createTextNode("\n        ");e.appendChild(a,r);var r=e.createElement("option");e.setAttribute(r,"value","50");var o=e.createTextNode("50");e.appendChild(r,o),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("table"),a=e.createTextNode("\n    ");e.appendChild(n,a);var a=e.createElement("thead"),r=e.createTextNode("\n        ");e.appendChild(a,r);var r=e.createElement("tr"),o=e.createTextNode("\n            ");e.appendChild(r,o);var o=e.createElement("th"),l=e.createTextNode("Log Type");e.appendChild(o,l),e.appendChild(r,o);var o=e.createTextNode("\n            ");e.appendChild(r,o);var o=e.createElement("th"),l=e.createTextNode("Event Code");e.appendChild(o,l),e.appendChild(r,o);var o=e.createTextNode("\n            ");e.appendChild(r,o);var o=e.createElement("th"),l=e.createTextNode("Level");e.appendChild(o,l),e.appendChild(r,o);var o=e.createTextNode("\n            ");e.appendChild(r,o);var o=e.createElement("th"),l=e.createTextNode("Source");e.appendChild(o,l),e.appendChild(r,o);var o=e.createTextNode("\n            ");e.appendChild(r,o);var o=e.createElement("th"),l=e.createTextNode("Time Created");e.appendChild(o,l),e.appendChild(r,o);var o=e.createTextNode("\n            ");e.appendChild(r,o);var o=e.createElement("th"),l=e.createTextNode("Message");e.appendChild(o,l),e.appendChild(r,o);var o=e.createTextNode("\n        ");e.appendChild(r,o),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n    ");e.appendChild(n,a);var a=e.createElement("tbody"),r=e.createTextNode("\n");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("    ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[5]),r=e.childAt(a,[1]),o=e.childAt(a,[3]),l=e.childAt(t,[7]),i=e.childAt(l,[1]),d=e.childAt(l,[5]),c=e.childAt(l,[7]),s=e.childAt(l,[11]),u=e.childAt(t,[9,3]),p=new Array(14);return p[0]=e.createAttrMorph(r,"value"),p[1]=e.createAttrMorph(r,"oninput"),p[2]=e.createElementMorph(o),p[3]=e.createAttrMorph(i,"disabled"),p[4]=e.createElementMorph(i),p[5]=e.createAttrMorph(d,"max"),p[6]=e.createAttrMorph(d,"value"),p[7]=e.createAttrMorph(d,"oninput"),p[8]=e.createElementMorph(c),p[9]=e.createMorphAt(e.childAt(l,[9]),1,1),p[10]=e.createAttrMorph(s,"disabled"),p[11]=e.createElementMorph(s),p[12]=e.createAttrMorph(u,"onchange"),p[13]=e.createMorphAt(e.childAt(t,[11,3]),1,1),p},
statements:[["attribute","value",["get","searchTerm",["loc",[null,[139,60],[139,70]]]]],["attribute","oninput",["subexpr","action",[["subexpr","mut",[["get","searchTerm",["loc",[null,[139,95],[139,105]]]]],[],["loc",[null,[139,90],[139,106]]]]],["value","target.value"],["loc",[null,[139,81],[139,129]]]]],["element","action",["searchLogs"],[],["loc",[null,[140,12],[140,35]]]],["attribute","disabled",["subexpr","eq",[["get","currentPage",["loc",[null,[144,52],[144,63]]]],1],[],["loc",[null,[144,47],[144,67]]]]],["element","action",["previousPage"],[],["loc",[null,[144,12],[144,37]]]],["attribute","max",["get","totalPages",["loc",[null,[147,56],[147,66]]]]],["attribute","value",["get","currentPage",["loc",[null,[147,77],[147,88]]]]],["attribute","oninput",["subexpr","action",[["subexpr","mut",[["get","currentPage",["loc",[null,[147,113],[147,124]]]]],[],["loc",[null,[147,108],[147,125]]]]],["value","target.value"],["loc",[null,[147,99],[147,148]]]]],["element","action",["goToPage",["get","currentPage",["loc",[null,[148,32],[148,43]]]]],[],["loc",[null,[148,12],[148,45]]]],["content","totalPages",["loc",[null,[150,14],[150,28]]]],["attribute","disabled",["subexpr","eq",[["get","currentPage",["loc",[null,[152,48],[152,59]]]],["get","totalPages",["loc",[null,[152,60],[152,70]]]]],[],["loc",[null,[152,43],[152,72]]]]],["element","action",["nextPage"],[],["loc",[null,[152,12],[152,33]]]],["attribute","onchange",["subexpr","action",["setPageSize"],["value","target.value"],["loc",[null,[157,36],[157,81]]]]],["block","each",[["get","currentLogs",["loc",[null,[176,16],[176,27]]]]],[],0,null,["loc",[null,[176,8],[185,17]]]]],locals:[],templates:[e]}}())}),define("eventlogmanager/templates/signup",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:13,column:0}},moduleName:"eventlogmanager/templates/signup.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("h2"),a=e.createTextNode("Signup");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createElement("form"),a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("div"),r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("label");e.setAttribute(r,"for","username");var o=e.createTextNode("Username");e.appendChild(r,o),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("input");e.setAttribute(r,"type","text"),e.setAttribute(r,"id","username"),e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("div"),r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("label");e.setAttribute(r,"for","password");var o=e.createTextNode("Password");e.appendChild(r,o),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("input");e.setAttribute(r,"type","password"),e.setAttribute(r,"id","password"),e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("button");e.setAttribute(a,"type","submit");var r=e.createTextNode("Signup");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[2]),r=e.childAt(a,[1,3]),o=e.childAt(a,[3,3]),l=new Array(3);return l[0]=e.createElementMorph(a),l[1]=e.createElementMorph(r),l[2]=e.createElementMorph(o),l},statements:[["element","action",["signup"],["on","submit"],["loc",[null,[2,6],[2,37]]]],["element","input",[],["value",["get","username",["loc",[null,[5,51],[5,59]]]]],["loc",[null,[5,37],[5,61]]]],["element","input",[],["value",["get","password",["loc",[null,[9,55],[9,63]]]]],["loc",[null,[9,41],[9,65]]]]],locals:[],templates:[]}}())}),define("eventlogmanager/config/environment",["ember"],function(e){try{var t="eventlogmanager/config/environment",n=e.default.$('meta[name="'+t+'"]').attr("content");return{default:JSON.parse(unescape(n))}}catch(e){throw new Error('Could not read config from meta tag with name "'+t+'".')}}),runningTests||require("eventlogmanager/app").default.create({name:"eventlogmanager",version:"0.0.0+368aadce"});