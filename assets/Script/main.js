cc.Class({
    extends: cc.Component,

    properties: {
        startButton: cc.Button,
        maskingAnimation: cc.Animation,
        maskNode: cc.Node
    },

    onLoad: function () {
        this.startButton.node.on('touchend', this.startGame, this);

        var spriteFrames;
		var urls = ['assets/Texture/block1.png', 'block2.png'];
		cc.loader.loadResArray(urls, cc.SpriteFrame, function (err, assets) {
		    if (err) {
		        cc.error(err);
		        return;
		    }
		    spriteFrames = assets;
		    console.log(err, spriteFrames)
		});
    },

    update: function (dt) {

    },

    startGame: function(){
        this.maskNode.active = true;
        this.maskingAnimation.play();

        //切换场景
        cc.director.loadScene('game');
    }
});
