"use strict";
cc._RF.push(module, 'effecaak9VCIZ5kXDz9Ip7/', 'stageManager');
// Script/stageManager.js

'use strict';

var playerClass = require('player');

cc.Class({
    extends: cc.Component,

    properties: {
        blockManager: cc.Node,
        blockList: [cc.Prefab],
        playerUser: playerClass,
        blockTemplate: cc.Node
    },

    init: function init() {
        this.blockManager.removeAllChildren();
        this.blockTemplate.destroy();
        var block = cc.instantiate(this.blockList[0]);
        this.blockManager.addChild(block);
        block.position = this.initblockPos;
        var blockjs = block.getComponent('block');
        this.currBlock = blockjs;
        this.nextBlock = blockjs;
        this.proportionality = 0.556; //Y轴斜率
    },
    onLoad: function onLoad() {
        this.initblockPos = this.blockTemplate.position;
        this.currBlock = null;
        this.nextBlock = null;
        this.minDistance = 200;
        this.maxDistance = 400;
        this.playerLeftOrigin = this.playerUser.getWorldPlayerPos();
        this.playerRightOrigin = cc.v2();
        this.playerRightOrigin.x = this.playerLeftOrigin.x + 350;
        this.playerRightOrigin.y = this.playerLeftOrigin.y;
        this.init();
    },
    addBlock: function addBlock() {
        var index = Math.floor(Math.random() * this.blockList.length);
        var block = cc.instantiate(this.blockList[index]);
        this.blockManager.addChild(block);

        var blockjs = block.getComponent('block');

        var distance = this.minDistance + (Math.random() * this.maxDistance - this.minDistance);
        var direction = this.playerUser.getDirection();

        if (direction > 0) {
            block.x = this.currBlock.node.x + distance;
        } else {
            block.x = this.currBlock.node.x - distance;
        }
        block.y = this.currBlock.node.y + distance * this.proportionality;

        this.currBlock = this.nextBlock;
        this.nextBlock = blockjs;
    },
    moveStage: function moveStage() {
        var _this = this;

        var userWorldPos = this.playerUser.getWorldPlayerPos();
        var moveV2 = void 0;

        if (this.playerUser.getDirection() > 0) {
            moveV2 = userWorldPos.sub(this.playerLeftOrigin);
        } else {
            moveV2 = userWorldPos.sub(this.playerRightOrigin);
        }

        var stageMove = this.node.position.sub(moveV2);
        var action = cc.moveTo(0.4, stageMove);

        var seq = cc.sequence(action, cc.callFunc(function () {
            _this.addBlock();
        }));

        this.node.runAction(seq);
    },
    update: function update(dt) {}
});

cc._RF.pop();