(function() {
    'use strict';

    angular
        .module('angular-carousel')
        .factory('carouselData.service', carouselDataService);

    carouselDataService.$inject = ['$http', '$q', 'carousel.serviceUrls'];

    function carouselDataService($http, $q, serviceUrls) {
        return {
            getCarouselData: getCarouselData
        };

        function getCarouselData() {
            var defer = $q.defer(),
                settings = {
                    method: 'GET',
                    url: serviceUrls.getCarouselDataUrl
                };

            $http(settings)
                .then(getCarouselDataComplete)
                .catch(getCarouselDataFailed);

            return defer.promise;

            function getCarouselDataComplete(response) {
                defer.resolve(response);
            }

            function getCarouselDataFailed(error) {
                console.log(error)
                defer.reject(error);
            }
        }
    }
}());
