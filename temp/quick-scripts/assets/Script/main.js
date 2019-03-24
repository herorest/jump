(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/main.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'main', __filename);
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
        //# sourceMappingURL=main.js.map
        