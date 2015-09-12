'use strict';
var yeoman = require('yeoman-generator');

var Generator = yeoman.generators.Base.extend({
  compose: function() {
    this.composeWith('ng-webpack:service', {arguments: this.arguments}, { local: require.resolve('generator-ng-component/service') });
  }
});

module.exports = Generator;
