"use strict";
var _setImmediate2 = require("babel-runtime/core-js/set-immediate"),
  _setImmediate3 = _interopRequireDefault(_setImmediate2),
  _regenerator = require("babel-runtime/regenerator"),
  _regenerator2 = _interopRequireDefault(_regenerator),
  _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator"),
  _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}
var bignum = require("bignumber"),
  async = require("async"),
  ip = require("ip"),
  private_ = {},
  self = null,
  library = null,
  modules = null;

function Sync(e, t) {
  self = this, library = t, app.logger.info("-----in sync"), e(null, self)
}
private_.createSandbox = function (r, o) {
  modules.blockchain.accounts.clone(function (e, t) {
    var n = {
      lastBlock: r,
      accounts: t.data,
      accountsIndexById: t.index,
      unconfirmedTransactions: [],
      unconfirmedTransactionsIdIndex: {},
      doubleSpendingTransactions: {}
    };
    o(null, n)
  })
}, private_.findUpdate = function (i, c, s) {
  var l = this;
  (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function e() {
    var t, n, r, o, a;
    return _regenerator2.default.wrap(function (e) {
      for (;;) switch (e.prev = e.next) {
        case 0:
          return e.prev = 0, e.next = 3, modules.blockchain.blocks.getCommonBlock(i.height, c);
        case 3:
          if (t = e.sent, app.logger.info("Get common block", t.height, t.id), t.height === i.height) {
            e.next = 8;
            break
          }
          return app.logger.warn("Reject common=" + t.height + ", last=" + i.height), e.abrupt("return", s("Reject fork chain"));
        case 8:
          app.sdb.rollbackBlock();
        case 9:
          return e.next = 12, PIFY(modules.blockchain.blocks.loadBlocksPeer)(i.height, c);
        case 12:
          return n = e.sent, app.logger.info("Loading " + n.length + " blocks"), e.next = 16, app.db.transaction();
        case 16:
          r = e.sent, e.prev = 17, e.t0 = _regenerator2.default.keys(n);
        case 19:
          if ((e.t1 = e.t0()).done) {
            e.next = 27;
            break
          }
          if (o = e.t1.value, !((a = n[o]).height > i.height)) {
            e.next = 25;
            break
          }
          return e.next = 25, modules.blockchain.blocks.processBlock(a, {
            noTransaction: !0
          });
        case 25:
          e.next = 19;
          break;
        case 27:
          return e.next = 29, r.commit();
        case 29:
          e.next = 36;
          break;
        case 31:
          return e.prev = 31, e.t2 = e.catch(17), e.next = 35, r.rollback();
        case 35:
          throw e.t2;
        case 36:
          if (!(n.length < 10)) {
            e.next = 38;
            break
          }
          return e.abrupt("break", 41);
        case 38:
          i = modules.blockchain.blocks.getLastBlock(), e.next = 9;
          break;
        case 41:
          return app.logger.info("Sync blocks completed"), e.abrupt("return", s());
        case 45:
          return e.prev = 45, e.t3 = e.catch(0), app.logger.error("failed to sync blocks", e.t3), e.abrupt("return", s("Failed to sync blocks: " + e.t3));
        case 49:
        case "end":
          return e.stop()
      }
    }, e, l, [
      [0, 45],
      [17, 31]
    ])
  }))()
}, private_.transactionsSync = function (r) {
  if (modules.logic.consensus.pendingBlock) return r("block is pending");
  modules.api.transport.getRandomPeer("get", "/transactions/unconfirmed", {
    limit: 100
  }, function (e, t) {
    if (e || !t.body || !t.body.success) return r(e || t.body.error);
    if (!t.body.transactions || !t.body.transactions.length) return r();
    var n = t.body.transactions.filter(function (e) {
      return !modules.blockchain.transactions.hasUnconfirmed(e.id)
    });
    modules.blockchain.transactions.receiveTransactions(n, r)
  })
}, private_.blockSync = function (r) {
  modules.api.blocks.getHeight(function (e, t) {
    if (e) return r("Failed to get main block height: " + e);
    app.logger.info("get main block height", t);
    var n = modules.blockchain.blocks.getLastBlock();
    if (app.logger.info("last block height", n.height), n.pointHeight && t - n.pointHeight <= 2) return r();
    modules.api.transport.getRandomPeer("get", "/blocks/height", null, function (e, t) {
      return e ? r("Failed to get blocks height: " + e) : (app.logger.info("blockSync get block height", t), bignum(n.height).gte(t.height) ? r() : void private_.findUpdate(n, t.peer, r))
    })
  })
}, private_.loadMultisignatures = function (a) {
  modules.blockchain.accounts.getExecutor(function (e, o) {
    if (e) return a(e);
    modules.api.multisignatures.pending(o.keypair.publicKey.toString("hex"), !0, function (e, t) {
      if (e) return a(e.toString());
      var n = [],
        r = t.transactions;
      async.eachSeries(r, function (e, t) {
        modules.api.multisignatures.sign(o.secret, null, e.transaction.id, function (e) {
          e && n.push(e), (0, _setImmediate3.default)(t)
        })
      }, function () {
        if (0 < n.length) return a(n[0]);
        a()
      })
    })
  })
}, Sync.prototype.onBind = function (e) {
  modules = e
}, Sync.prototype.onBlockchainLoaded = function () {
  (0, _setImmediate3.default)(function t() {
    library.sequence.add("Sync#blockSync", private_.blockSync(), function (e) {
      e && app.logger.error("Sync#blockSync timer", e), setTimeout(t, 1e4)
    })
  })
}, module.exports = Sync;