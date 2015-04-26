var mongoose = require('mongoose')
var Message = require('../model/message');
var io = require('socket.io');

module.exports.controller = function(app) {

    var server = app.server;

    app.get('/api/history', function() {
        Message.find().exec(function(data) {
            console.log(data);
        });
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
            var message = new Chat(data);
            message.save(function (err) {
                if (err)
                    console.log(err);
                else {
                    io.sockets.emit("newMessage", message);
                    console.log(message);
                }
            });
        });

        socket.on('disconnect', function (param) {
            var index = onlineUsers.indexOf(username);
            if (index > -1) {
                onlineUsers.splice(index, 1);
            }

            io.sockets.emit("onlineUsers", onlineUsers);
        });
    });
};