'use strict';
var yeoman = require('yeoman-generator');

var Generator = yeoman.generators.Base.extend({
  compose: function() {
    this.composeWith('ng-webpack:factory', {arguments: this.arguments}, { local: require.resolve('generator-ng-webpack/factory') });
  }
});

module.exports = Generator;
