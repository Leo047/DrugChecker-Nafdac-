angular.module('starter.controllers', ['ngStorage'])

        .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $localStorage) {

            // With the new view caching in Ionic, Controllers are only called
            // when they are recreated or on app start, instead of every page change.
            // To listen for when this page is active (for example, to refresh data),
            // listen for the $ionicView.enter event:
            //$scope.$on('$ionicView.enter', function(e) {
            //});

            // Form data for the login modal
            $scope.loginData = {};
            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });
            // Triggered in the login modal to close it
            $scope.closeLogin = function () {
                $scope.modal.hide();
            };
            // Open the login modal
            $scope.login = function () {
                $scope.modal.show();
            };
            // Perform the login action when the user submits the login form
            $scope.doLogin = function () {
                console.log('Doing login', $scope.loginData);
                // Simulate a login delay. Remove this and replace with your login
                // code if using a login system
                $timeout(function () {
                    $scope.closeLogin();
                }, 1000);
            };

        })

        .controller('DrugsCtrl', function ($scope, DrugService) {
            var currentStart = 0;
            $scope.drugs = [];
            var filterBarInstance;
            $scope.addDrugs = function () {
                for (var i = currentStart; i < currentStart + 20; i++) {
                    $scope.drugs.push("Drug " + i);
                }
                currentStart += 20;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };
            $scope.addDrugs();

            $scope.drugs = DrugService.all();

            $scope.remove = function (drug) {
                DrugService.remove(drug);
            };
        })
        
        //Controller that returns the drug detail object

        .controller('DrugDetailCtrl', function ($scope, $stateParams, DrugService, $localStorage) {
            $scope.drug = DrugService.get($stateParams.drugId);
            if ($localStorage.favs === undefined) {
                $localStorage.favs = [];
            }
            var favs = [];
            $scope.favs = favs;
            $scope.save = function (object) {
                $localStorage.favs.push(DrugService.get($stateParams.drugId));
            };
        })

        .controller("FeedCtrl", function ($scope, FeedList, $timeout, $ionicLoading) {

            // Setup the loader
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
            $timeout(function () {
                $ionicLoading.hide();
                $scope.feeds = FeedList.get();
            }, 2000);
        })

        .controller("FavsCtrl", function ($scope, $localStorage) {
            $scope.data = $localStorage.favs;
            $scope.shouldShowDelete = false;
        });










