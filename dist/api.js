/*
 * @Author: xing 1981193009@qq.com
 * @Date: 2022-05-11 12:42:48
 * @LastEditors: xing 1981193009@qq.com
 * @LastEditTime: 2022-05-11 15:28:32
 * @FilePath: \newdemo - 副本\dist\api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
// 获取图片验证码
const captchaApi = () => service({ url: "/api/captcha.jpg", type: "get" });
// 登录
const loginApi = (data) => service({ url: "/api/login", type: "post", data });
// 退出
const logoutApi = (data) => service({ url: "/api/logout", type: "post", data });
// 注册
const registerApi = (data) => service({ url: "/api/register", type: "post", data });
// 发送邮件
const sendMailApi = (data) => service({ url: "/api/sendMail", type: "get" });

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