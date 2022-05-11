/*
 * @Author: xing 1981193009@qq.com
 * @Date: 2022-05-11 12:06:32
 * @LastEditors: xing 1981193009@qq.com
 * @LastEditTime: 2022-05-11 12:09:15
 * @FilePath: \newdemo\webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require("path");
const glob = require('glob');
console.log( glob.sync('./js/*.js'));
module.exports = {
    entry: glob.sync('./js/*.js'), //ݗف js෈կ
    output: {
        path: path.join(__dirname, "dist"), //ݗڊ js෈կಅࣁጱ෈կ४ ᕷ੒᪠ஆ
        filename: "index.js", //ݗڊ js෈կ᪠ஆ
    },
};
