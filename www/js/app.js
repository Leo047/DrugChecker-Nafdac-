// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.service.core', 'starter.controllers', 'drugService', 'drugFilters'])

        .run(function ($ionicPlatform, $rootScope, $ionicLoading) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }

            });

        })

        .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $stateProvider

                    .state('app', {
                        url: '/app',
                        abstract: true,
                        templateUrl: 'templates/menu.html',
                        controller: 'AppCtrl'
                    })

                    .state('app.drugs', {
                        url: '/drugs',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/drugs.html',
                                controller: 'DrugsCtrl'
                            }
                        }
                    })

                    .state('app.drug-detail', {
                        url: '/drugs/:drugId',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/drug-detail.html',
                                controller: 'DrugDetailCtrl'
                            }
                        }
                    })

                    .state('app.update', {
                        url: '/updates',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/updates.html',
                                controller: 'FeedCtrl'
                            }
                        }
                    })

                    .state('app.browse', {
                        url: '/browse',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/browse.html'
                            }
                        }
                    })

                    .state('app.about', {
                        url: '/about',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/about.html'
                            }
                        }
                    })

                    .state('app.favorites', {
                        url: '/favorites',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/favorites.html',
                                controller: 'FavsCtrl'
                            }
                        }
                    });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/drugs');

            $httpProvider.interceptors.push(function ($rootScope) {
                return {
                    request: function (config) {
                        $rootScope.$broadcast('loading:show');
                        return config;
                    },
                    response: function (response) {
                        $rootScope.$broadcast('loading:hide');
                        return response;
                    }
                };
            });
        });
