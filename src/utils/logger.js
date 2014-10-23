/**
 * Created by guillermo on 22/10/2014.
 */
var winston = require('winston');
winston.emitErrs = true;
var config = require('../config');

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename:'./logs/all-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

/**
 * The logger object
 * @type {winston.Logger}
 */
module.exports = logger;

/**
 * Write method
 * @type {{write: write}}
 */
module.exports.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};