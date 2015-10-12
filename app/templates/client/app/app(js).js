'use strict';

//HTML
require('index.html');
//Styles
<% if(filters.css){ %>
require('./app.css');<% } %><% if(filters.sass){ %>
require('./app.scss');<% } %><% if(filters.less){ %>
require('./app.less');<% } %><% if(filters.stylus){ %>
require('./app.styl');<% } %>
//Js Deps
require('angular');
require('angular-sanitize');
require('angular-resource');
require('angular-cookies');<% if(filters.ngroute) { %>
require('angular-route');<% } %><% if(filters.uibootstrap) { %>
require('angular-ui-bootstrap');<% } %><% if(filters.socketio) { %>
require('angular-socket-io');<% } %><% if(filters.uirouter) { %>
require('angular-ui-router');<% } %>

angular.module('<%= scriptAppName %>', [<%= angularModules %>])
  <% if(filters.ngroute) { %>.config(function ($routeProvider, $locationProvider<% if(filters.auth) { %>, $httpProvider<% } %>) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);<% if(filters.auth) { %>
    $httpProvider.interceptors.push('authInterceptor');<% } %>
  })<% } %><% if(filters.uirouter) { %>.config(function ($stateProvider, $urlRouterProvider, $locationProvider<% if(filters.auth) { %>, $httpProvider<% } %>) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);<% if(filters.auth) { %>
    $httpProvider.interceptors.push('authInterceptor');<% } %>
  })<% } %><% if(filters.auth) { %>
  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on(<% if(filters.ngroute) { %>'$routeChangeStart'<% } %><% if(filters.uirouter) { %>'$stateChangeStart'<% } %>, function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    });
  })<% } %>;
<% if(filters.socketio) { %>require('../components/socket/socket.service');<% } %>
require('./main/main');
