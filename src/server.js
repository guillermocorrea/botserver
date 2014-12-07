/**
 * Created by guillermo on 22/10/2014.
 */
'use strict';
var app = require('express')();
app.settings.env = 'development';

var server = require('http').Server(app);
var io = require('socket.io');
var express = require('express');
var mysql = require('mysql');
var config = require('./config');
var logger = require('./utils/logger');

var passport = require('passport');
var flash = require('connect-flash');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var noApply = 'N/A';
var validToken = 'Y';
var invalidToken = 'N';

var port = process.env.PORT || config.server.port;

app.set('dbUrl', process.env.MONGOLAB_URI || config.db[app.settings.env]);

// mongoose.connect(app.get('dbUrl'));  // connect to our database

require('./passport')(passport);


server.listen(port);
var io = io.listen(server);

// express configuration
app.use(express.static('./public'));
// set up our express application
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));


// required for passport
app.use(session({ secret: 'd41d8cd98f00b204e9800998ecf8427e' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

logger.info("Overriding 'Express' logger");
app.use(require('morgan')("combined", { "stream": logger.stream }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// the callback after google has authenticated the user
app.get('/oauth2callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/'
    }));

var connection = mysql.createConnection({
    host: config.dbmysql.connection.host,
    user: config.dbmysql.connection.user,
    password: config.dbmysql.connection.password,
    database: config.dbmysql.connection.database,
    port: config.dbmysql.connection.port
});

io.on('connection', function (socket) {
    socket.on(config.channels.movement, function (movement) {
        if (movement === undefined ||
            movement.move === undefined ||
            movement.move.data === undefined ||
            movement.move.data.instruction === undefined ||
            config.channels.moves[movement.move.data.instruction] === undefined) {
            socket.broadcast.emit(config.channels.error, 'invalid move');
            return;
        }else{

            var values  = [movement.move.userid,movement.move.token,'ee@d.com', config.channels.movement, JSON.stringify(movement),invalidToken];
            var query = connection.query('INSERT INTO guebot.OPERATION_TRACE (USER_ID,TOKEN,EMAIL,CHANNEL_NAME, MESSAGE_CONTENT,AUTHORIZATION_RESULT) VALUES (?,?,?,?,?,?)', values, function(err, result) {
                logger.info(result);
             });

            socket.broadcast.emit(config.channels.movement, movement);
        }
    });

    socket.on(config.channels.status, function (data) {
        var values  = [noApply,noApply,noApply, config.channels.status, JSON.stringify(data),invalidToken];
        var query = connection.query('INSERT INTO guebot.OPERATION_TRACE (USER_ID,TOKEN,EMAIL,CHANNEL_NAME, MESSAGE_CONTENT,AUTHORIZATION_RESULT) VALUES (?,?,?,?,?,?)', values, function(err, result) {
            logger.info(result);
        });
        socket.broadcast.emit(config.channels.status, data);
    });
});

logger.info('listening on port ' + port);

module.exports = app;