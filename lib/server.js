'use strict';

var
  _ = require('lodash'),
  express = require('express');

var defaults = {
  port: 3000,
  liveReload: true,
  liveReloadPort: 35729
};

var _server, _app;

module.exports = function factory(options) {
  return new Server(options);
};

function Server(options) {
  this.options = options || {};
  _.defaults(this.options, defaults);
  _app = express();

  if(this.options.liveReload) {
    console.log('Using connect-livereload on port ' + this.options.liveReloadPort);
    _app.use(require('connect-livereload')({
      port: this.options.liveReloadPort
    }));
  }
  this.use(this.options.middleware);
  _app.use(express.static(options.document_root));
}

Server.prototype.use = function loadMiddleware(middleware) {
  if( _.isFunction(middleware) ) {
    return _app.use(middleware);
  }
  middleware = middleware || [];
  _.each(middleware, function forEach(useFn) {
    if (!_.isFunction(useFn)) {
      return;
    }
    _app.use(useFn);
  });
};

Server.prototype.start = function start(cb) {
  _server = _app.listen(this.options.port, function callback() {
    var
      host = _server.address().address,
      port = _server.address().port;
    console.log('Express listening at http://%s:%s', host, port);
    cb();
  });
};

Server.prototype.stop = function stop(cb) {
  _server.close(cb);
};
