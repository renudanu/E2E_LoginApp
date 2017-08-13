app.service('getServerPublicKeySpecRepository', function($http,$q){


    this.getServerPublicKeySpec = function () {
        var url = '/rest/Session/serverPublicKeySpec';

        return this.get(url);
    };


    this.post = function (url, formData, config) {
        return $http.post(url, formData, config).then(onSuccess.bind(this), onError);
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

    this.processGetResponseData = function (responseData) {
        return responseData;
    };

    this.processPostResponseData = function (responseData) {
        return responseData;
    };

    function onError(errorResponse) {
        return $q.reject(errorResponse.data);
    }
});