"use strict";
cc._RF.push(module, '76c26h5YaNPDpp4KImj3apk', 'player');
// Script/player.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        jumpAudio: {
            type: cc.AudioClip,
            default: null
        },
        jumpStandByAudio: {
            type: cc.AudioClip,
            default: null
        }
    },

    onLoad: function onLoad() {
        this.jumpStandByAudioId = -1;
        this.jumpAudioId = -1;
        this.jumpId = -1;
        this.isJump = false;
        this.direction = 1; //顺时针
        this.power = 250;
        this.maxDistance = 650;
        this.distance = 0;
        this.properties = 0.65;
        this.speed = 100;

        this.user = cc.find('rotateNode/user', this.node);
        this.rotateNode = cc.find('rotateNode', this.node);
        this.onJump = this.onJump.bind(this);
        this.readyJump = this.readyJump.bind(this);
    },
    readyJump: function readyJump() {
        if (this.isJump) {
            return;
        }
        this.isJump = true;
        this.jumpStandByAudioId = cc.audioEngine.play(this.jumpStandByAudio, false, 1);
        this.user.runAction(cc.scaleTo(1, 1, 0.5));
    },
    onJump: function onJump(callback) {
        var targetPos = cc.v2(this.node.x + this.distance * this.direction, this.node.y + this.distance * this.properties);
        this.jumpToBlock(targetPos, callback);
    },
    jumpToBlock: function jumpToBlock(targetPos, callback) {
        var _this = this;

        cc.audioEngine.stop(this.jumpStandByAudioId);
        this.jumpAudioId = cc.audioEngine.play(this.jumpAudio, false, 1);

        this.user.stopAllActions();
        var resetAction = cc.scaleTo(0.3, 1, 1);
        var jumpAction = cc.jumpTo(0.5, targetPos, 150, 1);
        var rotateAction = cc.rotateBy(0.5, this.direction * 360);
        this.user.runAction(resetAction);
        this.rotateNode.runAction(rotateAction);
        this.node.runAction(cc.sequence(jumpAction, cc.callFunc(function () {
            _this.rotateNode.rotation = 0;
            _this.direction = Math.random() < 0.5 ? 1 : -1;
            _this.distance = 0;
            _this.speed = 100;
            callback && callback();
        })));

        this.isJump = false;
    },
    update: function update(dt) {
        if (this.isJump) {
            if (dt && this.power && this.maxDistance) {
                this.speed += dt * this.power;
                this.distance = this.speed + this.maxDistance * dt;
            }
        }
    },
    getWorldPlayerPos: function getWorldPlayerPos() {
        return this.node.parent.convertToWorldSpaceAR(this.node.position);
    },
    getDirection: function getDirection() {
        return this.direction;
    }
});

cc._RF.pop();