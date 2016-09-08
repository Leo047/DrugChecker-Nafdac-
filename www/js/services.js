angular.module('drugService', ['ngResource', 'ngStorage'])

        .factory('DrugService', ['$http', function ($http) {

                var drugs = [];

                $http.get('drugs.json').success(function (data) {
                    data.forEach(function (drug) {
                        drugs.push(drug);
                    });
                });
                return {
                    all: function () {
                        return drugs;
                    },
                    remove: function (drug) {
                        drugs.splice(drugs.indexOf(drug), 1);
                    },
                    get: function (drugId) {
                        for (var i = 0; i < drugs.length; i++) {
                            if (drugs[i].Id === parseInt(drugId)) {
                                return drugs[i];
                            }
                        }
                        return null;
                    }
                };
            }])

        .factory('FeedService', function ($resource) {
            return $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
                fetch: {method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK'}}
            });
        })

        .service('FeedList', function ($rootScope, FeedService, $localStorage) {
            var feeds = [];

            this.get = function () {
                var feedSources = [
                    {title: 'Nafdac', url: 'http://feed43.com/7141285604267100.xml'}
                ];
                if (feeds.length === 0) {
                    for (var i = 0; i < feedSources.length; i++) {
                        FeedService.fetch({q: feedSources[i].url, num: 10}, {}, function (data) {
                            var feed = data.responseData.feed;
                            feeds.push(feed);
                            if ($localStorage.feeds === undefined) {
                                $localStorage.feeds = [];
                                $localStorage.feeds.push(data.responseData.feed.entries);
                            }

                        });

                    }
                }

                return feeds;
            };

        });