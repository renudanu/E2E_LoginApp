app.service('cryptoUtil', function($q,getServerPublicKeySpecRepository){
            var publicKey,
                isLoading = false,
                defer = null;

            this.initServerPublicKey = function () {

                function handleSuccess(publicKeySpec) {
                    isLoading = false;
                    var initSecureRandom = new SecureRandom();
                    publicKey = new RSAKey();
                    publicKey.setPublic(publicKeySpec.modulusHexString, publicKeySpec.publicExponentHexString);
                    if (defer) {
                        defer.resolve();
                    }
                    defer = null;
                }

                function handleError(error) {
                    isLoading = false;
                    return defer.reject(error);
                }

                if (_.isNull(defer)) {
                    defer = $q.defer();
                }

                if (isLoading) {
                    return defer.promise;
                } else if (publicKey) {
                    defer.resolve();
                } else {
                    isLoading = true;
                    getServerPublicKeySpecRepository.getServerPublicKeySpec().then(handleSuccess, handleError);
                }

                return defer.promise;
            };

            this.encryptWithServerPublicKey = function (value) {
                //Fixes issue with the added prototype method not being added in the RSA code in FireFox
                var initSecureRandom = new SecureRandom();
                var result = publicKey.encrypt(value);
                return hex2b64(result);
            };


})
