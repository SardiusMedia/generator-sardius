var ExtractTextPlugin = require("extract-text-webpack-plugin");
var baseDir ="./client";
module.exports =
{
  context: baseDir,
  resolve: {
    alias: {
      'index.html': baseDir + "/index.html"
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
    ],
  },
  entry: {
    app: ['../node_modules/webpack/hot/dev-server', <% if(filters.coffee){ %>'./app/app.coffee'<% } %><% if(filters.js){ %>'./app/app.js'<% } %>]
  },
  output: {
    output: {
      path: __dirname+"/dist",
        publicPath: __dirname+"/dist",
        filename: 'bundle.js'
    },
  }
};
