(function() {
    'use strict';

    angular
        .module('angular-carousel')
        .controller('angular-carousel.mainController', MainController);

    MainController.$inject = ['carouselData.service'];

    function MainController(dataService) {
        var vm = this;

        init();

        function init() {
            dataService.getCarouselData().then(dataServiceSuccess, dataServiceFailed);

            function dataServiceSuccess(response) {
                vm.init = true;
                vm.items = response.data.slides;
            }

            function dataServiceFailed() {
                vm.init = false;
            }
        }
    }
}());
