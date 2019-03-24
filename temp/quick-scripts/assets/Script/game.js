(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1772cQMg+JM8445tusiB6Sb', 'game', __filename);
// Script/game.js

'use strict';

var playerClass = require('./player');
var blockClass = require('./block');
var stageClass = require('./stageManager');

cc.Class({
    extends: cc.Component,

    properties: {
        player: playerClass,
        blockJs: blockClass,
        stageManager: stageClass,
        scoreLabel: cc.Label
    },

    onLoad: function onLoad() {
        this.setTouchStart();
        this.numScoreTotal = 0;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },
    update: function update() {},
    setTouchStart: function setTouchStart() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.gameTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.gameTouchEnd, this);
    },
    disableTouch: function disableTouch() {
        this.node.targetOff(this);
    },
    gameTouchStart: function gameTouchStart() {
        this.player.readyJump();
    },
    gameTouchEnd: function gameTouchEnd(e) {
        // let touches = e.getTouches();
        // let touchLoc = touches[0].getLocation();
        this.player.onJump(this.jumpFinish.bind(this));
    },
    jumpFinish: function jumpFinish() {
        var pos = this.player.getWorldPlayerPos();
        this.stageManager.currBlock = this.stageManager.nextBlock;
        this.stageManager.currBlock.jumpCheck(pos, this.success.bind(this), this.failure.bind(this));
    },
    success: function success(score) {
        this.numScoreTotal += score;
        this.scoreLabel.string = '当前分数：' + this.numScoreTotal;
        this.stageManager.moveStage();
    },
    failure: function failure() {
        var _this = this;

        this.disableTouch();
        console.log('failure');

        setTimeout(function () {
            _this.resetGame();
        }, 1000);
    },
    resetGame: function resetGame() {
        cc.director.loadScene('main');
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
        //# sourceMappingURL=game.js.map
        