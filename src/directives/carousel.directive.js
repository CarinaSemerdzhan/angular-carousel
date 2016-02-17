(function() {
    'use strict';

    angular
        .module('angular-carousel')
        .directive('rsCarousel', rsCarousel);

    rsCarousel.$inject = ['$window'];

    function rsCarousel($window) {
        var directive = {
                restrict: 'E',
                templateUrl: 'src/partials/rscarousel.template.html',
                scope: {
                    rsData: '='
                },
                link: link
            };
        return directive;

        function link(scope, element, attrs) {
            var slides = scope.rsData.length - 1,
                wrapper = angular.element(element[0].getElementsByClassName('rs-carousel-wrapper')[0]);

            // initiation 
            scope.rsData[0].active = true;

            scope.getNumber = function(n) {
                var arr = [];

                arr.length = n;

                return arr;
            }

            scope.goToNext = function() {
                var currentItemIndex = getActiveItem(scope.rsData);

                scope.rsData[currentItemIndex].active = false;

                if (currentItemIndex < slides) {
                    scope.rsData[currentItemIndex + 1].active = true;
                    calculate(currentItemIndex, (currentItemIndex + 1));
                } else {
                    scope.rsData[0].active = true;
                    calculate(currentItemIndex, 0);
                }
            }

            scope.goToPrev = function() {
                var currentItemIndex = getActiveItem(scope.rsData);

                scope.rsData[currentItemIndex].active = false;

                if (currentItemIndex !== 0) {
                    scope.rsData[currentItemIndex - 1].active = true;
                    calculate(currentItemIndex, (currentItemIndex - 1));

                } else {
                    scope.rsData[slides].active = true;
                    calculate(currentItemIndex, slides)
                }
            }

            scope.goToSlide = function(index) {
                var currentItemIndex = getActiveItem(scope.rsData);

                scope.rsData[currentItemIndex].active = false;

                scope.rsData[index].active = true;
                calculate(currentItemIndex, index);
            }

            function calculate(prev, next) {
                var distance,
                    position = wrapper.css('left') !== '' ? parseFloat(wrapper.css('left')) : '',
                    activeItem = element[0].getElementsByClassName('rs-carousel_item')[prev],
                    getOffset = parseFloat($window.getComputedStyle(activeItem).getPropertyValue('margin-left'));   

                if (prev === 0) {
                    getOffset = getOffset/2;
                }

                distance = (prev - next) * (activeItem.offsetWidth + getOffset) + position + 'px';

                wrapper.css('left', distance);
            }
        }
    }

    function getActiveItem(collection) {
        var active;

        collection.forEach(function(item, index) {
            if (angular.isDefined(item.active) && item.active) {
                active = index;
            }
        });

        return active;
    }
})();
