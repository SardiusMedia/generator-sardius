'use strict';
<% if(filters.jade){ %>
var template = require('./main.jade');<% } %><% if(filters.html) { %>
var template = require('./main.html');<% } %>

angular.module('<%= scriptAppName %>')
  <% if(filters.ngroute) { %>.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: template,
        controller: 'MainCtrl'
      });
  });<% } %><% if(filters.uirouter) { %>.config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: template,
        controller: 'MainCtrl'
      });
  });<% } %>
require('./main.controller.js');
require('../../components/navbar/navbar.controller');
