'use strict';
var yeoman = require('yeoman-generator');

var Generator = yeoman.generators.Base.extend({
  compose: function() {
    this.composeWith('ng-webpack:route', {arguments: this.arguments}, { local: require.resolve('generator-ng-component/route') });
  }
});

module.exports = Generator;
