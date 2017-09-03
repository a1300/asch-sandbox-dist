"use strict";function _asyncToGenerator(e){return function(){var r=e.apply(this,arguments);return new Promise(function(e,n){function t(a,u){try{var o=r[a](u),c=o.value}catch(e){return void n(e)}if(!o.done)return Promise.resolve(c).then(function(e){t("next",e)},function(e){t("throw",e)});e(c)}return t("next")})}}app.route.get("/contracts",function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function e(r){var n,t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=[];for(t in app.contractTypeMapping)n.push({type:t,name:app.contractTypeMapping[t]});return e.abrupt("return",{contracts:n});case 3:case"end":return e.stop()}},e,void 0)}));return function(r){return e.apply(this,arguments)}}()),app.route.get("/transfers",function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function e(r){var n,t,a,u,o,c,s,i,p,f,m,l,d;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=r.query.ownerId,t=r.query.currency,a=null,u=null,o=Number(r.query.limit)||10,c=Number(r.query.offset)||0,n&&t?(a=[{senderId:n},{currency:t}],u=[{recipientId:n},{currency:t}]):n?(a={senderId:n},u={recipientId:n}):a=u=t?{currency:t}:null,null!==a&&a!==u){e.next=17;break}return e.next=10,app.model.Transfer.count(a);case 10:return s=e.sent,e.next=13,app.model.Transfer.findAll({condition:a,limit:o,offset:c,sort:{timestamp:-1}});case 13:return i=e.sent,e.abrupt("return",{count:s,transfers:i});case 17:return e.next=19,app.model.Transfer.count(a);case 19:return p=e.sent,e.next=22,app.model.Transfer.count(u);case 22:return f=e.sent,e.next=25,app.model.Transfer.findAll({condition:a,limit:o,offset:c,sort:{timestamp:-1}});case 25:return m=e.sent,e.next=28,app.model.Transfer.findAll({condition:u,limit:o,offset:c,sort:{timestamp:-1}});case 28:return l=e.sent,d=m.concat(l).sort(function(e,r){return r.t_timestamp-e.t_timestamp}),e.abrupt("return",{count:p+f,transfers:d});case 31:case"end":return e.stop()}},e,void 0)}));return function(r){return e.apply(this,arguments)}}());