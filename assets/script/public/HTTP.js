var URL = "https://192.168.1.143:3103";

cc.VERSION = 20181022;
var HTTP = cc.Class({
    extends: cc.Component,

    statics: {
        sessionId: 0,
        url: URL,
        sendRequest: function (path, data, handler, extraUrl, errorHandler) {
            // cc.vv.uitools.ShowLoading();
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.timeout = 5000;
            var str = "?";
            for (var k in data) {
                if (str != "?") {
                    str += "&";
                }
                str += k + "=" + data[k];
            }
            if (extraUrl == null) {
                extraUrl = HTTP.url;
                str += "&port=9000";
            }
            var requestURL = extraUrl + path + encodeURI(str);
            //console.log("RequestURL:" + requestURL);
            xhr.open("GET", requestURL, true);
            if (cc.sys.isNative) {
                xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                    // cc.vv.uitools.ClearLoading();
                    //console.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
                    try {
                        var ret = JSON.parse(xhr.responseText);
                        if (handler !== null) {
                            handler(ret);
                        }
                    } catch (e) {
                    }
                } else {
                    //console.log("http xhr.status "+xhr.status);
                    if (xhr.status != 200) {
                        if (errorHandler != null && errorHandler != undefined) {
                            errorHandler();
                        }
                    }
                }
            };
            xhr.send();
            return xhr;
        },

    },
});