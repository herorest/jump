(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/block.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4438berauhPG4Sx+tGNCxEB', 'block', __filename);
// Script/block.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        blockPlygon: cc.PolygonCollider,
        centerNode: cc.Node,
        scoreNode: cc.Node
    },

    onLoad: function onLoad() {
        this.score = 0;
    },

    update: function update(dt) {},

    jumpCheck: function jumpCheck(touchLoc, success, failure) {
        if (this.isInBlock(touchLoc)) {
            this.getScore(touchLoc);
            this.playAnimation();
            success(this.score);
        } else {
            failure();
        }
    },


    //判断亮点间距离
    getDistance: function getDistance(p1, p2) {
        return p1.sub(p2).mag();
    },


    //判断是否在方块中
    isInBlock: function isInBlock(worldPos) {
        var inBlock = false;
        if (cc.Intersection.pointInPolygon(worldPos, this.blockPlygon.world.points)) {
            inBlock = true;
        }

        return inBlock;
    },


    //根据落点与中心点的距离计算分数
    getScore: function getScore(worldPos) {
        var localPos = this.node.convertToNodeSpaceAR(worldPos);
        var dis = this.getDistance(this.centerNode.position, localPos);

        if (dis > 70) {
            this.score = 1;
        } else if (dis <= 70 && dis > 50) {
            this.score = 10;
        } else if (dis <= 50 && dis > 35) {
            this.score = 20;
        } else if (dis <= 35 && dis > 20) {
            this.score = 30;
        } else {
            this.score = 50;
        }
    },
    playAnimation: function playAnimation() {
        this.scoreNode.getComponent(cc.Label).string = '+' + this.score;
        this.scoreNode.getComponent(cc.Animation).play();
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=block.js.map
        