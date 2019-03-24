let playerClass = require('player');

cc.Class({
    extends: cc.Component,

    properties: {
        blockManager: cc.Node,
        blockList: [cc.Prefab],
        playerUser: playerClass,
        blockTemplate: cc.Node
    },

    init(){
        this.blockManager.removeAllChildren();
        this.blockTemplate.destroy();
        let block = cc.instantiate(this.blockList[0]);
        this.blockManager.addChild(block);
        block.position = this.initblockPos;
        let blockjs = block.getComponent('block');
        this.currBlock = blockjs;
        this.nextBlock = blockjs;
        this.proportionality = 0.556; //Y轴斜率
    },

    onLoad () {
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

    addBlock(){
        let index = Math.floor(Math.random() * this.blockList.length);
        let block = cc.instantiate(this.blockList[index]);
        this.blockManager.addChild(block);

        let blockjs = block.getComponent('block');

        let distance = this.minDistance + (Math.random() * this.maxDistance - this.minDistance);
        let direction = this.playerUser.getDirection();

        if(direction > 0){
            block.x = this.currBlock.node.x + distance;
        }else{
            block.x = this.currBlock.node.x - distance;
        }
        block.y = this.currBlock.node.y + distance * this.proportionality;

        this.currBlock = this.nextBlock;
        this.nextBlock = blockjs;
    },

    moveStage(){
        let userWorldPos = this.playerUser.getWorldPlayerPos();
        let moveV2;

        if(this.playerUser.getDirection() > 0){
            moveV2 = userWorldPos.sub(this.playerLeftOrigin);
        }else{
            moveV2 = userWorldPos.sub(this.playerRightOrigin);
        }

        let stageMove = this.node.position.sub(moveV2);
        let action = cc.moveTo(0.4, stageMove);

        let seq = cc.sequence(action,cc.callFunc(() => {
            this.addBlock();
        }));

        this.node.runAction(seq);

        
    },

    update (dt) {

    },
    
});
