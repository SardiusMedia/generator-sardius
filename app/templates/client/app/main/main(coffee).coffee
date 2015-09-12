'use strict'
<% if(filters.jade) { %>
    template = require './main.jade'
<% } %><% if(filters.html) { %>
    template = require './main.html'
<% } %>

angular.module '<%= scriptAppName %>'
<% if(filters.ngroute) { %>.config ($routeProvider) ->
  $routeProvider
  .when '/',
    templateUrl: template
    controller: 'MainCtrl'
<% } %><% if(filters.uirouter) { %>.config ($stateProvider) ->
  $stateProvider
  .state 'main',
    url: '/'
    templateUrl: template
    controller: 'MainCtrl'
<% } %>
require './main.controller.coffee'
