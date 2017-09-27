const webpack = require( 'webpack' );
const path = require( 'path' );
const basePath = '../../';

const config = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve( __dirname, `${basePath}src/scripts/index.js` )
    ]
  },
  output: {
    path: path.resolve( __dirname, `${basePath}public/scripts` ),
    filename: 'app.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [ 'babel-loader' ],
        include: path.join( __dirname, `${basePath}src/scripts` )
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin( {
      'process.env': {
        'NODE_ENV': JSON.stringify( 'production' )
      }
    } ),
    new webpack.optimize.CommonsChunkPlugin( {
      name: 'vendor',
      filename: 'app.vendor.bundle.js'
    } )
  ],

  devtool: 'source-map',
  watch: true
};

module.exports = config;
