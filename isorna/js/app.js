/* globals angular, Firebase */
'use scrict';

// Use Fluent code style guide, no globals!
angular.module('myAppModule', ['ngRoute', 'firebase'])
    .constant('ruta', 'home')
    .controller('MenuController', ['$scope', '$firebase', 'ruta', function ($scope, $firebase, ruta) {
        var oReferenciaBDD = new Firebase('https://fictizia-angularjs.firebaseio.com/');
        
        oReferenciaBDD.authWithOAuthPopup("facebook", function(err, authData) {
            console.log(authData);
            oReferenciaBDD.child('authUsers').set(authData);
        });
        
        // $scope variables
        $scope.URL_MENU = 'templates/menu.html';
        $scope.menuItems = ['Home'];
        $scope.rutaActual = ruta;
        
        // $scope methods
        $scope.addMenuItem = function () {
            $scope.menuItems.push(angular.copy($scope.menuItem));
            $scope.menuItem = '';
        };
    }])
    .controller('HomePageController', ['$scope', 'ruta', '$location', function ($scope, ruta, $location, $routeParams) {
        ruta = 'home';
        $scope.rutaActual = ruta;
        console.log('home cargada', $routeParams.param);
    }])
    .controller('OtherPageController', ['$scope', 'ruta', '$location', function ($scope, ruta, $location) {
        ruta = $location.path();
        $scope.rutaActual = ruta;
        console.log('otra pagina cargada');
    }])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider 
        // Home
        .when("/", {templateUrl: "partials/home.html", controller: "HomePageController"})
        .when("/Home:param", {templateUrl: "partials/home.html", controller: "HomePageController"})
        // Pages
        .when("/about", {templateUrl: "partials/about.html", controller: "OtherPageController"})
        // else 404
        .when("/404", {templateUrl: "partials/404.html", controller: "OtherPageController"})
        .otherwise({redirectTo: "/404"});
        // configure html5 to get links working on jsfiddle
        $locationProvider.html5Mode(true);
    })
    .controller('BlogCtrl', function ($scope, $location, $http) {
        console.log("Blog Controller reporting for duty.");
    })
    .controller('PageCtrl', function ($scope, $location, $http) {
        console.log("Page Controller reporting for duty.");
    });