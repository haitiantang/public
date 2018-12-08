// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        _bannerAd: null,
        _isShowBannerAd: false,
    },

    showShareMenu: function () {
        var num = cc.vv.utils.random(1,9);
        if (typeof (wx) != "undefined") {
            wx.showShareMenu({
                withShareTicket: true,
                success: function (data) {
                    console.log(data);
                },
                fail: function (data) {
                    console.log(data);
                }
            });

            wx.onShareAppMessage(function () {
                return {
                    title: cc.vv.shareiro[num-1],
                    imageUrl: "https://src.xyx.jby855.cn/jukun/share/"+num+".jpg",
                }
            });
        }
    },

    shareAppMessage: function () {
        var num = cc.vv.utils.random(1,9);
        if (typeof (wx) != "undefined") {
            wx.shareAppMessage({
                title: cc.vv.shareiro[num-1],
                imageUrl:  "https://src.xyx.jby855.cn/jukun/share/"+num+".jpg",
                success: function (data) {
                    console.log(data);
                },
                fail: function (data) {
                    console.log(data);
                }
            });
        }
    },

    /**
     * 设置系统剪贴板的内容
     */
    setClipboardData: function (content, onSuccess) {
        if (typeof (wx) != "undefined") {
            wx.setClipboardData({
                data: content,
                success: function () {
                    if (onSuccess) {
                        onSuccess();
                    }
                },
                fail: function () {

                },
                complete: function () {

                }
            });
        }
    },

    /**
    * 打开同一公众号下关联的另一个小程序
    */
    navigateToMiniProgram: function (appId) {
        console.log(appId);

        if (typeof (wx) != "undefined") {
            wx.navigateToMiniProgram({
                appId: appId,
                path: null,
                extraData: null,
                success: function () {
                    console.log("success");
                },
                fail: function () {
                    console.log("fail");
                },
                complete: function () {
                    console.log("complete");
                },
            });
        }
    },
    
    /**
    * 微信banner广告
    */
    createBannerAd: function () {
        var self = this;

        if (typeof (wx) != "undefined") {
            if (wx.getSystemInfoSync().SDKVersion >= "2.0.4") {
                if (self._bannerAd) {
                    self._bannerAd.destroy();
                }

                self._isShowBannerAd = true;

                let { screenWidth, screenHeight } = wx.getSystemInfoSync();
                var top = screenHeight;

                if (cc.vv.uiutils.isIphoneX()) {
                    top -= 50;
                }

                self._bannerAd = wx.createBannerAd({
                    adUnitId: 'adunit-bd5bc59766a4337a',
                    style: {
                        left: 0,
                        top: 0,
                        width: 300,
                    }
                });

                self._bannerAd.onLoad(function (callback) {
                    if (callback == undefined || callback == null) {
                        self._bannerAd.style.left = (screenWidth - self._bannerAd.style.realWidth) / 2;
                        self._bannerAd.style.top = top - self._bannerAd.style.realHeight;
                        if (self._isShowBannerAd) {
                            self.showBannerAd();
                        } else {
                            self.hideBannerAd();
                        }
                    }
                });
            }
        }
    },

    showBannerAd: function () {
        this._isShowBannerAd = true;
        if (this._bannerAd) {
            this._bannerAd.show();
        }
    },

    hideBannerAd: function () {
        this._isShowBannerAd = false;
        if (this._bannerAd) {
            this._bannerAd.hide();
        }
    },

    //微信视频广告
    createRewardedVideoAd: function (onSuccess, onCancel) {
        let videoAd = wx.createRewardedVideoAd({
            adUnitId: 'adunit-dcf0b86297777374'
        })

        videoAd.load()
            .then(() => videoAd.show())
            .catch(err => console.log(err.errMsg));

        videoAd.onClose(function (callback) {
            if (callback && callback.isEnded) {
                if (onSuccess) {
                    onSuccess();
                }
            } else {
                if (onCancel) {
                    onCancel();
                }
            }
        });
    },

    //分享加速
    
});
