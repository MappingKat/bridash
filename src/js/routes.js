'use strict';
/* Route configuration for the BriDash module. */
angular.module('BriDash').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes
    $urlRouterProvider.otherwise('/');
    // Application routes
    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'templates/dashboard.html'
      })
      .state('tables', {
        url: '/tables',
        templateUrl: 'templates/tables.html'
      });
      // .state('analytics', {
      //   url: '/analytics',
      //   templateUrl: 'templates/analytics.html'
      // });
    }
]);
