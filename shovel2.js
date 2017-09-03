"use strict";function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _asyncToGenerator(e){return function(){var r=e.apply(this,arguments);return new Promise(function(e,n){function t(a,o){try{var s=r[a](o),i=s.value}catch(e){return void n(e)}if(!s.done)return Promise.resolve(i).then(function(e){t("next",e)},function(e){t("throw",e)});e(i)}return t("next")})}}function runDapp(e){var r=new NodeVM({console:"inherit",sandbox:{},require:{external:!0,context:"sandbox",builtin:["assert","crypto","events","os","path","punycode","querystring","string_decoder","url","util","zlib","async","bignumber","bytebuffer","change-case","sodium","extend","ip","z-schema","protocol-buffers","asch-js"],root:[rootDir,dappRootDir]}}).run(fs.readFileSync(entryFile),entryFile);process.on("SIGTERM",function(){}),process.on("SIGINT",function(){}),process.on("message",function(e){r.processParentMessage(e)}),r.on("message",function(e){process.send(e)}),r.on("exit",function(r){var n=this;_asyncToGenerator(regeneratorRuntime.mark(function r(){return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.db.close();case 3:r.next=8;break;case 5:r.prev=5,r.t0=r.catch(0),console.log("Failed to close db:",r.t0);case 8:case"end":return r.stop()}},r,n,[[0,5]])}))(),process.exit(r)}),r.run(e),process.send("__sandbox_inner_ready__")}function run2(e){var r=require(entryFile);process.on("SIGTERM",function(){}),process.on("SIGINT",function(){}),process.on("message",function(e){r.processParentMessage(e)}),r.on("message",function(e){process.send(e)}),r.on("exit",function(r){var n=this;_asyncToGenerator(regeneratorRuntime.mark(function r(){return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.db.close();case 3:r.next=8;break;case 5:r.prev=5,r.t0=r.catch(0),console.log("Failed to close db:",r.t0);case 8:case"end":return r.stop()}},r,n,[[0,5]])}))(),process.exit(r)}),r.run(e),process.send("__sandbox_inner_ready__")}var _createClass=function(){function e(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(r,n,t){return n&&e(r.prototype,n),t&&e(r,t),r}}(),loadModels=function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function e(r){var n,t,a,o,s,i,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,helpers.PIFY(fs.readdir)(r);case 2:n=e.sent,e.t0=regeneratorRuntime.keys(n);case 4:if((e.t1=e.t0()).done){e.next=17;break}return t=e.t1.value,a=n[t],console.log("loading model",a),o=path.basename(a,".js"),s=changeCase.pascalCase(o),i=path.join(r,a),c=require(i),app.model[s]=app.db.define(changeCase.snakeCase(o),c,{timestamps:!1}),e.next=15,app.model[s].sync();case 15:e.next=4;break;case 17:case"end":return e.stop()}},e,this)}));return function(r){return e.apply(this,arguments)}}(),loadContracts=function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function e(r){var n,t,a,o,s,i,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,helpers.PIFY(fs.readdir)(r);case 2:n=e.sent;for(t in n)a=n[t],console.log("loading contract",a),o=path.basename(a,".js"),s=changeCase.snakeCase(o),i=path.join(r,a),c=require(i),"index.js"!==a&&(app.contract[s]=c);case 4:case"end":return e.stop()}},e,this)}));return function(r){return e.apply(this,arguments)}}(),loadInterfaces=function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function e(r){var n,t,a,o,s,i,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,helpers.PIFY(fs.readdir)(r);case 2:for(n=e.sent,t=!0,a=!1,o=void 0,e.prev=6,s=n[Symbol.iterator]();!(t=(i=s.next()).done);t=!0)c=i.value,console.log("loading interface",c),require(path.join(r,c));e.next=14;break;case 10:e.prev=10,e.t0=e.catch(6),a=!0,o=e.t0;case 14:e.prev=14,e.prev=15,!t&&s.return&&s.return();case 17:if(e.prev=17,!a){e.next=20;break}throw o;case 20:return e.finish(17);case 21:return e.finish(14);case 22:case"end":return e.stop()}},e,this,[[6,10,14,22],[15,,17,21]])}));return function(r){return e.apply(this,arguments)}}(),main=function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return global.app={db:null,sdb:null,balances:null,model:{},contract:{},rootDir:dappRootDir,config:require(path.join(dappRootDir,"config.json")),contractTypeMapping:{},feeMapping:{},defaultFee:{currency:"XAS",min:"10000000"},feePool:null,hooks:{},custom:{}},app.validators={amount:function(e){return amountHelper.validate(e)}},app.validate=function(e,r){if(!app.validators[e])throw new Error("Validator not found: "+e);var n=app.validators[e](r);if(n)throw new Error(n)},app.registerContract=function(e,r){if(e<1e3)throw new Error("Contract types that small than 1000 are reserved");app.contractTypeMapping[e]=r},app.getContractName=function(e){return app.contractTypeMapping[e]},app.registerFee=function(e,r,n){app.feeMapping[e]={currency:n||app.defaultFee.currency,min:r}},app.getFee=function(e){return app.feeMapping[e]},app.setDefaultFee=function(e,r){app.defaultFee.currency=r,app.defaultFee.min=e},app.getRealTime=function(e){return slots.getRealTime(e)},app.db=new ORM("","","",{dialect:"sqlite",storage:path.join(dappRootDir,"blockchain.db"),logging:!1}),app.registerHook=function(e,r){app.hooks[e]=r},app.sdb=new SmartDB(app),app.balances=new BalanceManager(app.sdb),app.autoID=new AutoIncrement(app.sdb),app.feePool=new FeePool(app.sdb),app.route=new Route,app.events=new EventEmitter,e.next=19,loadModels(path.join(rootDir,"model"));case 19:return e.next=21,loadModels(path.join(dappRootDir,"model"));case 21:return e.next=23,loadContracts(path.join(rootDir,"contract"));case 23:return e.next=25,loadContracts(path.join(dappRootDir,"contract"));case 25:return e.next=27,loadInterfaces(path.join(rootDir,"interface"));case 27:return e.next=29,loadInterfaces(path.join(dappRootDir,"interface"));case 29:return e.next=31,app.sdb.load("Balance",app.model.Balance.fields(),[["address","currency"]]);case 31:return e.next=33,app.sdb.load("Variable",["key","value"],["key"]);case 33:return e.next=35,app.sdb.load("RoundFee",app.model.RoundFee.fields(),[["round","currency"]]);case 35:app.contractTypeMapping[1]="core.deposit",app.contractTypeMapping[2]="core.withdrawal",app.contractTypeMapping[3]="core.transfer",app.contractTypeMapping[4]="core.setNickname",run2(global.app);case 40:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),fs=require("fs"),path=require("path"),EventEmitter=require("events").EventEmitter,NodeVM=require("./vm2").NodeVM,changeCase=require("change-case"),helpers=require("./framework/helpers"),slots=require("./framework/helpers/slots"),amountHelper=require("./framework/helpers/amount"),ORM=require("./framework/helpers/orm"),SmartDB=require("./framework/helpers/smartdb"),BalanceManager=require("./framework/helpers/balance-manager"),AutoIncrement=require("./framework/helpers/auto-increment"),FeePool=require("./framework/helpers/fee-pool"),rootDir=path.join(__dirname,"framework"),entryFile=path.join(rootDir,"index.js"),dappRootDir=process.argv[2],secrets=process.argv.slice(3);"/"!==dappRootDir[0]&&(dappRootDir=path.join(process.cwd(),dappRootDir)),console.log("dappRootDir",dappRootDir);var Route=function(){function e(){_classCallCheck(this,e),this.routes=[]}return _createClass(e,[{key:"get",value:function(e,r){this.routes.push({path:e,method:"get",handler:r})}},{key:"put",value:function(e,r){this.routes.push({path:e,method:"put",handler:r})}},{key:"post",value:function(e,r){this.routes.push({path:e,method:"post",handler:r})}},{key:"getRoutes",value:function(){return this.routes}}]),e}();_asyncToGenerator(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:try{main()}catch(e){console.log("Failed to initialize app sandbox"),process.exit(1)}case 1:case"end":return e.stop()}},e,this)}))();