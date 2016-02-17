angular.module('angular-carousel', ['ngMockE2E'])
	.constant('carousel.serviceUrls', {
		getCarouselDataUrl: 'api/example/link'
	})
	.run(function($httpBackend) {
		function get(url) {
            var request = new XMLHttpRequest();

            request.open('GET', url, false);
            request.send(null);

            if (request.status === 200) {
                return [200, JSON.parse(request.responseText)];
            } else {
                console.error('data url ' + url + ' does not exist');
                return [400, ''];
            }
        }

		$httpBackend.when('GET', 'api/example/link').respond(function(method, url, data) {
			return get('/stubs/carousel-item.json');
		});
		$httpBackend.when('GET', /^.*/).passThrough();
	});