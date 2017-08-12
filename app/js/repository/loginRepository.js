/*
(function () {
    'use strict';

    /!*@ngInject*!/
    repository.loginRepository = function ($http,$q) {

        angular.extend(this);

        this.login = function () {
            var url = '/rest/Session';
            console.log('login');
          return this.get(url);
        };

        this.get = function (url, config) {
            return $http.get(url, config).then(onSuccess.bind(this), onError);
        };

        function onSuccess(response) {
            if (response) {
                switch (response.config.method) {
                    case 'GET':
                        return this.processGetResponseData(response.data);

                    case 'POST':
                        return this.processPostResponseData(response.data);

                    case 'DELETE':
                        return this.processDeleteResponseData(response.data);
                }
            } else {
                return $q.reject();
            }
        }

        function onError(errorResponse) {
            return $q.reject(errorResponse.data);
        }

    };

    angular.module('loginApp')
        .service('loginRepository', repository.loginRepository);
})();*/


app.service('loginRepository', function($http,$q,cryptoUtil){


    this.login = function (username, password, timeoutSeconds, passwordIsToken, isExternalToken) {
        var url = '/rest/v2/Session',
            config = {
                params: {
                    applicationId: applicationId,
                    timeoutSeconds: timeoutSeconds//,
                    //passwordIsToken: passwordIsToken,
                    //isExternalToken: isExternalToken
                }
            },
            data = {
                userName: username,
                password: cryptoUtil.encryptWithServerPublicKey(password)
            };

        return this.post(url, data, config);
    };


    this.login = function () {
        var url = '/login.json',
            config = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'contentType': 'application/json',
                    'Accept': 'application/json'
                }
        };
        return this.get(url, {}, config);
    };


    this.get = function (url, config) {
        return $http.get(url, config).then(onSuccess.bind(this), onError);
    };

    function onSuccess(response) {
        if (response) {
            switch (response.config.method) {
                case 'GET':
                    return this.processGetResponseData(response.data);

                case 'POST':
                    return this.processPostResponseData(response.data);

                case 'DELETE':
                    return this.processDeleteResponseData(response.data);
            }
        } else {
            return $q.reject();
        }
    }

    function onError(errorResponse) {
        return $q.reject(errorResponse.data);
    }


    this.processGetResponseData = function (responseData) {
        return responseData;
    };

});
