'use strict'

app.controller('homeController', function($scope, $stateParams,$state){

    $scope.message = $stateParams.loginMessage;


});