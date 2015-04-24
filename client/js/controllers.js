'use strict';

angular.module('jghpChatApp.controllers', []).
    controller('AppCtrl', function ($scope, UsernameService, $routeParams) {

        $scope.$on('$routeChangeSuccess', function() {
            UsernameService.setUsername($routeParams.username);
            $scope.username = UsernameService.getUsername();
        });
    }).
    controller('ChatController', function ($scope, mySocket) {
        $scope.chatMessages = [];
        // write Ctrl here
        mySocket.on('broadcast', function (data) {
            $scope.chatMessages.push(data);
        });

        $scope.send = function(message) {
            mySocket.emit("newMessage", {username: $scope.username, text: message});
            $scope.newMessageText = "";
        };

    });
