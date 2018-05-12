'use strict';

var
  express = require('express'),
  log     = require('./log'),
  chalk   = require('chalk'),
  isFunction = require('./util').isFunction;

var defaults = {
  port: 3000,
  host: '0.0.0.0',
  liveReload: true,
  liveReloadPort: 35729
};

var _server, _app, _options;

module.exports = function factory(options) {
  _options = options || {};
  Object.assign(_options, defaults);
  _app = express();

  if(_options.liveReload) {
    log('Using connect-livereload on port: ' + chalk.cyan(_options.liveReloadPort));
    _app.use(require('connect-livereload')({
      port: _options.liveReloadPort
    }));
  }

  useMiddleware(_options.middleware);
  _app.use(express.static(options.document_root));

  return {
    start: start,
    stop: stop
  };
};


function useMiddleware(middleware) {
  if(isFunction(middleware)) {
    return _app.use(middleware);
  }
  middleware = middleware || [];
  middleware
    .filter(isFunction)
    .forEach(function(useFn) {
      _app.use(useFn);
    });
}

function start(cb) {
  _server = _app.listen(_options.port, _options.host, function callback() {
    var
      host = _server.address().address,
      port = _server.address().port;
    log('Express listening at ' + chalk.cyan('http://' + host + ':' + port));
    cb();
  });

  _server.on('error', function onError(err) {
    if(err.code === "EADDRINUSE") {
      log(chalk.red("Port " + _options.port + " is already in use by another process."));
    }
    else {
      log(chalk.red(err));
    }
    throw err;
  });

}

function stop(cb) {
  _server.close(function onClose() {
    log('Express server stopped.');
    cb();
  });
}
