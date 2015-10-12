var ExtractTextPlugin = require("extract-text-webpack-plugin");
var baseDir = __dirname + "/client";
var index = baseDir + "/index.html";
module.exports =
{
  context: baseDir,
  resolve: {
    modulesDirectories: [
      'node_modules',
      baseDir + '/bower_components'
    ],
    alias: {
      'index.html': index
    }
  },
  module: {
    loaders: [
      {
        test: /\.<%= styleExt %>$/,
        loader: 'style!css!<%= styleEngine %>'
      },<%if(filters.coffee){%>
      //TODO - Add babel support?
      {
        test: /\.coffee$/,
        loader: 'coffee'
      },<% } %><% if(filters.jade){%>
      {
        test: /\.jade$/,
        loader: 'ngtemplate?relativeTo=' + baseDir + '!jade-html'
      },<% } %><% if(filters.html){%>
      {
        test: /\.html$/,
        loader: 'ngtemplate?relativeTo=' + baseDir + '!html',
        exclude: /index\.html/
      },<% } %>
      {
        test: /index\.html$/,
        loader: 'html',
      }
    ],
  },
  entry: {
    app: ['../node_modules/webpack/hot/dev-server', <% if(filters.coffee){ %>baseDir + '/app/app.coffee'<% } %><% if(filters.js){ %>baseDir + '/app/app.js'<% } %>]
  },
  output: {
    path: __dirname+"/dist",
    publicPath: __dirname+"/dist",
    filename: 'bundle.js'
   },
   plugins: []
};
