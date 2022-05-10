/*
 * @Author: your name
 * @Date: 2022-05-09 20:32:32
 * @LastEditTime: 2022-05-10 14:46:53
 * @LastEditors: xing 1981193009@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \demo\js\api.js
 */

const config = {
    url: "http://svip.aeert.com:18081/",
    more: ["classification", "color", "tag"],
};

const service = function (obj) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: config.url + obj.url,
            type: obj.type,
            data: JSON.stringify(obj.data),
            contentType: "application/json;charset=UTF-8",
            success: function (msg) {
                resolve(msg);
            },
            error: function (error) {
                reject(error);
            },
        });
    });
};
// 获取更多分类条件搜索
const getMoreClass = () => service({ url: "/api/static/base", type: "get" });
// 收藏
const collection = () => service({ url: "/api/static/collection", type: "get" });
// 获取模板详情
const getDetail = () => service({ url: "/api/static/detail", type: "get" });
// 下载模板
const downTemplate = () => service({ url: "/api/static/down", type: "get" });
// 获取模板列表
const templatePage = (data) => service({ url: "/api/static/page", type: "post", data });
