(function () {
    const GetRequest = () => {
        var url = location.search; //获取url中"?"符后的字串

        var theRequest = new Object();

        if (url.indexOf("?") != -1) {
            var str = url.substr(1);

            strs = str.split("&");

            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    };
    getDetail({ id: GetRequest().id }).then((res) => {
        let htmlStr = `
        <div class="detail-table-bordered">
        <div class="detail-table-header">
            <div class="detail-table-title">${res.resource.name}</div>
            <div class="collectIcon">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-${res.collected ? "shoucang" : "shoucang1"}"></use>
                </svg>
            </div>
        </div>
        <div class="detail-table-view">
            <table>
                <tbody>
                    <tr class="detail-table-row">
                        <th class="detail-table-item-label" colspan="1">
                            <span>下载热度</span>
                        </th>
                        <td class="detail-table-item-content" colspan="5">
                            <span style="font-weight: 600">${res.resource.hot}</span>
                        </td>
                    </tr>
                    <tr class="detail-table-row">
                        <th class="detail-table-item-label" colspan="1">
                            <span>模板分类</span>
                        </th>
                        <td class="detail-table-item-content" colspan="5">
                        
                            <span>
                                ${res.classification
                                    .map((item) => {
                                        return `<span style="margin-right: 5px; cursor: pointer">${item.name}</span>`;
                                    })
                                    .join(" ")}
                            </span>
                        </td>
                    </tr>
                    <tr class="detail-table-row">
                        <th class="detail-table-item-label" colspan="1">
                            <span>模板颜色</span>
                        </th>
                        <td class="detail-table-item-content" colspan="5">
                            <span>
                                ${res.color
                                    .map((item) => {
                                        return `<span style="margin-right: 5px; cursor: pointer">${item.name}</span>`;
                                    })
                                    .join(" ")}
                            </span>
                        </td>
                    </tr>
                    <tr class="detail-table-row">
                        <th class="detail-table-item-label" colspan="1">
                            <span>模板标签</span>
                        </th>
                        <td class="detail-table-item-content" colspan="5">
                        <span>
                             ${res.tag
                                 .map((item) => {
                                     return `<span style="margin-right: 5px; cursor: pointer">${item.name}</span>`;
                                 })
                                 .join(" ")}
                         </span>
                        </td>
                    </tr>
                    <tr class="detail-table-row">
                        <th class="detail-table-item-label" colspan="1">
                            <span>免责声明</span>
                        </th>
                        <td class="detail-table-item-content" colspan="5">
                            <span
                                >本站不以盈利为目的，所有资源均来自互联网，如有侵权请联系站长删除</span
                            >
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="detail-btn">
        <a
            href="${res.resource.viewUrl}"
            class="layui-btn"
            target="_blank"
            >在线预览</a
        >
        <button type="button" class="layui-btn download">免费下载</button>
        <a
            href="tencent://message/?uin=1352256075&Menu=yes&%20Service=300&sigT=42a1e5347953b64c5ff3980f8a6e644d4b31456cb0b6ac6b27663a3c4dd0f4aa14a543b1716f9d45"
            class="layui-btn"
            target="_blank"
            >运维支持</a
        >
    </div>
    </div> `;
        $(".detail-table").html(htmlStr);
        $(".detail-preview-img").attr("src", res.resource.img);

        $(".collectIcon").click(function () {
            collection({ id: GetRequest().id }).then((res) => {
                this.innerHTML = `<svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-${res.data ? "shoucang" : "shoucang1"}"></use>
                </svg>`;
                if (res.data) {
                    layer.msg("收藏成功！", { icon: 1 });
                } else {
                    layer.msg("取消收藏！", { icon: 15 });
                }
            });
        });
        $(".download").click(function () {
            var xhr = new XMLHttpRequest();
            xhr.open(
                "GET",
                config.url + "/api/static/down?id=" + GetRequest().id + "&token=" + config.loginInfo.token,
                true
            );
            xhr.responseType = "blob";
            xhr.setRequestHeader("token", config.loginInfo.token); // 请求头中的验证信息等（如果有）
            xhr.onload = function (res) {
                if (this.status === 200) {
                    if (this.response.type.indexOf("application/json") != -1) {
                        let reader = new FileReader();
                        reader.addEventListener("loadend", function (e) {
                            let data = JSON.parse(e.target.result);
                            if (data.msg.indexOf("http") != -1) {
                                var a = document.createElement("a");
                                a.href = data.msg;
                                a.target = "_blank";
                                $("body").append(a);
                                a.click();
                                $(a).remove();
                            } else {
                                $.showAlert({ title: "提示", body: data.msg });
                            }
                        });
                        reader.readAsText(xhr.response);
                    } else if (this.response.type.indexOf("application/octet-stream") != -1) {
                        const url = window.URL.createObjectURL(new Blob([this.response]));
                        var a = document.createElement("a");
                        a.download = type + ".zip";
                        a.href = url;
                        a.target = "_blank";
                        $("body").append(a);
                        a.click();
                        $(a).remove();
                        URL.revokeObjectURL(url);
                    }
                }
            };
            xhr.send();
        });
    });
})();
