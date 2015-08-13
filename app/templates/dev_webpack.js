var ExtractTextPlugin = require("extract-text-webpack-plugin");
var baseDir ="./client";
module.exports =
{
  context: baseDir,
  module: {
    loaders: [
      {
        test: /\.<%= styleExt %>$/,
        loader: 'style!css!<%= styleEngine %>'
      },
      <%if(filters.coffee){%>
      //TODO - Add babel support?
      {
        test: /\.coffee$/,
        loader: 'coffee'
      },
      <% } %>
      <% if(filters.jade){%>
      {
        test: /\.jade$/,
        loader: 'ngtemplate?relativeTo=' + baseDir + '!jade-html'
      },
      <% } %>
      <% if(filters.html){%>
        {
          test: /\.html$/,
          loader: 'ngtemplate?relativeTo=' + baseDir + '!html',
          exclude: /index\.html/
        },
      <% } %>
    ],
  },
  entry: {
    app: entry,
  },
  output: {
    filename: 'bundle.js'
  },
  devServer: {

  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};
