var mongoose = require('mongoose');
var Message = require('../model/message');
var io = require('socket.io');

module.exports.initApi = function (app) {
    /**
     * Route used for loading message history on chat load
     */
    app.get('/api/history', function (req, res) {
        // grab last 50 messages
        Message.find().sort({$natural: -1}).limit(50).exec(function (err, data) {
            res.json(data);
        });
    });
};

module.exports.startSocket = function (server) {

    var onlineUsers = [];
    io = io.listen(server);
    io.on('connection', function (socket) {
        var username = "";

        /**
         * New user joined channel
         */
        socket.on('join', function (data) {
            onlineUsers.push(data.username);
            username = data.username;
            io.sockets.emit("onlineUsers", onlineUsers);
        });

        /**
         * new message
         */
        socket.on('sendMessage', function (data) {
            if (!data.text) {
                return;
            }
            var message = new Message(data);
            message.save(function (err) {
                if (err)
                    console.log(err);
                else {
                    io.sockets.emit("newMessage", message);
                }
            });
        });

        /**
         * User left the channel
         */
        socket.on('disconnect', function (param) {
            cleanupSocket();
        });

        /**
         * Error
         */
        socket.on('error', function (err) {
            console.error(err.stack);
            cleanupSocket();
        });

        /**
         * Removed user from online users and send notice to others
         */
        function cleanupSocket() {
            var index = onlineUsers.indexOf(username);
            if (index > -1) {
                onlineUsers.splice(index, 1);
            }

            io.sockets.emit("onlineUsers", onlineUsers);
        }
    });
};