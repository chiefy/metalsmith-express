'use strict';

var
  chalk = require('chalk'),
  _     = require('lodash');

var
  MODULE_NAME = '[metalsmith-express]',
  OK          = chalk.green('✔︎'),
  NOT_OK      = chalk.red('✗'),
  TYPES       = {
    INFO: 0,
    ERROR: 1,
    WARN: 2,
    DEBUG: 3
  };

module.exports = function log(type, message) {
  var
    msgType = _.isNumber(type) ? type : TYPES.INFO,
    tag        = chalk.gray(MODULE_NAME),
    fmtMessage = tag + ' ';

  message = _.isUndefined(message) && _.isString(type) ? type : undefined;

  switch (msgType) {
    case TYPES.ERROR:
      fmtMessage += NOT_OK;
      break;
    default:
      fmtMessage += OK;
      break;
  }
  console.log(fmtMessage + ' ' + message);
};
