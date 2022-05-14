/*
 * @Author: xing 1981193009@qq.com
 * @Date: 2022-05-11 12:06:32
 * @LastEditors: xing 1981193009@qq.com
 * @LastEditTime: 2022-05-13 20:26:32
 * @FilePath: \newdemo\webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode:"production",
    entry: {
        home:'./js/home.js',
        single:'./js/single.js',
        public:'./js/public.js'
    }, //ݗف js෈կ
    output: {
        path: path.join(__dirname, "dist"), //ݗڊ js෈կಅࣁጱ෈կ४ ᕷ੒᪠ஆ
        filename: "[name].min.js", //ݗڊ js෈կ᪠ஆ
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            filename: "index.html", // 通过chunk来指定引入哪些JS文件
            chunk: ["home", "public"],
        }),
        new HtmlWebpackPlugin({
            template: "single.html",
            filename: "single.html", // 通过chunk来指定引入哪些JS文件
            chunk: ["single", "public"],
        }),
    ],
};
