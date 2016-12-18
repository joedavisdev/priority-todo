/* global angular */

var priorityTodo = angular.module('app', ['ngRoute','app.home']);

// Page routing
priorityTodo.config(function ($routeProvider) {
    $routeProvider
    .when('/home', {
        templateUrl: 'components/home/home.html',
        controller: 'HomeController'
    })
    .when('/', {
        redirectTo: '/home'
    })
    .otherwise({
        redirectTo: '/'
    });
});

// App initialisation
appInitialization = function() {
};
// Listen to device ready
angular.element(document).ready(function() {
    document.addEventListener('deviceready', appInitialization, false);
});