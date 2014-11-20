'use strict';
/**
 * Configuration module
 * @type {{server: {port: number, websocketUrl: string}, test: {port: number, websocketUrl: string}}}
 */
module.exports = {
    channels: {
        /**
         * Publish subscribed channel event, receive/sent the movement
         */
        movement: 'movement',
        /**
         * Listen and broadcast status events
         */
        status: 'status',
        /**
         * Publish channel: sends the error
         */
        error: 'error',
        /**
         * The moves
         */
        moves: {
            UP: 'UP',
            DOWN: 'DOWN',
            OPEN: 'OPEN',
            CLOSE: 'CLOSE'
        },
        /**
         * Robotic arm states
         */
        states: {
            UP_CLOSED: 'UP_CLOSED',
            UP_OPEN: 'UP_OPEN',
            DOWN_CLOSED: 'DOWN_CLOSED',
            DOWN_OPEN: 'DOWN_OPEN'
        }
    },
    db: {
        production: "",
        development: "mongodb://localhost/botserver-dev",
        test: "mongodb://localhost/botserver-test"
    },
    dbmysql: {
        connection : {
            host : "sql4.freesqldatabase.com",
            database : "sql458500",
            user     : "sql458500",
            password : "yQ2*iE6!",
            port : 3306
        }
    },
    googleAuth : {
        'clientID'      : '376158680553-n6d97v478eprdugqrpplq9h8qcncp7ol.apps.googleusercontent.com',
        'clientSecret'  : 'G5c1Dvo7fzQjvNIBlBMkdPln',
        'callbackURL'   : 'http://localhost:8080/oauth2callback'
    },
    server: {
        port: 8080,
        websocketUrl: 'http://127.0.0.1:8080'
    },
    test: {
        port: 8080,
        websocketUrl: 'http://127.0.0.1:8080'
    }
};