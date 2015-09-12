var ExtractTextPlugin = require("extract-text-webpack-plugin");
var html = new ExtractTextPlugin("index.html")
var baseDir = __dirname + "/client/";
module.exports =
{
  assets: baseDir +'/assets/**/*',
  context: baseDir,
  resolve: {
    alias: {
      'index.html': baseDir + "/index.html"
    }
  },
  module: {
    loaders: [
      {
        test: /index\.html$/,
        loader: html.extract('raw','html')
      },
      {
        test: /\.png|jpg|jpeg|ico|bmp$/,
        loader: "url-loader?limit=100"
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)/,
        loader: "url-loader?limit=100"
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css!sass'
      },<% if(filters.jade){ %>
      {
        test: /\.jade$/,
          loader: 'ngtemplate?relativeTo=' + baseDir + '!jade-html'
      },<% } %><% if(filters.html){ %>
      {
        test: /\.html$/,
          loader: 'ngtemplate?relativeTo=' + baseDir + '!html',
        exclude: /index\.html/
      },<% } %>
    ],
  },
  entry: <% if(filters.coffee){ %>'./app/app.coffee'<% } %><% if(filters.js){ %>'./app/app.js'<% } %>,
  output: {
    path: "./dist",
    publicPath: "",
    filename: 'bundle.js'
  },
  plugins: [html]
};
