/*
 * @Author: xing 1981193009@qq.com
 * @Date: 2022-05-11 14:24:45
 * @LastEditors: xing 1981193009@qq.com
 * @LastEditTime: 2022-05-15 20:43:03
 * @FilePath: \newdemo - 副本\js\public.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import "../css/animate.css";
import "../css/bootstrap.css";
import "../css/bootstrapValidator.min.css";
import "../css/icomoon.css";
import "../css/index.css";
import "../css/style.css";
require("../fonts/iconfont");

window.config = {
    url: "http://svip.aeert.com:18081",
    more: ["classification", "color", "tag"],
    classification: [],
    color: [],
    tag: [],
    classParams: {},
    laypage: {
        curr: 1,
        limit: 20,
    },
    isLogin: false,
    loginInfo: {},
};

window.service = function (obj) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: config.url + obj.url,
            type: obj.type,
            data: obj.type == "post" ? JSON.stringify(obj.data) : obj.data,
            headers: { token: config.loginInfo.token ? config.loginInfo.token : "" },
            contentType: "application/json;charset=UTF-8",
            success: function (msg) {
                if (msg.msg === "token失效，请重新登录") {
                    layer.msg(msg.msg, { icon: 5, anim: 6 });
                    localStorage.removeItem("user");
                    isLogin();
                }
                if(msg.code == 500){
                    layer.msg(msg.msg, { icon: 5, anim: 6 });
                }
                resolve(msg);
            },
            error: function (a, b, c) {
                layer.msg(b, { icon: 5, anim: 6, offset: "100px" });
                reject(a.statusText);
            },
        });
    });
};
window.GetRequest = () => {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
};
// 获取用户信息
window.userInfoApi = () => service({ url: "/api/userInfo", type: "get" });
// 获取套餐
window.setMealApi = () => service({ url: "/api/order/setMeal", type: "get" });
// 下载模板
window.downApi = (data) => service({ url: "/api/static/down", type: "get", data });
// 创建订单
window.createOrderApi = (data) => service({ url: "/api/order/create", type: "post", data });
// 获取图片验证码
window.captchaApi = () => service({ url: "/api/captcha.jpg", type: "get" });
// 登录
window.loginApi = (data) => service({ url: "/api/login", type: "post", data });
// 退出
window.logoutApi = () => service({ url: "/api/logout", type: "post" });
// 注册
window.registerApi = (data) => service({ url: "/api/register", type: "post", data });
// 发送邮件
window.sendMailApi = (data) => service({ url: "/api/sendMail", type: "get", data });

// 获取更多分类条件搜索
window.getMoreClass = () => service({ url: "/api/static/base", type: "get" });
// 收藏
window.collection = (data) => service({ url: "/api/static/collection", type: "get", data });
// 获取模板详情
window.getDetail = (data) => service({ url: "/api/static/detail", type: "get", data });
// 下载模板
window.downTemplate = () => service({ url: "/api/static/down", type: "get" });
// 获取模板列表
window.templatePage = (data) => service({ url: "/api/static/page", type: "post", data });

window.contentWayPoint = function () {
    var i = 0;
    $(".animate-box").waypoint(
        function (direction) {
            if (direction === "down" && !$(this.element).hasClass("animated")) {
                i++;

                $(this.element).addClass("item-animate");
                setTimeout(function () {
                    $("body .animate-box.item-animate").each(function (k) {
                        var el = $(this);
                        setTimeout(
                            function () {
                                el.addClass("fadeInUp animated");
                                el.removeClass("item-animate");
                            },
                            k * 200,
                            "easeInOutExpo"
                        );
                    });
                }, 100);
            }
        },
        { offset: "85%" }
    );
};

// iPad and iPod detection
var isiPad = function () {
    return navigator.platform.indexOf("iPad") != -1;
};

var isiPhone = function () {
    return navigator.platform.indexOf("<i></i>Phone") != -1 || navigator.platform.indexOf("iPod") != -1;
};

// Click outside of offcanvass
window.mobileMenuOutsideClick = function () {
    $(document).click(function (e) {
        var container = $("#fh5co-offcanvas, .js-fh5co-close-offcanvas");
        if (
            !container.is(e.target) &&
            container.has(e.target).length === 0 &&
            $("#fh5co-dialog").css("display") == "none"
        ) {
            if ($("#fh5co-offcanvas").hasClass("animated fadeInRight")) {
                $("#fh5co-offcanvas").addClass("animated fadeOutRight");
                setTimeout(function () {
                    $("#fh5co-offcanvas").css("display", "none");
                    $("#fh5co-offcanvas").removeClass("animated fadeOutRight fadeInRight");
                }, 1000);
                $(".js-fh5co-nav-toggle").removeClass("active");
            }
        }
        if (
            $("#layui-nav").hasClass("animated fadeInLeft") &&
            $("#layui-nav").css("display") == "block" &&
            $("body").width() < 1200
        ) {
            $("#layui-nav").addClass("animated fadeOutLeft");
            setTimeout(function () {
                $("#layui-nav").css("display", "none");
                $("#layui-nav").removeClass("animated fadeOutLeft fadeInLeft");
            }, 1000);
            // $(".js-fh5co-nav-toggle").removeClass("active");
        }
    });

    $("body").on("click", ".js-fh5co-close-offcanvas", function (event) {
        $("#fh5co-offcanvas").addClass("animated fadeOutRight");
        setTimeout(function () {
            $("#fh5co-offcanvas").css("display", "none");
            $("#fh5co-offcanvas").removeClass("animated fadeOutRight fadeInRight");
        }, 1000);
        $(".js-fh5co-nav-toggle").removeClass("active");

        event.preventDefault();
    });

    $(".js-lay-nav").click(function () {
        $("#layui-nav").addClass("animated fadeInLeft");
        setTimeout(function () {
            $("#layui-nav").css("display", "block");
        }, 100);
    });
};

// Burger Menu
window.burgerMenu = function () {
    $("body").on("click", ".js-fh5co-nav-toggle", function (event) {
        var $this = $(this);
        $("#fh5co-offcanvas").css("display", "block");
        setTimeout(function () {
            $("#fh5co-offcanvas").addClass("animated fadeInRight");
        }, 100);

        // $('body').toggleClass('fh5co-overflow offcanvas-visible');
        $this.toggleClass("active");
        event.preventDefault();
    });
};

window.scrolledWindow = function () {
    $(window).scroll(function () {
        var header = $("#fh5co-header"),
            scrlTop = $(this).scrollTop();
        $("#fh5co-home .flexslider .fh5co-overlay").css({
            opacity: 0.5 + scrlTop / 2000,
        });
        if (scrlTop > 120) {
            header.addClass("header-top");
        } else {
            header.removeClass("header-top");
        }
        if ($("body").hasClass("offcanvas-visible")) {
            $("body").removeClass("offcanvas-visible");
            $(".js-fh5co-nav-toggle").removeClass("active");
        }
    });

    $(window).resize(function () {
        if ($("body").hasClass("offcanvas-visible")) {
            $("body").removeClass("offcanvas-visible");
            $(".js-fh5co-nav-toggle").removeClass("active");
        }
    });
};

// Page Nav
window.clickMenu = function () {
    var topVal = $(window).width() < 769 ? 0 : 58;

    $(window).resize(function () {
        topVal = $(window).width() < 769 ? 0 : 58;
    });

    if ($(this).attr("href") != "#") {
        $('#fh5co-main-nav a:not([class="external"]), #fh5co-offcanvas a:not([class="external"])').click(function (
            event
        ) {
            var section = $(this).data("nav-section");

            if ($('div[data-section="' + section + '"]').length) {
                $("html, body").animate(
                    {
                        scrollTop: $('div[data-section="' + section + '"]').offset().top - topVal,
                    },
                    500
                );
            }
            event.preventDefault();
        });
    }
};
window.isLogin = function () {
    if (localStorage.getItem("user")) {
        config.isLogin = true;
        config.loginInfo = JSON.parse(localStorage.getItem("user"));
        const info = JSON.parse(localStorage.getItem("user")).userInfo;
        $(".login-btn").hide();
        $(".collection").show();
        $(".username").show().html(`
        <img src="${info.qqImg}" class="layui-nav-img" />
        <span>${info.username}</span>
        <i class="layui-icon layui-icon-down layui-nav-more"></i>
        `);
        $("#fh5co-offcanvas").html(`
        <a href="#" class="fh5co-close-offcanvas js-fh5co-close-offcanvas"><span><i class="icon-cross3"></i> <span>Close</span></span></a>
            <div class="fh5co-bio" style="width: 100%">
                <figure>
                    <img
                        src="${info.qqImg}"
                        alt="Free HTML5 Bootstrap Template"
                        id="userImg"
                        class="img-responsive"
                    />
                </figure>
                <h3 class="heading">${info.username}</h3>
                <div style='margin-bottom: 20px;'> 
                <span>剩余下载次数：${info.downTimes}</span>
                <button type="button" style='margin-left: 20px;' class="layui-btn layui-btn-sm layui-btn-primary" onclick='topUp()'>充值</button>
                </div>
                
                <p style='margin-bottom:20px;font-size: 20px;'>会员有效期至:${info.openTime}</p>
                <ul class="fh5co-social">
				<li><a href="#"><i class="icon-twitter"></i></a></li>
				<li><a href="#"><i class="icon-facebook"></i></a></li>
				<li><a href="#"><i class="icon-instagram"></i></a></li>
			    </ul>
                <div class='loginOut'><button type="button" class="layui-btn layui-btn-primary" onclick='loginOut()'>退出登录</button></div>
            </div>
        `);
    } else {
        config.isLogin = false;
        $(".username").hide();
        $(".login-btn").show();
        $(".collection").hide();
        $(".js-fh5co-close-offcanvas").click();
    }
};
window.loginOut = function () {
    logoutApi({ token: config.loginInfo.token }).then((res) => {
        localStorage.removeItem("user");
        isLogin();
    });
};
window.topUp = function () {
    $("body").attr("style", "overflow:hidden");
    $(".dialog-title").eq(0).text("充值");
    $("#fh5co-dialog").show();
    $("#topUp-form").show();
    $("#register-form").hide();
    $("#login-form").hide();
};

$(function () {
    mobileMenuOutsideClick();
    burgerMenu();
    scrolledWindow();
    contentWayPoint();
    isLogin();
});
