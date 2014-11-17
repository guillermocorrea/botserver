/**
 * Created by guillermo on 22/10/2014.
 */
'use strict';

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var express = require('express');
var config = require('./config');
var logger = require('./utils/logger');

var port = process.env.PORT || config.server.port;
server.listen(port);

app.use(express.static('public'));

logger.info("Overriding 'Express' logger");
app.use(require('morgan')("combined", { "stream": logger.stream }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
    socket.on(config.channels.movement, function (movement) {

        /*if (movement === undefined ||
            movement.move === undefined ||
            movement.move.data === undefined ||
            movement.move.data.instruction === undefined ||
            config.channels.moves[movement.move.data.instruction] === undefined) {
            console.log(movement.move.data.instruction);
            logger.debug('emitting ' + config.channels.error + ': ' + movement);
            io.emit(config.channels.error, '\'' + movement + '\' is an invalid move');
            return;
        }*/

        io.emit(config.channels.movement, movement);
    });

    socket.on(config.channels.status, function (data) {
        io.emit(config.channels.status, data);
    });
});

logger.info('listening on port ' + port);

module.exports = app;