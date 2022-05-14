/*
 * @Author: xing 1981193009@qq.com
 * @Date: 2022-05-11 12:06:32
 * @LastEditors: xing 1981193009@qq.com
 * @LastEditTime: 2022-05-14 18:03:05
 * @FilePath: \newdemo\webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
module.exports = {
    mode: "production",
    entry: {
        public: "./js/public.js",
        home: "./js/home.js",
        single: "./js/single.js",
    }, //ݗف js෈կ
    output: {
        path: path.join(__dirname, "dist"), //ݗڊ js෈կಅࣁጱ෈կ४ ᕷ੒᪠ஆ
        filename: "js/[name].min.js", //ݗڊ js෈կ᪠ஆ
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            filename: "index.html", // 通过chunk来指定引入哪些JS文件
            minify: {
                collapseBooleanAttributes: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                removeCommentsFromCDATA: true,
            },
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery",
        }),
        // new HtmlWebpackPlugin({
        //     template: "single.html",
        //     filename: "single.html", // 通过chunk来指定引入哪些JS文件
        //     chunk: ["single", "public"],
        // }),
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
};
