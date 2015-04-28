/**
 * Module dependencies
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    morgan = require('morgan'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose');
var app = module.exports = express();
/**
 * Configuration
 */
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
 * Controllers
 */
var chat = require('./controllers/chat');

/**
 * Routes
 */
chat.initApi(app);
app.get(/^\/partials(.*)$/, routes.partials);
app.get('*', routes.index);

/**
 * Database
 */
mongoose.connect('mongodb://localhost/jghpchat');

/**
 * Start Server
 */
app.server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));

    // initialize Socket.io
    chat.startSocket(app.server);
});