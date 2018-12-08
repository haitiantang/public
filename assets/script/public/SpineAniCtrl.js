cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {
        this.spine = this.getComponent('sp.Skeleton');
    },

    init: function (res, agrs, callback) {
        var self = this;

        if (self.spine == null) {
            self.spine = self.getComponent('sp.Skeleton');
        }
        self.spine.skeletonData = res;
        if (agrs == null || agrs.action == undefined) {
            // self.spine.setAnimation(0, 'animation', false);
        } else {
            // console.log("agrs.isloop " + agrs.isloop + "  bbbb");
            self.spine.setAnimation(0, agrs.action, agrs.isloop);
        }
        //每次播放都会调用下面的
        self.spine.setCompleteListener(function () {
            if (callback) {
                callback()
            }
        })
        // self.spine.setEventListener(function () {
        //     console.log("setEventListener  ")
        // })
        // self.spine.setEndListener(trackEntry => {
        //     console.log("setEndListener  ")
        // });
    },

    clearAnimation: function () {
        self.spine.clearTracks();
    }

});
