const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
   entry: './src/index.js',
   output: {
      path: path.join(__dirname, '/build'),
      filename: 'app.js',
       publicPath: '/'
   },
   devtool: 'inline-source-map',
   devServer: {
    historyApiFallback: true,
    contentBase: './',
    inline: true,
    host: '0.0.0.0',
    port: process.env.PORT || 5600,
    compress: true,
    disableHostCheck: true,
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['@babel/preset-env', '@babel/preset-react']
            }
         },
         {
            test: /\.css$/,
            exclude: /node_modules/,
            loaders: ['style-loader', 'css-loader'],
           },
           
          
           {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  query: {
                    name:'assets/[name].[ext]'
                  },
/*tro den thu muc */
outputPath: './public/img',
                }
              },
              {
                loader: 'image-webpack-loader',
                options: {
                  query: {
                    mozjpeg: {
                      progressive: true,
                    },
                    gifsicle: {
                      interlaced: true,
                    },
                    optipng: {
                      optimizationLevel: 7,
                    }
                  }
                }
              }]
          },
          {
            test: /\.scss$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        minimize: true,
                        sourceMap: true
                    }
                },
                {
                    loader: "sass-loader"
                }
            ]
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: ["babel-loader", "eslint-loader"]
        },
       
        {
            test: /\.(woff|ttf|otf|eot|woff2|svg)$/i,
            loader: "file-loader"
        }
      ]
   },
   plugins:[
    new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
         template: './public/index.html'
      }),
 /*/save publick to dist
    new CopyPlugin({
        patterns: [
          { from: './public/img', to: './public/img' },
         
        ],
      }),*/
   ]
}