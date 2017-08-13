app.service('loginRepository', function ($http, $q, cryptoUtil) {
    this.login = function (username, password, timeoutSeconds, passwordIsToken, isExternalToken) {
        var url = '/rest/v2/Session',
            config = {
                params: {
                    applicationId: "HTML",
                    timeoutSeconds: 31536000,
                    passwordIsToken: passwordIsToken,
                    isExternalToken: isExternalToken
                }
            },
            data = {
                userName: username,
                password: cryptoUtil.encryptWithServerPublicKey(password)
            };

        return this.post(url, data, config);
    };

    this.post = function (url, formData, config) {
        return $http.post(url, formData, config).then(onSuccess.bind(this), onError);
    };

    function onSuccess(response) {
        if (response) {
            switch (response.config.method) {
                case 'POST':
                    return this.processPostResponseData(response.data);
            }
        } else {
            return $q.reject();
        }
    }

    function onError(errorResponse) {
        return $q.reject(errorResponse.data);
    }

    this.processPostResponseData = function (responseData) {
        return responseData;
    };


});
