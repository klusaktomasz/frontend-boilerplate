const webpack = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const path = require( 'path' );
__dirname = path.resolve( __dirname, '../../' );

const config = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve( __dirname, 'src/scripts/index.js' )
    ]
  },

  devServer: {
    contentBase: path.join( __dirname, 'public' ),
    port: 8080
  },

  output: {
    path: path.resolve( __dirname, 'public/scripts' ),
    filename: 'app.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract( {
          fallback: 'style-loader',
          use: [ 'css-loader', 'sass-loader' ]
        } ),
      }
    ]
  },

  plugins: [
    // scripts
    new webpack.DefinePlugin( {
      'process.env': {
        'NODE_ENV': JSON.stringify( 'production' )
      }
    } ),
    new webpack.optimize.CommonsChunkPlugin( {
      name: 'vendor',
      filename: 'app.vendor.bundle.js'
    } ),

    // styles
    new ExtractTextPlugin( '../styles/app.css' )
  ],
  devtool: 'source-map'
};

module.exports = config;
