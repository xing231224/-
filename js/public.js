/*
 * @Author: xing 1981193009@qq.com
 * @Date: 2022-05-11 14:24:45
 * @LastEditors: xing 1981193009@qq.com
 * @LastEditTime: 2022-05-12 15:05:43
 * @FilePath: \newdemo - 副本\js\public.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const config = {
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

const service = function (obj) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: config.url + obj.url,
            type: obj.type,
            data: obj.type == "post" ? JSON.stringify(obj.data) : obj.data,
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
const sendMailApi = (data) => service({ url: "/api/sendMail", type: "get", data });

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

var contentWayPoint = function () {
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
var mobileMenuOutsideClick = function () {
    $(document).click(function (e) {
        var container = $("#fh5co-offcanvas, .js-fh5co-close-offcanvas");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ($("#fh5co-offcanvas").hasClass("animated fadeInLeft")) {
                $("#fh5co-offcanvas").addClass("animated fadeOutLeft");
                setTimeout(function () {
                    $("#fh5co-offcanvas").css("display", "none");
                    $("#fh5co-offcanvas").removeClass("animated fadeOutLeft fadeInLeft");
                }, 1000);
                $(".js-fh5co-nav-toggle").removeClass("active");
            }
        }
    });

    $("body").on("click", ".js-fh5co-close-offcanvas", function (event) {
        $("#fh5co-offcanvas").addClass("animated fadeOutLeft");
        setTimeout(function () {
            $("#fh5co-offcanvas").css("display", "none");
            $("#fh5co-offcanvas").removeClass("animated fadeOutLeft fadeInLeft");
        }, 1000);
        $(".js-fh5co-nav-toggle").removeClass("active");

        event.preventDefault();
    });
};

// Burger Menu
var burgerMenu = function () {
    $("body").on("click", ".js-fh5co-nav-toggle", function (event) {
        var $this = $(this);

        $("#fh5co-offcanvas").css("display", "block");
        setTimeout(function () {
            $("#fh5co-offcanvas").addClass("animated fadeInLeft");
        }, 100);

        // $('body').toggleClass('fh5co-overflow offcanvas-visible');
        $this.toggleClass("active");
        event.preventDefault();
    });
};

var scrolledWindow = function () {
    $(window).scroll(function () {
        var header = $("#fh5co-header"),
            scrlTop = $(this).scrollTop();

        $("#fh5co-home .flexslider .fh5co-overlay").css({
            opacity: 0.5 + scrlTop / 2000,
        });

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
var clickMenu = function () {
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
function isLogin() {
    if (localStorage.getItem("user")) {
        config.isLogin = true;
        config.loginInfo = JSON.parse(localStorage.getItem("user"));
        const info = JSON.parse(localStorage.getItem("user")).userInfo;
        $(".login-btn").hide();
        console.log(info);
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
                <h2 style='margin-bottom:20px;'>到期时间:${info.openTime}</h2>
                <p>可下载次数：${info.downTimes}</p>
                <button type="button" id="login" class="layui-btn layui-btn-primary" onclick='loginOut()'>退出登录</button>
            </div>
        `);
    } else {
        config.isLogin = false;
    }
}
function loginOut() {
    logoutApi({ token: config.loginInfo.token }).then((res) => {
        console.log(res);
    });
}

$(function () {
    mobileMenuOutsideClick();
    burgerMenu();
    scrolledWindow();
    contentWayPoint();
    isLogin();
});
