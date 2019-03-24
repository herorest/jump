"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'main');
// Script/main.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        startButton: cc.Button,
        maskingAnimation: cc.Animation,
        maskNode: cc.Node
    },

    onLoad: function onLoad() {
        this.startButton.node.on('touchend', this.startGame, this);

        var spriteFrames;
        var urls = ['assets/Texture/block1.png', 'block2.png'];
        cc.loader.loadResArray(urls, cc.SpriteFrame, function (err, assets) {
            if (err) {
                cc.error(err);
                return;
            }
            spriteFrames = assets;
            console.log(err, spriteFrames);
        });
    },

    update: function update(dt) {},

    startGame: function startGame() {
        this.maskNode.active = true;
        this.maskingAnimation.play();

        //切换场景
        cc.director.loadScene('game');
    }
});

cc._RF.pop();