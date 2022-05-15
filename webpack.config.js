/*
 * @Author: xing 1981193009@qq.com
 * @Date: 2022-05-11 12:06:32
 * @LastEditors: xing 1981193009@qq.com
 * @LastEditTime: 2022-05-14 21:01:53
 * @FilePath: \newdemo\webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
    // mode: "production",
    entry: {
        public: "./js/public.js",
        home: "./js/home.js",
        single: "./js/single.js",
    }, //ݗف js෈կ
    output: {
        path: path.join(__dirname, "dist"), //ݗڊ js෈կಅࣁጱ෈կ४ ᕷ੒᪠ஆ
        filename: "static/js/[name].min.js", //ݗڊ js෈կ᪠ஆ
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            filename: "index.html", // 通过chunk来指定引入哪些JS文件
            chunks:['public','home'],
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
        }),
        new HtmlWebpackPlugin({
            template: "single.html",
            filename: "single.html", // 通过chunk来指定引入哪些JS文件
            chunks: ["public", "single"],
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'static'), //从哪个文件夹开始复制
                to: path.join(__dirname, "dist", "static"), //复制到那个文件夹
            },
        ]),
    ],
    module: {
        rules: [
            {
                test: /\.css$/, // 正则表达式，表示.css后缀的文件
                use: ["style-loader", "css-loader"], // 针对css文件使用的loader，注意有先后顺序，数组项越靠后越先执行
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/, // ॒ቘᬯԶᕮੲጱ෈կ
                use: "url-loader",
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
            },
        ],
    },
    devServer: { //对webpack-dev-server的一些配置
        port: 5500, // 可以修改端口号，默认为8080
        open: true, // 自动使用默认浏览器打开
    }
};
