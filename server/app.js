/**
 * Module dependencies
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    morgan = require('morgan'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path'),
    io = require('socket.io');
var app = module.exports = express();
/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride());
app.use(express.static(path.join(__dirname, '..', 'client')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
    app.use(errorHandler());
}

// production only
if (env === 'production') {
    // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get(/^\/partials(.*)$/, routes.partials);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
 * Start Server
 */

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


var onlineUsers = [];
io = io.listen(server);
io.on('connection', function (socket) {
    var username = "";

    socket.on('join', function (data) {
        onlineUsers.push(data.username);
        username = data.username;
        io.sockets.emit("onlineUsers", onlineUsers);
    });

    socket.on('sendMessage', function (data) {
        data.timestamp = Date.now();
        io.sockets.emit("newMessage", data);
    });

    socket.on('disconnect', function(param) {
        var index = onlineUsers.indexOf(username);
        if (index > -1) {
            onlineUsers.splice(index, 1);
        }

        io.sockets.emit("onlineUsers", onlineUsers);
    });
});