var Config = (function () {
    return {
        baseUrl: "http://guebot.herokuapp.com:80",
        /**
         * Publish subscribed channel event, receive/sent the movement
         */
        movement: 'movement',
        /**
         * Status channel
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
        }
    };
})();