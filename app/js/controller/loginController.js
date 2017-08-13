'use strict'

app.controller('loginController', function($scope, loginRepository,$state, cryptoUtil){

    $scope.userName='';
    $scope.password='';
    $scope.message='';

    var userList;

    $scope.login = function() {
        cryptoUtil.initServerPublicKey().then(function () {
            loginRepository.login($scope.userName,$scope.password).then(function(result){
                $state.go("home",{loginMessage:'Login Successfull'});
            });
        });
    }
});