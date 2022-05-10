(function () {
    "use strict";

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

    // 获取更多分类
    function getMoreClassFn() {
        getMoreClass().then((res) => {
            let htmlStr = "";
            config.more.forEach((key) => {
                if (res[key]) {
                    htmlStr += `
					<div class="flex">
					<span class='class-title'>${key == "classification" ? "分类" : key == "color" ? "颜色" : "Tag"}&nbsp;: </span>
					<div>
						${res[key]
                            .map((item) => {
                                return `<span class='class-span'>${item.name}</span>`;
                            })
                            .join(" ")}
					</div>
					</div>
					`;
                }
            });
            $(".more-class").eq(0).html(htmlStr);
        });
    }

    // 获取模板列表
    function getTemplateList() {
        let obj = {
            classificationId: null,
            colorId: null,
            current: 1,
            name: "",
            size: 20,
            tagId: null,
        };
        templatePage(obj).then((res) => {
            let htmlStr = "";
            let a = [],
                b = [];
            for (let i = 0; i <= 1000; i++) {
                a.push(2 + 5 * i);
                b.push(4 + 5 * i);
            }
            res.data.records.forEach((item, index) => {
                htmlStr += `
				<article class="col-lg-2 col-md-3 col-sm-3 col-xs-6 col-xxs-12 animate-box">
					<figure>
						<a href="single.html"><img src="${item.img}" alt="Image" class="img-responsive"></a>
					</figure>
					<span class="fh5co-meta"><a href="single.html">Food &amp; Drink</a></span>
					<h2 class="fh5co-article-title"><a href="single.html">${item.name}</a></h2>
					<span class="fh5co-meta fh5co-date">March 6th, 2016</span>
				</article>
				`;
                if (a.includes(index)) {
                    htmlStr += '<div class="clearfix visible-xs-block"></div>';
                } else if (b.includes(index)) {
                    htmlStr += `<div class="clearfix visible-lg-block visible-md-block visible-sm-block visible-xs-block"></div>`;
                }
            });
            $(".fh5co-post-entry").eq(0).html(htmlStr);
              // Animations
            contentWayPoint();
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

    // Document on load.

    $(function () {
        getTemplateList();
        mobileMenuOutsideClick();
        burgerMenu();
        scrolledWindow();
        getMoreClassFn();
      
    });
})();
