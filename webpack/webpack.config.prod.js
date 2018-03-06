const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = (env) => {
  const plugins = [
    new ExtractTextPlugin('styles.css'),
    new webpack.DllReferencePlugin({
      manifest: require('./modules-manifest.json')
    })
  ]

  if (env.NODE_ENV == "production") {
    plugins.push(
      new CleanWebpackPlugin(
        ['dist'], {
          root: path.join(__dirname, '../')
        })
    )
  }

  return {
    entry: {
      index: path.join(__dirname, '../', './src/js', 'index.js'),
      home: path.join(__dirname, '../', './src/js', 'home.js')
    },
    output: {
      filename: 'bundle.[name].[hash].js',
      path: path.join(__dirname, '../', 'dist'),
      publicPath: path.join(__dirname, '../', 'dist', "/"),
      chunkFilename: 'js/[id].[chunkhash].[ext]'
    },
    module: {
      // Loaders
      rules: [{
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: 'css-loader',
            options: {
              module: true,
              importLoader: 1
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              noIeCompat: true,
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader", {
              loader: "stylus-loader",
              options: {
                use: [
                  require('nib'),
                  require('rupture')
                ],
                // Estas importaciones nos permitirán usar configuraciones de css que funcionen en todos los navegadores
                // ~ Es el para acceder a node_modules
                import: [
                  '~nib/lib/nib/index.styl',
                  '~rupture/rupture/index.styl'
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(jpg|png|gif|ttf)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 2 * 1024 * 1000
          }
        }
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['es2016', 'react'],
            plugins: ['syntax-dynamic-import']
          }
        }
      }
      ]
    },
    plugins: plugins
  }
}