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
         * Publish channel: sends the error
         */
        error: 'error',
        /**
         * The moves
         */
        moves: {
            up: 'up',
            down: 'down'
        }
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