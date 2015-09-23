'use strict';
var yeoman = require('yeoman-generator');

var Generator = yeoman.generators.Base.extend({
  compose: function() {
    this.composeWith('ng-webpack:controller', {arguments: this.arguments}, { local: require.resolve('generator-ng-webpack/controller') });
  }
});

module.exports = Generator;
