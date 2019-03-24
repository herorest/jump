cc.Class({
    extends: cc.Component,

    properties: {
        jumpAudio:{
            type: cc.AudioClip,
            default: null
        },
        jumpStandByAudio:{
            type: cc.AudioClip,
            default: null
        }
    },

    onLoad(){
        this.jumpStandByAudioId = -1;
        this.jumpAudioId = -1;
        this.jumpId = -1;
        this.isJump = false;
        this.direction = 1;  //顺时针
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

    readyJump(){
        if(this.isJump){
            return;
        }
        this.isJump = true;
        this.jumpStandByAudioId = cc.audioEngine.play(this.jumpStandByAudio, false, 1);
        this.user.runAction(cc.scaleTo(1, 1, 0.5));
    },

    onJump(callback){
        let targetPos = cc.v2(this.node.x + this.distance * this.direction, this.node.y + this.distance * this.properties);
        this.jumpToBlock(targetPos, callback);
    },

    jumpToBlock(targetPos, callback){

        cc.audioEngine.stop(this.jumpStandByAudioId);
        this.jumpAudioId = cc.audioEngine.play(this.jumpAudio, false, 1);

        this.user.stopAllActions();
        let resetAction = cc.scaleTo(0.3, 1, 1);
        let jumpAction = cc.jumpTo(0.5, targetPos, 150, 1);
        let rotateAction = cc.rotateBy(0.5, this.direction * 360);
        this.user.runAction(resetAction);
        this.rotateNode.runAction(rotateAction);
        this.node.runAction(cc.sequence(jumpAction, cc.callFunc(() => {
            this.rotateNode.rotation = 0;
            this.direction = Math.random() < 0.5 ? 1 : -1;
            this.distance = 0;
            this.speed = 100;
            callback && callback();
        })));

        this.isJump = false;
    },

    update(dt){
        if(this.isJump){
            if(dt && this.power && this.maxDistance){
                this.speed += dt * this.power;
                this.distance = this.speed + this.maxDistance * dt;
            }
        }
    },

    getWorldPlayerPos(){
        return this.node.parent.convertToWorldSpaceAR(this.node.position);
    },

    getDirection(){
        return this.direction;
    }
});
