"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),TEN_MINUTES=6e5,FOUR_HOURS=144e5,OutTransferManager=function(){function e(t){_classCallCheck(this,e),this.maxSignatureNumber=t,this.pending=new Array,this.index=new Map,this.cacheIds=new Set,this.historyIds=new Set,this.lastClearCacheTime=Date.now(),this.lastClearHistoryTime=Date.now()}return _createClass(e,[{key:"addReady",value:function(e,t){this.cacheIds.add(e.id),this.cacheIds.add(t)}},{key:"addPending",value:function(e,t){e.signatures||(e.signatures=[]),this.pending.push(e),this.index.set(e.id,this.pending.length-1),this.cacheIds.add(e.id),this.cacheIds.add(t)}},{key:"addSignature",value:function(e,t){var a=this.index[e],i=this.pending[a];i&&i.signatures.length<this.maxSignatureNumber&&-1==i.signatures.indexOf(t)&&i.signatures.push(t)}},{key:"setReady",value:function(e){var t=this.index[e];this.pending[t]?(this.index.delete(e),this.pending[t]=null):this.cacheIds.add(e)}},{key:"getPending",value:function(){var e=this.pending.filter(function(e){return!!e});return this.pending=e,e}},{key:"has",value:function(e){return this.index.has(e)||this.cacheIds.has(e)||this.historyIds.has(e)}},{key:"clear",value:function(){var e=Date.now()-this.lastClearCacheTime,t=Date.now()-this.lastClearHistoryTime;if(e>TEN_MINUTES){t>FOUR_HOURS&&(this.historyIds.clear(),this.lastClearHistoryTime=Date.now());var a=!0,i=!1,n=void 0;try{for(var s,r=this.cacheIds[Symbol.iterator]();!(a=(s=r.next()).done);a=!0){var h=s.value;this.historyIds.add(h)}}catch(e){i=!0,n=e}finally{try{!a&&r.return&&r.return()}finally{if(i)throw n}}this.cacheIds.clear(),this.lastClearCacheTime=Date.now()}}}]),e}();module.exports=OutTransferManager;