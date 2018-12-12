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
       
    },
    //坐标替换
    /**
     * 得到一个节点的世界坐标
     * node的原点在左下边
     * @param {*} node 
     */
    localConvertWorldPoint(node) {
        if (node) {
            return node.convertToWorldSpace(cc.v2(0, 0));
        }
        return null;
    },

    /**
     *  * 把一个节点的本地坐标转到另一个节点的本地坐标下
     * @param {*} node 
     * @param {*} targetNode 
     */
    convetOtherNodeSpace(node, targetNode) {
        if (!node || !targetNode) {
            return null;
        }
        //先转成世界坐标
        let worldPoint = this.localConvertWorldPoint(node);
        return this.worldConvertLocalPoint(targetNode, worldPoint);
    },

    //世界坐标转换成本地坐标
    worldConvertLocalPoint(node, worldPoint) {
        if (node) {
            return node.convertToNodeSpace(worldPoint);
        }
        return null;
    },

    /**
     * 时间戳转换成Date
     */
    timestampToTime (timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000

        return date;
    },

    /**
     * 设置一个随机数
     */
    random (n, m) {
        var random = Math.floor(Math.random() * (m - n + 1) + n);

        return random;
    },
    
    //  通用功能，切换场景的时候，会自动设置适配
   setResolutionPolicy: function() {
        let f = function () {
            var size = cc.view.getFrameSize();
            var iphonx = size.height/size.width >= 2?true:false;
            if (cc.sys.isMobile) {
                cc.log('手机场景适配');
                if(iphonx){
                    cc.view.setDesignResolutionSize(750, 1334, cc.ResolutionPolicy.FIXED_HEIGHT);
                }else{
                    cc.view.setDesignResolutionSize(750, 1334, cc.ResolutionPolicy.FIXED_WIDTH);
                }
                cc.Canvas.instance['alignWithScreen']();
            } else {
                cc.log('电脑场景适配');
                cc.view.setDesignResolutionSize(750, 1334, cc.ResolutionPolicy.SHOW_ALL);
                cc.Canvas.instance['alignWithScreen']();
            }
        }
        f();
        cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LOADING, f);
    },
});
