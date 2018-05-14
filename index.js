'use strict';

var
  server  = require('./lib/server'),
  path    = require('path'),
  _server = null;

function middleware(options, files, metalsmith, next) {
  if(_server) {
    return next();
  }

  var document_root = options.document_root ?
    path.resolve(options.document_root) :
    metalsmith.destination();

  Object.assign(options, { document_root: document_root });

  _server = server(options);
  _server.start(next);
}

module.exports = function metalsmith_express(options) {
  options = options || {};
  return function metalsmith_express_plugin(files, metalsmith, next) {
    return middleware(options, files, metalsmith, next);
  };
};
