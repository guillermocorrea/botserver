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
            up: 'UP',
            down: 'DOWN',
            open: 'OPEN',
            close: 'CLOSE'
        },
        /**
         * Robotic arm states
         */
        states: {
            upClosed: 'UP_CLOSED',
            upOpen: 'UP_OPEN',
            downClosed: 'DOWN_CLOSED',
            downOpen: 'DOWN_OPEN'
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