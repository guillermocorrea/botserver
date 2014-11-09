var Config = (function () {
  return {
  	baseUrl: "https://guebot.herokuapp.com/",
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
  };
})();