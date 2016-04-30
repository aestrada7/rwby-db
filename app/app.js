var app = angular.module('rwbyDB', ['ui.router']);

//Routing
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    var homeURL = '';
    var emptyURL = '/';

    $urlRouterProvider.otherwise('/404');

    $stateProvider.state('home', {
      url: homeURL,
      templateURL: 'features/home/home.html',
      controller: 'HomeController',
      pageTitle: 'Home'
    }).state('404', {
      url: '/404',
      templateURL: 'features/404/404.html',
      pageTitle: '404 Not Found'
    });
  }]
);

app.run(['$rootScope',

  function($rootScope) {
    $rootScope.$on('$stateChangeError', function(event, toState, fromState) {
      console.log('error');
      console.log(toState);
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, fromState) {
      $rootScope.index = Object.create(null);
      $rootScope.index.title = 'RWBY DB: ' + toState.pageTitle;
      //$('.loading').show();
    });
  }]

);