let playerClass = require('./player');
let blockClass = require('./block');
let stageClass = require('./stageManager');

cc.Class({
    extends: cc.Component,

    properties: {
        player: playerClass,
        blockJs: blockClass,
        stageManager: stageClass,
        scoreLabel: cc.Label
    },

    onLoad(){
        this.setTouchStart();
        this.numScoreTotal = 0;
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    update(){

    },

    setTouchStart(){
        this.node.on(cc.Node.EventType.TOUCH_START, this.gameTouchStart ,this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.gameTouchEnd ,this);
    },

    disableTouch(){
        this.node.targetOff(this);
    },

    gameTouchStart(){
        this.player.readyJump();
    },

    gameTouchEnd(e){
        // let touches = e.getTouches();
        // let touchLoc = touches[0].getLocation();
        this.player.onJump(this.jumpFinish.bind(this));
    },

    jumpFinish(){
        let pos = this.player.getWorldPlayerPos();
        this.stageManager.currBlock = this.stageManager.nextBlock;
        this.stageManager.currBlock.jumpCheck(pos, this.success.bind(this), this.failure.bind(this));
    },

    success(score){
        this.numScoreTotal += score;
        this.scoreLabel.string = '当前分数：' + this.numScoreTotal;
        this.stageManager.moveStage();
    },

    failure(){
        this.disableTouch();
        console.log('failure');

        setTimeout(() => {
            this.resetGame();
        },1000);
    },

    resetGame(){
        cc.director.loadScene('main');

    }
});
