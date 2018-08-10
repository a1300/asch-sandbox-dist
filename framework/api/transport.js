"use strict";
var crypto = require("crypto"),
  self = null,
  library = null,
  modules = null;

function Transport(r, e) {
  library = e, r(null, self = this)
}

function getIdentity(r) {
  var e = r.hostname + ":" + r.port;
  return crypto.createHash("ripemd160").update(e).digest()
}
Transport.prototype.message = function (r, e, t) {
  e = {
    call: "transport#message",
    args: {
      message: e,
      topic: r
    }
  };
  t || (t = function () {}), library.sandbox.sendMessage(e, t)
}, Transport.prototype.getRandomPeer = function (r, e, t, o) {
  var s = {
    ip: "0.0.0.0",
    port: 4096
  };
  app.config.peers && (s = app.config.peers[0]);
  var a = {
      hostname: s.ip,
      port: s.port,
      protocol: "http:"
    },
    n = {
      call: "transport#request",
      args: {
        peer: [getIdentity(a), a],
        method: r,
        path: e,
        query: t
      }
    };
  library.sandbox.sendMessage(n, o)
}, Transport.prototype.getPeer = function (r, e, t, o, s) {
  var a = {
    call: "transport#request",
    args: {
      peer: r,
      method: e,
      path: t,
      query: o
    }
  };
  library.sandbox.sendMessage(a, s)
}, Transport.prototype.onBind = function (r) {
  modules = r
}, module.exports = Transport;