'use strict'

//HTML
require 'index.html'
//Styles
<% if(filters.css){ %>
require './app.css'<% } %><% if(filters.sass){ %>
require './app.scss'<% } %><% if(filters.less){ %>
require './app.less'<% } %><% if(filters.stylus){ %>
require './app.styl'<% } %>
//Js Deps
require 'angular'
require 'angular-sanitize'
require 'angular-resource'
require 'angular-cookies'<% if(filters.ngroute) { %>
require 'angular-route'<% } %><% if(filters.uibootstrap) { %>
require 'angular-ui-bootstrap'<% } %><% if(filters.socketio) { %>
require 'angular-socket-io'<% } %><% if(filters.uirouter) { %>
require 'angular-ui-router'<% } %>

angular.module '<%= scriptAppName %>', [<%= angularModules %>]
<% if(filters.ngroute) { %>.config ($routeProvider, $locationProvider<% if(filters.auth) { %>, $httpProvider<% } %>) ->
  $routeProvider
  .otherwise
    redirectTo: '/'

  $locationProvider.html5Mode true<% if(filters.auth) { %>
  $httpProvider.interceptors.push 'authInterceptor'<% } %>
<% } %><% if(filters.uirouter) { %>.config ($stateProvider, $urlRouterProvider, $locationProvider<% if(filters.auth) { %>, $httpProvider<% } %>) ->
  $urlRouterProvider
  .otherwise '/'

  $locationProvider.html5Mode true<% if(filters.auth) { %>
  $httpProvider.interceptors.push 'authInterceptor'<% } %>
<% } %><% if(filters.auth) { %>
.factory 'authInterceptor', ($rootScope, $q, $cookieStore, $location) ->
  # Add authorization token to headers
  request: (config) ->
    config.headers = config.headers or {}
    config.headers.Authorization = 'Bearer ' + $cookieStore.get 'token' if $cookieStore.get 'token'
    config

  # Intercept 401s and redirect you to login
  responseError: (response) ->
    if response.status is 401
      $location.path '/login'
      # remove any stale tokens
      $cookieStore.remove 'token'

    $q.reject response

.run ($rootScope, $location, Auth) ->
  # Redirect to login if route requires auth and you're not logged in
  $rootScope.$on <% if(filters.ngroute) { %>'$routeChangeStart'<% } %><% if(filters.uirouter) { %>'$stateChangeStart'<% } %>, (event, next) ->
    Auth.isLoggedInAsync (loggedIn) ->
      $location.path "/login" if next.authenticate and not loggedIn
<% } %>
% if(filters.socketio) { %>
require '../components/socket/socket.service'
<% } %>

require './main/main'
