'use strict';

var
  server  = require('./lib/server'),
  _       = require('lodash'),
  path    = require('path'),
  _server = null;

function middleware(options, files, metalsmith, next) {
    if(_server) {
      return next();
    }

    var document_root = options.document_root ?
      path.resolve(options.document_root) :
      metalsmith.destination();

    _.defaults(options, { document_root: document_root });

    _server = server(options);
    _server.start(next);
}

module.exports = function metalsmith_express(options) {
  options = options || {};
  return function(files, metalsmith, next) {
    return middleware(options, files, metalsmith, next);
  };
};
