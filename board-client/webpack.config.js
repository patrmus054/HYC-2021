const {
  resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: resolve(__dirname, "dist/"),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
    devServer: {
        contentBase: resolve(__dirname, "dist/"),
    },
    plugins: [
        // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
    ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env',
              {
                'plugins': ['@babel/plugin-proposal-class-properties']
              }
            ]
          }
        }
      },
      {
        test: /.(css)$/i,
        use: [{
            loader: 'style-loader', // inject CSS to page
        }, {
            loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
            loader: 'postcss-loader', // Run postcss actions
            options: {
                plugins: function () { // postcss plugins, can be exported to postcss.config.js
                    return [
                        require('autoprefixer')
                    ];
                }
            }
        }],
    }
    ]
  }
};
