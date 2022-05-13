function getpicSms() {
    $(".captchaPic").attr("src", config.url + "/api/captcha.jpg");
}

let validate = function (dom, fields) {
    $(dom).data("bootstrapValidator").resetField(fields);
    const is = $(dom).data("bootstrapValidator").validateField(fields).isValidField(fields);
    return is;
};

function getSms(e) {
    if (!validate("#register-form", "email")) return;
    if (!validate("#register-form", "captcha")) return;
    let params = {};
    $("#register-form")
        .serializeArray()
        .forEach((item) => {
            if (item.value) {
                if (item.name == "email") {
                    params.mail = item.value;
                } else if (item.name == "captcha") {
                    params.captcha = item.value;
                }
            }
        });
    sendMailApi(params).then((res) => {
        if (res.code === 0) {
            $("#register-form").data("bootstrapValidator").resetField("email");
            $("#register-form").data("bootstrapValidator").resetField("captcha");
            const nextdom = $(e.target).next();
            $(e.target).hide();
            nextdom.show();
            let s = 30;
            let time = null;
            time = setInterval(() => {
                s--;
                nextdom.text(s + "秒后重新获取");
                if (s === 0) {
                    $(e.target).show();
                    nextdom.hide();
                    clearInterval(time);
                    nextdom.text("30s重新获取");
                }
            }, 1000);
        } else {
            layer.msg(res.msg, { icon: 5, anim: 6 });
            getpicSms();
        }
    });
}
// 获取模板列表
function getTemplateList(obj) {
    let params = {
        classificationId: null,
        colorId: null,
        current: 1,
        name: "",
        size: 20,
        tagId: null,
        ...obj,
    };
    layui.use("laypage", function () {
        var laypage = layui.laypage;
        templatePage(params).then((res) => {
            let htmlStr = "";
            let a = [],
                b = [];
            for (let i = 0; i <= 1000; i++) {
                a.push(2 + 3 * i);
                b.push(4 + 5 * i);
            }
            res.data.records.forEach((item, index) => {
                htmlStr += `
                <article class="col-lg-2 col-md-3 col-sm-3 col-xs-6 col-xxs-12 animate-box article">
                    <figure class='figure'>
                        <a href="single.html?id=${item.id}"><img src="${item.img}" alt="Image" class="img-responsive"></a>
                    </figure>
                    <span class="fh5co-meta"><a href="single.html">Food &amp; Drink</a></span>
                    <h2 class="fh5co-article-title"><a href="single.html">${item.name}</a></h2>
                    <span class="fh5co-meta fh5co-date">March 6th, 2016</span>
                </article>
                `;
                if (a.includes(index)) {
                    htmlStr += '<div class="clearfix visible-sm-block visible-xs-block"></div>';
                } else if (b.includes(index)) {
                    htmlStr += `<div class="clearfix visible-lg-block visible-md-block  visible-xs-block"></div>`;
                }
            });
            $(".fh5co-post-entry").eq(0).html(htmlStr);
            // Animations
            contentWayPoint();
            config.laypage = {
                curr: res.data.current,
                limit: res.data.size,
                count: res.data.total,
            };
            //执行一个laypage实例
            laypage.render({
                elem: "laypage", //注意，这里的 test1 是 ID，不用加 # 号
                layout: ["count", "prev", "page", "next", "limit", "refresh", "skip"],
                ...config.laypage,
                jump: (obj, first) => {
                    if (!first) {
                        getTemplateList({ current: obj.curr, size: obj.limit });
                    }
                },
            });
        });
    });
}

(function () {
    "use strict";
    // 获取更多分类
    function getMoreClassFn() {
        getMoreClass().then((res) => {
            let htmlStr = "";
            config.more.forEach((key) => {
                if (res[key]) {
                    config[key] = [...res[key]];
                    htmlStr += `
					<div class="flex">
					<span class='class-title'>${key == "classification" ? "分类" : key == "color" ? "颜色" : "Tag"}&nbsp;: </span>
					<div style='text-align: justify;'>
						${res[key]
                            .map((item) => {
                                config.classificationId =
                                    !config.classificationId && item.name == "整站" ? item.id : config.classificationId;
                                return `<span class='class-span' data-key='${key}Id' data-id='${item.id}'>${item.name}</span>`;
                            })
                            .join(" ")}
					</div>
					</div>
					`;
                }
            });
            $(".more-class").eq(0).html(htmlStr);
            $(".class-span").each(function (index, item) {
                item.onclick = function () {
                    config.classParams[item.getAttribute("data-key")] = parseInt(item.getAttribute("data-id"));
                    getTemplateList(config.classParams);
                };
            });
        });
    }

    $(".more").click(function () {
        if ($(".more-class")[0].style.display == "none") {
            $(".more-class").addClass("animate__zoomIn");
            $(".more-class").removeClass("animate__zoomOut");
        } else {
            $(".more-class").addClass("animate__zoomOut");
            $(".more-class").removeClass("animate__zoomIn");
        }
        $(".more-class").toggle("fast");
    });
    $(".search_btn").click(function () {
        getTemplateList({ name: $("#searchInput").val() });
    });
    function formValidator(form, cb) {
        $(form)
            .bootstrapValidator({
                message: "This value is not valid",
                feedbackIcons: {
                    valid: "glyphicon glyphicon-ok",
                    invalid: "glyphicon glyphicon-remove",
                    validating: "glyphicon glyphicon-refresh",
                },
                fields: {
                    captcha: {
                        validators: {
                            notEmpty: {
                                message: "图片验证不为空！！！",
                            },
                            regexp: {
                                regexp: /^.{5}$/,
                                message: "请输入5位验证码！！！",
                            },
                        },
                    },
                    email: {
                        validators: {
                            regexp: {
                                regexp: /[1-9]\d{7,10}@qq\.com/,
                                message: "请输入qq邮箱！！！",
                            },
                            notEmpty: {
                                message: "邮箱不能为空！！！",
                            },
                        },
                    },
                    password: {
                        validators: {
                            regexp: {
                                regexp: /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/,
                                message: "密码必须长度为6-20位包含数字和字母",
                            },
                            notEmpty: {
                                message: "密码不为空！！！",
                            },
                        },
                    },
                    code: {
                        validators: {
                            notEmpty: {
                                message: "邮箱验证不为空！！！",
                            },
                        },
                    },
                    setMealId: {
                        validators: {
                            notEmpty: {
                                message: "请选择套餐！！！",
                            },
                        },
                    },
                    payType: {
                        validators: {
                            notEmpty: {
                                message: "请选择支付方式！！！",
                            },
                        },
                    },
                },
            })
            .on("success.form.bv", function (e) {
                // Prevent form submission
                e.preventDefault();
                // Get the form instance
                var $form = $(e.target);
                // Get the BootstrapValidator instance
                var bv = $form.data("bootstrapValidator");
                let params = {};
                $form.serializeArray().forEach((item) => {
                    if (item.name == "email") {
                        params.username = item.value;
                    } else {
                        params[item.name] = item.value;
                    }
                });
                cb && cb(params, $form);
            });
    }

    // Document on load.
    $(document).ready(function () {
        layui.use("element", function () {
            var element = layui.element;
            element.on("nav(headerNav)", function (data) {
                setTimeout(() => {
                    const classificationId = config.classification.filter((item) => item.name == data[0].innerText)[0]
                        .id;
                    config.classParams.classificationId = classificationId;
                    getTemplateList({ classificationId });
                });
            });
            //…
        });

        // 注册验证
        formValidator("#register-form", function (params, $form) {
            delete params.captcha;
            registerApi(params).then((res) => {
                if (res.code == 500) {
                    layer.msg(res.msg, { icon: 5, anim: 6 });
                } else {
                    dialoghide();
                    localStorage.setItem("user", JSON.stringify(res));
                    isLogin();
                }
                $form.data("bootstrapValidator").resetForm();
                $form[0].reset();
            });
        });
        // 登录验证
        formValidator("#login-form", function (params, $form) {
            loginApi(params).then((res) => {
                if (res.code == 500) {
                    layer.msg(res.msg, { icon: 5, anim: 6 });
                } else {
                    dialoghide();
                    layer.msg("登录成功！", { icon: 1 });
                    localStorage.setItem("user", JSON.stringify(res));
                    isLogin();
                }
                $form.data("bootstrapValidator").resetForm();
                $form[0].reset();
            });
        });
        // 充值验证
        formValidator("#topUp-form", function (params, $form) {
            createOrderApi(params).then((res) => {
                if (res.code == 0) {
                    layer.open({
                        type: 2,
                        area: ["500px", "300px"],
                        content: res.msg,
                    });
                }
                $form.data("bootstrapValidator").resetForm();
                $form[0].reset();
            });
        });
        setMealApi().then((res) => {
            $("#meal-select").html(
                `<option value="">-- 未选择套餐 --</option>${res.data
                    .map((item) => `<option value='${item.id}'>${item.remark}</option>`)
                    .join(" ")}`
            );
        });
    });
    function laynav() {
        if ($("body").width() > 1200) {
            $("#layui-nav").css("display", "block");
            $("#layui-nav").removeClass("layui-nav-side layui-nav-tree");
        } else {
            $("#layui-nav").css("display", "none");

            $("#layui-nav").addClass("layui-nav-side layui-nav-tree");
        }
    }
    $(".collection").click(function () {
        getTemplateList({ collection: true });
    });
    window.addEventListener("resize", laynav);
    $(function () {
        laynav();
        getTemplateList();
        getMoreClassFn();
    });
})();
