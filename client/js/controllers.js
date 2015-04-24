'use strict';

/* Controllers */

angular.module('jghpChatApp.controllers', []).
    controller('AppCtrl', function ($scope, UsernameService) {

        $scope.username = UsernameService.getUsername();
    }).
    controller('ChatController', function ($scope) {
        // write Ctrl here

    });
