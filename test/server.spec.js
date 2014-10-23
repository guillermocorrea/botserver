'use strict';

process.env.NODE_ENV = 'test';

var should = require('should');
var io = require('socket.io-client');
var app = require('../src/server');
var config = require('../src/config');

var options = {
    transports: ['websocket'],
    'force new connection': true
};

describe("Websocket Server", function () {
    it("Should emit a new movement event when receive a valid movement event", function (done) {
        var client = io.connect(config.test.websocketUrl, options);
        var move = config.channels.moves.up;
        client.on('connect', function (data) {
            client.emit(config.channels.movement, move);
        });

        client.on(config.channels.movement, function (data) {
            data.should.be.equal(move);
            client.disconnect();
            done();
        });
    });

    it("Should emit a new error event when receive an invalid movement event", function (done) {
        var client = io.connect(config.test.websocketUrl, options);
        var move = 'invalid move';
        client.on('connect', function (data) {
            client.emit(config.channels.movement, move);
        });

        client.on(config.channels.error, function (data) {
            data.should.be.equal('\'' + move + '\' is an invalid move');
            client.disconnect();
            done();
        });
    });
});