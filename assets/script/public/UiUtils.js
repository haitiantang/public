
cc.Class({
    extends: cc.Component,

    properties: {
    },


    //判断Hall是否为IphoneX
    supportingHallScreens (node) {
        var size = cc.view.getFrameSize();
        // var isIphoneX = (size.width == 2436 && size.height == 1125) ||
        //     (size.width == 1125 && size.height == 2436) ||
        //     (size.width == 1624 && size.height == 750) ||
        //     (size.width == 750 && size.height == 1624) ||
        //     (size.width == 812 && size.height == 375) ||
        //     (size.width == 375 && size.height == 812)
        var isIphoneX = false;
        if((size.height / size.width) > 2 ){
            isIphoneX = true;
        }
        var cvs = node.getComponent(cc.Canvas);
        if (isIphoneX) {
            //node.getChildByName("syg").getComponent(cc.Widget).top = 100;
            node.getChildByName("fx").getComponent(cc.Widget).bottom = 510;
            node.getChildByName("ph").getComponent(cc.Widget).bottom = 510;
            node.getChildByName("lz1").getComponent(cc.Widget).bottom = 510;
            node.getChildByName("more").getComponent(cc.Widget).bottom = 510;
        } 
        if (isIphoneX) {
            cvs.fitHeight = false;
            cvs.fitWidth = true;
        } else {
            cvs.fitHeight = true;
            cvs.fitWidth = false;
        }

    },

    //判断jukjun场景是否为IphoneX
    supportingGameScreens (node) {
        var size = cc.view.getFrameSize();
        var isIphoneX = false;
        if((size.height / size.width) > 2 ){
            isIphoneX = true;
        }

        var cvs = node.getComponent(cc.Canvas); 

        if (isIphoneX) {
            //cc.log(node.getChildByName("syg").getComponent(cc.Widget));
            //cc.log(node.getChildByName("back").getComponent(cc.Widget).top);
            node.getChildByName("back").getComponent(cc.Widget).top = 100;
            node.getChildByName("syk").getComponent(cc.Widget).top = 200;
            node.getChildByName("goldnow").getComponent(cc.Widget).top = 120;
            //node.getChildByName("goldnow").getComponent(cc.Widget).top = 150;

        } 
    },
    

    isIphoneX () {
        var size = cc.view.getFrameSize();
        var isIphoneX = (size.width == 2436 && size.height == 1125) ||
            (size.width == 1125 && size.height == 2436) ||
            (size.width == 1624 && size.height == 750) ||
            (size.width == 750 && size.height == 1624) ||
            (size.width == 812 && size.height == 375) ||
            (size.width == 375 && size.height == 812);

        return isIphoneX;
    },

    ShowLayer (layerName, parent, agrs) {
        cc.loader.loadRes("prefabs/" + layerName, function (err, prefab) {
            var layer = cc.instantiate(prefab);
            layer.name = layerName;

            if (parent) {
                parent.addChild(layer);
            }

            if (agrs && layer.getComponent(layerName)) {
                var script = layer.getComponent(layerName);
                script.init(agrs);
            }
        });
    },

    showAnimation (actName, parent, agrs, callback) {
        cc.loader.loadRes("prefabs/Animation", function (err, prefab) {
            var layer = cc.instantiate(prefab);
            parent.addChild(layer);
            if (agrs !== undefined) {
                if (agrs.posx !== undefined && agrs.posy !== undefined) {
                    layer.setPosition(cc.p(agrs.posx, agrs.posy))
                }
                if (agrs.rotation !== undefined) {
                    layer.rotation = agrs.rotation;
                }
                if (agrs.scalex !== undefined) {
                    layer.scaleX = agrs.scalex;
                }
                if (agrs.scaley !== undefined) {
                    layer.scaleY = agrs.scaley;
                }
            }
            var ctrl = layer.getComponent("SpineAniCtrl");
            cc.loader.loadRes("animation/" + actName, sp.SkeletonData, function (err, res) {
                ctrl.init(res, agrs, callback);
            });
            return ctrl;
        });
    },

    showTips (parent, content, showtime, posx, posy) {
        if (parent.getChildByName("10002") !== null) {
            parent.getChildByName("10002").removeFromParent();
        }

        cc.loader.loadRes("prefabs/Tips", function (err, prefab) {
            var layer = cc.instantiate(prefab);
            layer.name = "10002";
            parent.addChild(layer);
            if (posx !== undefined || posy !== undefined) {
                layer.setPosition(cc.p(posx, posy));
            }
            var tips = layer.getComponent("Tips");
            tips.show(content);
        });
        if (showtime == null || showtime == undefined) {
            showtime = 3000;
        }
        setTimeout(function () {
            if (parent.getChildByName("10002") !== null) {
                parent.getChildByName("10002").removeFromParent();
            }
        }, showtime);
    },

    //微信Banner广告
    createBannerAd: function (adId) {
        if (typeof (wx) != "undefined") {
            if (wx.getSystemInfoSync().SDKVersion >= "2.0.4") {
                if (Globals._bannerAd) {
                    Globals._bannerAd.destroy();
                }
                let {
                    screenWidth,
                    screenHeight
                } = wx.getSystemInfoSync();
                var defaultHegiht = 99;
                var top = screenHeight;

                var size = cc.view.getFrameSize();
                var isIphoneX = (size.width == 2436 && size.height == 1125) ||
                    (size.width == 1125 && size.height == 2436) ||
                    (size.width == 1624 && size.height == 750) ||
                    (size.width == 750 && size.height == 1624) ||
                    (size.width == 812 && size.height == 375) ||
                    (size.width == 375 && size.height == 812)

                if (isIphoneX) {
                    top -= 50;
                }
                let bannerAd = wx.createBannerAd({
                    adUnitId: adId,
                    style: {
                        left: 0,
                        top: 0,
                        width: 500,
                    }
                });
                // bannerAd.style.left = screenWidth / 2 - bannerAd.style.realWidth;
                bannerAd.onLoad(function (callback) {
                    if (callback == undefined || callback == null) {
                        bannerAd.style.left = (screenWidth - bannerAd.style.realWidth) / 2;
                        bannerAd.style.top = top - bannerAd.style.realHeight;
                        bannerAd.show();
                    }
                });
                Globals._bannerAd = bannerAd;
            }
        }
    },
 
    //获取头像
    getPic: function (url, nodeSprite) {
         /**cc.loader.load(url, function (err, img) {
             if (!err && img) {
                cc.log("img",img);
                nodeSprite.node.active = true;
                var c = new cc.SpriteFrame(img, cc.Rect(0, 0, img.width, img.height));
                cc.log("cv:",c);
                nodeSprite.node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(img, cc.Rect(0, 0, img.width, img.height));
             } else {
                 console.log('---load resFile error:' + err);
             }
         });**/
        cc.loader.load({
            url: url,
            type: 'png'
        }, (err, texture) => {
            if (err) console.error(err);
            nodeSprite.node.active = true;
            nodeSprite.node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture,cc.Rect(0, 0, 90, 90));
            nodeSprite.node.width = 90;
            nodeSprite.node.height = 90;
        });
    },

    //弹窗缩放效果
    scale(node){
        node.scale = 0;
        var seq = cc.sequence(cc.scaleTo(0.2, 1.1), cc.scaleTo(0.2,1));
        node.runAction(seq);
    },

    //按钮声音及效果
    buttonscale(node){
        var seq = cc.sequence(cc.scaleTo(0.1, 1.2), cc.scaleTo(0.1,1));
        node.runAction(seq);
        var isbgm = cc.vv.utils.getBgm();
        if( parseInt(isbgm) == 0 ){
            cc.audioEngine.stop(this.current);
            cc.audioEngine.play(cc.vv.audio, false, 1);
        }
        if (Globals._bannerAd) {
            Globals._bannerAd.destroy();
        }
    }
    

});
