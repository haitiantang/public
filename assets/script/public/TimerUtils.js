
/**
 * 定时器工具类
 */
cc.Class({
    extends: cc.Component,

    properties: {
        _timeoutArr: [],
        _intervalArr: [],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    start() {

    },

    // update (dt) {},

    /**
     * 添加Timeout定时器
     */
    addTimeoutById: function (id) {
        this._timeoutArr.push(id);
    },

    /**
     * 移除timeout定时器
     */
    clearTimeoutById: function (id) {
        var tempArr = new Array();

        for (var i = 0; i < this._timeoutArr.length; i++) {
            if (this._timeoutArr[i] != id) {
                tempArr.push(this._timeoutArr[i]);
            } else {
                clearTimeout(id);
            }
        }

        this._timeoutArr = tempArr;
    },

    // clearAllTimeout: function () {

    // },

    /**
     * 添加Interval定时器
     */
    addIntervalById: function (id) {
        this._intervalArr.push(id);
    },

    /**
     * 移除Interva定时器
     */
    clearIntervalById: function (id) {
        var tempArr = new Array();

        for (var i = 0; i < this._intervalArr.length; i++) {
            if (this._intervalArr[i] != id) {
                tempArr.push(this._intervalArr[i]);
            } else {
                clearInterval(id);
            }
        }

        this._intervalArr = tempArr;
    },

    /**
     * 移除所有的定时器
     */
    clearAll: function () {

        for (var i = 0; i < this._timeoutArr.length; i++) {
            if (this._timeoutArr[i]) {
                clearTimeout(this._timeoutArr[i]);
            }
        }

        for (var i = 0; i < this._intervalArr.length; i++) {
            if (this._intervalArr[i]) {
                clearInterval(this._intervalArr[i]);
            }
        }

        this._timeoutArr = new Array();
        this._intervalArr = new Array();
    }
});
