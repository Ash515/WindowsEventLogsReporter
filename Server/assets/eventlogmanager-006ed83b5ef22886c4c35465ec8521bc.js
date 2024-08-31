"use strict";define("eventlogmanager/adapters/application",["exports","ember-data"],function(e,t){e.default=t.default.RESTAdapter.extend({host:"http://localhost:8080",namespace:"eventlogs"})}),define("eventlogmanager/app",["exports","ember","ember/resolver","ember/load-initializers","eventlogmanager/config/environment"],function(e,t,n,a,r){var l=void 0;t.default.MODEL_FACTORY_INJECTIONS=!0,l=t.default.Application.extend({modulePrefix:r.default.modulePrefix,podModulePrefix:r.default.podModulePrefix,Resolver:n.default}),(0,a.default)(l,r.default.modulePrefix),e.default=l}),define("eventlogmanager/components/app-title",["exports","ember"],function(e,t){e.default=t.default.Component.extend({})}),define("eventlogmanager/components/app-version",["exports","ember-cli-app-version/components/app-version","eventlogmanager/config/environment"],function(e,t,n){var a=n.default.APP.name,r=n.default.APP.version;e.default=t.default.extend({version:r,name:a})}),define("eventlogmanager/components/log-chart",["exports","ember"],function(e,t){e.default=t.default.Component.extend({didInsertElement:function(){this._super.apply(this,arguments),console.log("Labels:",this.get("labels")),console.log("Counts:",this.get("counts")),this.drawChart()},drawChart:function(){var e=this.element.querySelector("#myPieChart");if(!e)return void console.error('Canvas element with ID "myPieChart" not found');var t=e.getContext("2d"),n={labels:this.get("labels"),datasets:[{data:this.get("counts"),backgroundColor:["#FF6384","#36A2EB","#FFCE56"]}]};new Chart(t,{type:"pie",data:n})}})}),define("eventlogmanager/components/logout-button",["exports","ember"],function(e,t){e.default=t.default.Component.extend({})}),define("eventlogmanager/controllers/array",["exports","@ember/controller"],function(e,t){e.default=t.default}),define("eventlogmanager/controllers/index",["exports","ember"],function(e,t){e.default=t.default.Controller.extend({})}),define("eventlogmanager/controllers/login",["exports","ember"],function(e,t){e.default=t.default.Controller.extend({username:"",password:"",actions:{updateUsername:function(e){console.log("Username:",e.target.value),this.set("username",e.target.value)},updatePassword:function(e){console.log("Password:",e.target.value),this.set("password",e.target.value)}}})}),define("eventlogmanager/controllers/logs",["exports","ember"],function(e,t){e.default=t.default.Controller.extend({logs:t.default.A(),pageSize:10,totalRecords:0,searchTerm:"",scrollId:null,actions:{fetchLogs:function(){var e=this,n=this.get("pageSize"),a=this.get("searchTerm"),r=this.get("scrollId"),l={size:n,searchTerm:a,scrollId:r};t.default.$.ajax({url:"http://localhost:8080/eventlogs/fetchlogs",method:"GET",data:l,success:function(t){t.logs&&(r?e.get("logs").pushObjects(t.logs):e.set("logs",t.logs),e.set("totalRecords",t.totalRecords),e.set("scrollId",t.scrollId))},error:function(e){console.error("Failed to fetch logs:",e)}})},setPageSize:function(e){this.set("pageSize",parseInt(e,10)),this.set("scrollId",null),this.send("fetchLogs")},nextBatch:function(){this.get("scrollId")&&this.send("fetchLogs")},searchLogs:function(){this.set("scrollId",null),this.set("logs",t.default.A()),this.send("fetchLogs")}}})}),define("eventlogmanager/controllers/object",["exports","@ember/controller"],function(e,t){e.default=t.default}),define("eventlogmanager/helpers/eq",["exports","ember"],function(e,t){function n(e){var t=a(e,2);return t[0]===t[1]}var a=function(){function e(e,t){var n=[],a=!0,r=!1,l=void 0;try{for(var o,d=e[Symbol.iterator]();!(a=(o=d.next()).done)&&(n.push(o.value),!t||n.length!==t);a=!0);}catch(e){r=!0,l=e}finally{try{!a&&d.return&&d.return()}finally{if(r)throw l}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.eq=n,e.default=t.default.Helper.helper(n)}),define("eventlogmanager/helpers/gte",["exports","ember"],function(e,t){function n(e){var t=a(e,2);return t[0]>=t[1]}var a=function(){function e(e,t){var n=[],a=!0,r=!1,l=void 0;try{for(var o,d=e[Symbol.iterator]();!(a=(o=d.next()).done)&&(n.push(o.value),!t||n.length!==t);a=!0);}catch(e){r=!0,l=e}finally{try{!a&&d.return&&d.return()}finally{if(r)throw l}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.gte=n,e.default=t.default.Helper.helper(n)}),define("eventlogmanager/helpers/lte",["exports","ember"],function(e,t){function n(e){var t=a(e,2);return t[0]<=t[1]}var a=function(){function e(e,t){var n=[],a=!0,r=!1,l=void 0;try{for(var o,d=e[Symbol.iterator]();!(a=(o=d.next()).done)&&(n.push(o.value),!t||n.length!==t);a=!0);}catch(e){r=!0,l=e}finally{try{!a&&d.return&&d.return()}finally{if(r)throw l}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.lte=n,e.default=t.default.Helper.helper(n)}),define("eventlogmanager/helpers/range",["exports","ember"],function(e,t){function n(e){for(var t=a(e,2),n=t[0],r=t[1],l=[],o=n;o<=r;o++)l.push(o);return l}var a=function(){function e(e,t){var n=[],a=!0,r=!1,l=void 0;try{for(var o,d=e[Symbol.iterator]();!(a=(o=d.next()).done)&&(n.push(o.value),!t||n.length!==t);a=!0);}catch(e){r=!0,l=e}finally{try{!a&&d.return&&d.return()}finally{if(r)throw l}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.range=n,e.default=t.default.Helper.helper(n)}),define("eventlogmanager/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","eventlogmanager/config/environment"],function(e,t,n){e.default={name:"App Version",initialize:(0,t.default)(n.default.APP.name,n.default.APP.version)}}),define("eventlogmanager/initializers/export-application-global",["exports","ember","eventlogmanager/config/environment"],function(e,t,n){function a(){var e=arguments[1]||arguments[0];if(!1!==n.default.exportApplicationGlobal){var a;if("undefined"!=typeof window)a=window;else if("undefined"!=typeof global)a=global;else{if("undefined"==typeof self)return;a=self}var r,l=n.default.exportApplicationGlobal;r="string"==typeof l?l:t.default.String.classify(n.default.modulePrefix),a[r]||(a[r]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete a[r]}}))}}e.initialize=a,e.default={name:"export-application-global",initialize:a}}),define("eventlogmanager/models/log",["exports","ember-data"],function(e,t){e.default=t.default.Model.extend({logtype:t.default.attr("string"),message:t.default.attr("string"),sourceName:t.default.attr("string"),leveltype:t.default.attr("string"),eventcode:t.default.attr("number"),timeGenerated:t.default.attr("date"),timestamp:t.default.attr("date")})}),define("eventlogmanager/router",["exports","ember","eventlogmanager/config/environment"],function(e,t,n){var a=t.default.Router.extend({location:n.default.locationType});a.map(function(){this.route("index",{path:"/home"}),this.route("login"),this.route("logs"),this.route("signup")}),e.default=a}),define("eventlogmanager/routes/application",["exports","ember"],function(e,t){e.default=t.default.Route.extend({authentication:t.default.inject.service(),beforeModel:function(e){this.get("authentication").restoreSession(),this.get("authentication.isAuthenticated")||this.transitionTo("login")},actions:{logout:function(){var e=this;t.default.$.ajax({url:"http://localhost:8080/eventlogs/logout",type:"POST",success:function(){e.get("authentication").set("isAuthenticated",!1),e.get("authentication").logout(),e.transitionTo("login"),console.log("logged out")},error:function(e,t,n){console.error("Logout failed: ",t,n)}})}}})}),define("eventlogmanager/routes/index",["exports","ember"],function(e,t){e.default=t.default.Route.extend({model:function(){return t.default.$.ajax({url:"http://localhost:8080/eventlogs/logtypecounts",dataType:"text"}).then(function(e){try{var t=e.trim();t.endsWith(",")&&(t=t.slice(0,-1));var n=JSON.parse(t);return console.log("Parsed data:",n),{labels:Object.keys(n),counts:Object.values(n)}}catch(e){return console.error("Error parsing JSON:",e),{labels:[],counts:[]}}}).fail(function(e,t,n){return console.error("Error fetching log type counts:",t,n),{labels:[],counts:[]}})}})}),define("eventlogmanager/routes/login",["exports","ember"],function(e,t){e.default=t.default.Route.extend({authentication:t.default.inject.service(),actions:{login:function(){var e=this,t=this.get("controller.username"),n=this.get("controller.password");console.log("Login attempt with:",t,n),this.get("authentication").authenticate(t,n).then(function(t){t?e.transitionTo("index"):(alert("Login failed. Please check your credentials."),e.transitionTo("login"))}).catch(function(e){alert("An error occurred during login. Please try again."),console.error("Login error:",e)})}}})}),define("eventlogmanager/routes/logs",["exports","ember"],function(e,t){e.default=t.default.Route.extend({setupController:function(e){this._super.apply(this,arguments),e.send("fetchLogs")},actions:{fetchLogs:function(){this.controller.send("fetchLogs")}}})}),define("eventlogmanager/services/authentication",["exports","ember"],function(e,t){e.default=t.default.Service.extend({isAuthenticated:!1,websocket:null,init:function(){this._super.apply(this,arguments),this.restoreSession(),this.get("isAuthenticated")&&this.connectWebSocket()},authenticate:function(e,n){var a=this;return new t.default.RSVP.Promise(function(r,l){t.default.$.ajax({url:"http://localhost:8080/eventlogs/j_security_check",type:"POST",data:{j_username:e,j_password:n},success:function(e,t,n){200!==n.status||e.includes("Login failed...")?(a.set("isAuthenticated",!1),r(!1)):(a.set("isAuthenticated",!0),localStorage.setItem("isAuthenticated","true"),a.connectWebSocket(),r(!0))},error:function(){a.set("isAuthenticated",!1),r(!1)}})})},restoreSession:function(){"true"===localStorage.getItem("isAuthenticated")&&this.set("isAuthenticated",!0)},connectWebSocket:function(){var e=this;if(this.get("websocket"))return void console.log("WebSocket already connected.");this.set("websocket",new WebSocket("ws://localhost:8080/eventlogs/logsocket")),this.get("websocket").onopen=function(){console.log("WebSocket connection opened.")},this.get("websocket").onmessage=function(e){console.log("Message from server ",e.data)},this.get("websocket").onclose=function(){console.log("WebSocket connection closed."),e.set("websocket",null)},this.get("websocket").onerror=function(e){console.error("WebSocket error: ",e)}},logout:function(){var e=this;return new t.default.RSVP.Promise(function(n,a){t.default.$.ajax({url:"http://localhost:8080/eventlogs/logout",type:"POST",success:function(){e.set("isAuthenticated",!1),localStorage.removeItem("isAuthenticated"),e.get("websocket")&&(e.get("websocket").close(),e.set("websocket",null),console.log("websocket closed")),n()},error:function(e,t,n){console.error("Logout failed: ",t,n),a()}})})}})}),define("eventlogmanager/services/websocket",["exports","ember"],function(e,t){e.default=t.default.Service.extend({socket:null,init:function(){this._super.apply(this,arguments)},closeWebSocket:function(){var e=this.get("socket");e&&e.close()}})}),define("eventlogmanager/templates/application",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:6,column:12}},moduleName:"eventlogmanager/templates/application.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n\n\n\n  \n  ");e.appendChild(t,n);var n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(2);return a[0]=e.createMorphAt(t,0,0,n),a[1]=e.createMorphAt(t,2,2,n),e.insertBoundary(t,0),e.insertBoundary(t,null),a},statements:[["content","app-title",["loc",[null,[1,0],[1,13]]]],["content","outlet",["loc",[null,[6,2],[6,12]]]]],locals:[],templates:[]}}())}),define("eventlogmanager/templates/components/app-title",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:7,column:0}},moduleName:"eventlogmanager/templates/components/app-title.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("div");e.setAttribute(n,"class","title-bar");var a=e.createTextNode("\n");e.appendChild(n,a);var a=e.createElement("h2");e.setAttribute(a,"id","app-title-id");var r=e.createTextNode("Windows Event Logs360");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),a},statements:[["content","yield",["loc",[null,[1,0],[1,9]]]]],locals:[],templates:[]}}())}),define("eventlogmanager/templates/components/log-chart",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:5,column:0}},moduleName:"eventlogmanager/templates/components/log-chart.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createElement("div");e.setAttribute(n,"class","chart-wrapper");var a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("canvas");e.setAttribute(a,"id","myPieChart"),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),a},statements:[["content","yield",["loc",[null,[1,0],[1,9]]]]],locals:[],templates:[]}}())}),define("eventlogmanager/templates/components/logout-button",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:2,column:0}},moduleName:"eventlogmanager/templates/components/logout-button.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),a},statements:[["content","yield",["loc",[null,[1,0],[1,9]]]]],locals:[],templates:[]}}())}),define("eventlogmanager/templates/index",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){var e=function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:3,column:25},end:{line:3,column:49}},moduleName:"eventlogmanager/templates/index.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("Home");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}(),t=function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:4,column:25},end:{line:4,column:51}},moduleName:"eventlogmanager/templates/index.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("LogBase");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:19,column:10}},moduleName:"eventlogmanager/templates/index.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("nav"),a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("ul");e.setAttribute(a,"class","nav-list");var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("li");e.setAttribute(r,"class","nav-item");var l=e.createComment("");e.appendChild(r,l),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("li");e.setAttribute(r,"class","nav-item");var l=e.createComment("");e.appendChild(r,l),e.appendChild(a,r);var r=e.createTextNode("\n    \n    ");e.appendChild(a,r);var r=e.createElement("button");e.setAttribute(r,"id","logout-button");var l=e.createTextNode("Logout");e.appendChild(r,l),e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n\n\n\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n\n");e.appendChild(t,n);var n=e.createElement("h3");e.setAttribute(n,"id","chart-title");var a=e.createTextNode("Log Type Counts");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n\n");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createComment("");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[0,1]),r=e.childAt(a,[5]),l=new Array(5);return l[0]=e.createMorphAt(e.childAt(a,[1]),0,0),l[1]=e.createMorphAt(e.childAt(a,[3]),0,0),l[2]=e.createElementMorph(r),l[3]=e.createMorphAt(t,4,4,n),l[4]=e.createMorphAt(t,6,6,n),e.insertBoundary(t,null),l},statements:[["block","link-to",["index"],[],0,null,["loc",[null,[3,25],[3,61]]]],["block","link-to",["logs"],[],1,null,["loc",[null,[4,25],[4,63]]]],["element","action",["logout"],[],["loc",[null,[6,31],[6,50]]]],["inline","log-chart",[],["labels",["subexpr","@mut",[["get","model.labels",["loc",[null,[17,19],[17,31]]]]],[],[]],"counts",["subexpr","@mut",[["get","model.counts",["loc",[null,[17,39],[17,51]]]]],[],[]]],["loc",[null,[17,0],[17,53]]]],["content","outlet",["loc",[null,[19,0],[19,10]]]]],locals:[],templates:[e,t]}}())}),define("eventlogmanager/templates/login",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:13,column:0}},moduleName:"eventlogmanager/templates/login.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("div");e.setAttribute(n,"class","login-container");var a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("h2"),r=e.createTextNode("Login");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("form");e.setAttribute(a,"class","login-form");var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("label");e.setAttribute(r,"for","username");var l=e.createTextNode("Username:");e.appendChild(r,l),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("input");e.setAttribute(r,"type","text"),e.setAttribute(r,"id","username"),e.setAttribute(r,"class","input-field"),e.appendChild(a,r);var r=e.createTextNode("\n    \n    ");e.appendChild(a,r);var r=e.createElement("label");e.setAttribute(r,"for","password");var l=e.createTextNode("Password:");e.appendChild(r,l),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("input");e.setAttribute(r,"type","password"),e.setAttribute(r,"id","password"),e.setAttribute(r,"class","input-field"),e.appendChild(a,r);var r=e.createTextNode("\n    \n    ");e.appendChild(a,r);var r=e.createElement("button");e.setAttribute(r,"type","submit"),e.setAttribute(r,"class","submit-button");var l=e.createTextNode("Login");e.appendChild(r,l),e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[0,3]),r=e.childAt(a,[3]),l=e.childAt(a,[7]),o=new Array(5);return o[0]=e.createElementMorph(a),o[1]=e.createAttrMorph(r,"value"),o[2]=e.createAttrMorph(r,"oninput"),o[3]=e.createAttrMorph(l,"value"),o[4]=e.createAttrMorph(l,"oninput"),o},statements:[["element","action",["login"],["on","submit"],["loc",[null,[3,8],[3,38]]]],["attribute","value",["get","username",["loc",[null,[5,45],[5,53]]]]],["attribute","oninput",["subexpr","action",[["subexpr","mut",[["get","username",["loc",[null,[5,78],[5,86]]]]],[],["loc",[null,[5,73],[5,87]]]]],["value","target.value"],["loc",[null,[5,64],[5,110]]]]],["attribute","value",["get","password",["loc",[null,[8,49],[8,57]]]]],["attribute","oninput",["subexpr","action",[["subexpr","mut",[["get","password",["loc",[null,[8,82],[8,90]]]]],[],["loc",[null,[8,77],[8,91]]]]],["value","target.value"],["loc",[null,[8,68],[8,114]]]]]],locals:[],templates:[]}}())}),define("eventlogmanager/templates/logs",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){var e=function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:145,column:25},end:{line:145,column:49}},moduleName:"eventlogmanager/templates/logs.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("Home");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}(),t=function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:146,column:25},end:{line:146,column:51}},moduleName:"eventlogmanager/templates/logs.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("LogBase");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}(),n=function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:191,column:8},end:{line:200,column:8}},moduleName:"eventlogmanager/templates/logs.hbs"},arity:1,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("            ");e.appendChild(t,n);var n=e.createElement("tr"),a=e.createTextNode("\n                ");e.appendChild(n,a);var a=e.createElement("td"),r=e.createComment("");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n                ");e.appendChild(n,a);var a=e.createElement("td"),r=e.createComment("");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n                ");e.appendChild(n,a);var a=e.createElement("td"),r=e.createComment("");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n                ");e.appendChild(n,a);var a=e.createElement("td"),r=e.createComment("");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n                ");e.appendChild(n,a);var a=e.createElement("td"),r=e.createComment("");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n                ");e.appendChild(n,a);var a=e.createElement("td"),r=e.createComment("");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n            ");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[1]),r=new Array(6);return r[0]=e.createMorphAt(e.childAt(a,[1]),0,0),r[1]=e.createMorphAt(e.childAt(a,[3]),0,0),r[2]=e.createMorphAt(e.childAt(a,[5]),0,0),r[3]=e.createMorphAt(e.childAt(a,[7]),0,0),r[4]=e.createMorphAt(e.childAt(a,[9]),0,0),r[5]=e.createMorphAt(e.childAt(a,[11]),0,0),r},statements:[["content","log.Type",["loc",[null,[193,20],[193,32]]]],["content","log.EventCode",["loc",[null,[194,20],[194,37]]]],["content","log.Logfile",["loc",[null,[195,20],[195,35]]]],["content","log.SourceName",["loc",[null,[196,20],[196,38]]]],["content","log.TimeGenerated",["loc",[null,[197,20],[197,41]]]],["content","log.Message",["loc",[null,[198,20],[198,35]]]]],locals:["log"],templates:[]}}();return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:203,column:0}},moduleName:"eventlogmanager/templates/logs.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("nav"),a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("ul");e.setAttribute(a,"class","nav-list");var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("li");e.setAttribute(r,"class","nav-item");var l=e.createComment("");e.appendChild(r,l),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("li");e.setAttribute(r,"class","nav-item");var l=e.createComment("");e.appendChild(r,l),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("button");e.setAttribute(r,"id","logout-button");var l=e.createTextNode("Logout");e.appendChild(r,l),e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("h2"),a=e.createTextNode("LogBase");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("div");e.setAttribute(n,"class","controls-container");var a=e.createTextNode("\n    ");e.appendChild(n,a);var a=e.createElement("div");e.setAttribute(a,"class","search-container");var r=e.createTextNode("\n        ");e.appendChild(a,r);var r=e.createElement("input");e.setAttribute(r,"type","text"),e.setAttribute(r,"placeholder","Search logs..."),e.appendChild(a,r);var r=e.createTextNode("\n        ");e.appendChild(a,r);var r=e.createElement("button"),l=e.createTextNode("Search");e.appendChild(r,l),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n\n    ");e.appendChild(n,a);var a=e.createElement("div");e.setAttribute(a,"class","pagination-controls");var r=e.createTextNode("\n        ");e.appendChild(a,r);var r=e.createElement("button"),l=e.createTextNode("Previous");e.appendChild(r,l),e.appendChild(a,r);var r=e.createTextNode("\n        ");e.appendChild(a,r);var r=e.createComment(" You can remove the Go to Page input if using scrolling-based pagination ");e.appendChild(a,r);var r=e.createTextNode("\n        ");e.appendChild(a,r);var r=e.createComment(' <label for="page-select">Go to Page:</label>\n        <input type="number" id="page-select" min="1" max={{totalPages}} value={{currentPage}} oninput={{action (mut currentPage) value="target.value"}} />\n        <button {{action \'goToPage\' currentPage}}>Go</button> ');e.appendChild(a,r);var r=e.createTextNode("\n        ");e.appendChild(a,r);var r=e.createElement("span"),l=e.createTextNode(" of ");e.appendChild(r,l);var l=e.createComment("");e.appendChild(r,l),e.appendChild(a,r);var r=e.createTextNode("\n        ");e.appendChild(a,r);var r=e.createElement("button"),l=e.createTextNode("Next");e.appendChild(r,l),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n\n    ");e.appendChild(n,a);var a=e.createElement("div");e.setAttribute(a,"class","page-size-controls");var r=e.createTextNode("\n        ");e.appendChild(a,r);var r=e.createElement("label");e.setAttribute(r,"for","page-size");var l=e.createTextNode("Records per page:");e.appendChild(r,l),e.appendChild(a,r);var r=e.createTextNode("\n        ");e.appendChild(a,r);var r=e.createElement("select");e.setAttribute(r,"id","page-size");var l=e.createTextNode("\n            ");e.appendChild(r,l);var l=e.createElement("option");e.setAttribute(l,"value","10");var o=e.createTextNode("10");e.appendChild(l,o),e.appendChild(r,l);var l=e.createTextNode("\n            ");e.appendChild(r,l);var l=e.createElement("option");e.setAttribute(l,"value","25");var o=e.createTextNode("25");e.appendChild(l,o),e.appendChild(r,l);var l=e.createTextNode("\n            ");e.appendChild(r,l);var l=e.createElement("option");e.setAttribute(l,"value","50");var o=e.createTextNode("50");e.appendChild(l,o),e.appendChild(r,l);var l=e.createTextNode("\n        ");e.appendChild(r,l),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("table"),a=e.createTextNode("\n    ");e.appendChild(n,a);var a=e.createElement("thead"),r=e.createTextNode("\n        ");e.appendChild(a,r);var r=e.createElement("tr"),l=e.createTextNode("\n            ");e.appendChild(r,l);var l=e.createElement("th"),o=e.createTextNode("Log Type");e.appendChild(l,o),e.appendChild(r,l);var l=e.createTextNode("\n            ");e.appendChild(r,l);var l=e.createElement("th"),o=e.createTextNode("Event Code");e.appendChild(l,o),e.appendChild(r,l);var l=e.createTextNode("\n            ");e.appendChild(r,l);var l=e.createElement("th"),o=e.createTextNode("Level");e.appendChild(l,o),e.appendChild(r,l);var l=e.createTextNode("\n            ");e.appendChild(r,l);var l=e.createElement("th"),o=e.createTextNode("Source");e.appendChild(l,o),e.appendChild(r,l);var l=e.createTextNode("\n            ");e.appendChild(r,l);var l=e.createElement("th"),o=e.createTextNode("Time Created");e.appendChild(l,o),e.appendChild(r,l);var l=e.createTextNode("\n            ");e.appendChild(r,l);var l=e.createElement("th"),o=e.createTextNode("Message");e.appendChild(l,o),e.appendChild(r,l);var l=e.createTextNode("\n        ");e.appendChild(r,l),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n    ");e.appendChild(n,a);var a=e.createElement("tbody"),r=e.createTextNode("\n");e.appendChild(a,r);var r=e.createComment("");e.appendChild(a,r);var r=e.createTextNode("    ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[2,1]),r=e.childAt(a,[5]),l=e.childAt(t,[6]),o=e.childAt(l,[1]),d=e.childAt(o,[1]),i=e.childAt(o,[3]),c=e.childAt(l,[3]),u=e.childAt(c,[1]),p=e.childAt(c,[9]),s=e.childAt(l,[5,3]),m=new Array(13);return m[0]=e.createMorphAt(e.childAt(a,[1]),0,0),m[1]=e.createMorphAt(e.childAt(a,[3]),0,0),m[2]=e.createElementMorph(r),m[3]=e.createAttrMorph(d,"value"),m[4]=e.createAttrMorph(d,"oninput"),m[5]=e.createElementMorph(i),m[6]=e.createAttrMorph(u,"disabled"),m[7]=e.createElementMorph(u),m[8]=e.createMorphAt(e.childAt(c,[7]),1,1),m[9]=e.createAttrMorph(p,"disabled"),m[10]=e.createElementMorph(p),m[11]=e.createAttrMorph(s,"onchange"),m[12]=e.createMorphAt(e.childAt(t,[8,3]),1,1),m},
statements:[["block","link-to",["index"],[],0,null,["loc",[null,[145,25],[145,61]]]],["block","link-to",["logs"],[],1,null,["loc",[null,[146,25],[146,63]]]],["element","action",["logout"],[],["loc",[null,[147,31],[147,50]]]],["attribute","value",["get","searchTerm",["loc",[null,[155,64],[155,74]]]]],["attribute","oninput",["subexpr","action",[["subexpr","mut",[["get","searchTerm",["loc",[null,[155,99],[155,109]]]]],[],["loc",[null,[155,94],[155,110]]]]],["value","target.value"],["loc",[null,[155,85],[155,133]]]]],["element","action",["searchLogs"],[],["loc",[null,[156,16],[156,39]]]],["attribute","disabled",["subexpr","eq",[["get","currentPage",["loc",[null,[160,56],[160,67]]]],1],[],["loc",[null,[160,51],[160,71]]]]],["element","action",["previousPage"],[],["loc",[null,[160,16],[160,41]]]],["content","totalPages",["loc",[null,[165,18],[165,32]]]],["attribute","disabled",["subexpr","eq",[["get","currentPage",["loc",[null,[166,52],[166,63]]]],["get","totalPages",["loc",[null,[166,64],[166,74]]]]],[],["loc",[null,[166,47],[166,76]]]]],["element","action",["nextPage"],[],["loc",[null,[166,16],[166,37]]]],["attribute","onchange",["subexpr","action",["setPageSize"],["value","target.value"],["loc",[null,[171,40],[171,85]]]]],["block","each",[["get","logs",["loc",[null,[191,16],[191,20]]]]],[],2,null,["loc",[null,[191,8],[200,17]]]]],locals:[],templates:[e,t,n]}}())}),define("eventlogmanager/templates/signup",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.11",loc:{source:null,start:{line:1,column:0},end:{line:13,column:0}},moduleName:"eventlogmanager/templates/signup.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("h2"),a=e.createTextNode("Signup");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createElement("form"),a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("div"),r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("label");e.setAttribute(r,"for","username");var l=e.createTextNode("Username");e.appendChild(r,l),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("input");e.setAttribute(r,"type","text"),e.setAttribute(r,"id","username"),e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("div"),r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("label");e.setAttribute(r,"for","password");var l=e.createTextNode("Password");e.appendChild(r,l),e.appendChild(a,r);var r=e.createTextNode("\n    ");e.appendChild(a,r);var r=e.createElement("input");e.setAttribute(r,"type","password"),e.setAttribute(r,"id","password"),e.appendChild(a,r);var r=e.createTextNode("\n  ");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("button");e.setAttribute(a,"type","submit");var r=e.createTextNode("Signup");e.appendChild(a,r),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[2]),r=e.childAt(a,[1,3]),l=e.childAt(a,[3,3]),o=new Array(3);return o[0]=e.createElementMorph(a),o[1]=e.createElementMorph(r),o[2]=e.createElementMorph(l),o},statements:[["element","action",["signup"],["on","submit"],["loc",[null,[2,6],[2,37]]]],["element","input",[],["value",["get","username",["loc",[null,[5,51],[5,59]]]]],["loc",[null,[5,37],[5,61]]]],["element","input",[],["value",["get","password",["loc",[null,[9,55],[9,63]]]]],["loc",[null,[9,41],[9,65]]]]],locals:[],templates:[]}}())}),define("eventlogmanager/config/environment",["ember"],function(e){try{var t="eventlogmanager/config/environment",n=e.default.$('meta[name="'+t+'"]').attr("content");return{default:JSON.parse(unescape(n))}}catch(e){throw new Error('Could not read config from meta tag with name "'+t+'".')}}),runningTests||require("eventlogmanager/app").default.create({name:"eventlogmanager",version:"0.0.0+368aadce"});