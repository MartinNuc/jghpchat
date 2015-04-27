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

var chat = require('./controllers/chat');
chat.api(app);

// serve index and view partials
app.get('/', routes.index);
app.get(/^\/partials(.*)$/, routes.partials);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

mongoose.connect('mongodb://localhost/jghpchat');

/**
 * Start Server
 */
app.server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
    chat.startSocket(app.server);
});