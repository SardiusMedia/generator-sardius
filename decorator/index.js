'use strict';
var yeoman = require('yeoman-generator');

var Generator = yeoman.generators.Base.extend({
  compose: function() {
    this.composeWith('ng-webpack:decorator', {arguments: this.arguments}, { local: require.resolve('generator-ng-webpack/decorator') });
  }
});

module.exports = Generator;
