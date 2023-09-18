// 

const prod = process.env.NODE_ENV === "production";
const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
 
module.exports = {
   mode: prod ? "production" : "development",
   entry: {
      app:"__ROOT_FILE__",
   },
   output: {
      path: __dirname + "/dist/",  //build directory
      publicPath: '/',
      filename: '[name].js?[hash]',
   },
   module: {
      rules: [
         {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            resolve: {
               extensions: [".ts", ".tsx", ".js" , ".jsx", ".json"],
               mainFields: [ 'main' , 'module' ],
            },
            exclude: /node_modules/,
            use: [
               {
                  loader: 'ts-loader',
                  options: {
                     transpileOnly: true,
                  },
               },
               {
                  loader: 'babel-loader',
                  options: {
                     presets: ['@babel/preset-env',["@babel/preset-react", {"runtime": "automatic"}] , "@babel/preset-typescript"],
                  },
               },
            ],
         },
         {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
         },
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            resolve: {
               extensions: [ ".js" , ".jsx",".ts" , ".tsx", ".json"],
               mainFields: [ 'main' , 'module' ],
            },
            use: {
            loader: 'babel-loader',
            options: {
               presets: ['@babel/preset-env',["@babel/preset-react", {"runtime": "automatic"}]]
            }
            }
         },
         {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            issuer: /\.[jt]sx?$/,
            use: [ '@svgr/webpack', 'url-loader'],
         },
         {
            test: /\.(?!js$|jsx$|css$|scss$|ts$|tsx$|html$|svg$)[a-zA-Z0-9]{2,4}$/i,
            type: 'asset/resource',
         },
      ]
   },
   devtool: prod ? undefined : "source-map",
   plugins: [
      new HtmlWebpackPlugin({
         template:'./public/index.html',
         inject:false,
      }),
      new MiniCssExtractPlugin(),
      new CopyWebpackPlugin({
         patterns:[
            {
               from:'./public',
               globOptions:{
                  ignore: ["**/index.html"]
               }
            }
         ]
      }),
   ],
   devServer: {
      open: true,
      historyApiFallback: true,
      static: {
         directory: path.join(__dirname, '/')
      },
      
   }
}; 