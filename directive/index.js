'use strict';
var yeoman = require('yeoman-generator');

var Generator = yeoman.generators.Base.extend({
  compose: function() {
    this.composeWith('ng-webpack:directive', {arguments: this.arguments}, { local: require.resolve('generator-ng-webpack/directive') });
  }
});

module.exports = Generator;
