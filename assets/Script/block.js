cc.Class({
    extends: cc.Component,

    properties: {
        blockPlygon: cc.PolygonCollider,
        centerNode: cc.Node,
        scoreNode: cc.Node
    },

    onLoad: function () {
       this.score = 0;
    },

    update: function (dt) {

    },

    jumpCheck(touchLoc, success, failure){
        if(this.isInBlock(touchLoc)){
            this.getScore(touchLoc);
            this.playAnimation();
            success(this.score)
        }else{
            failure();
        }
    },

    //判断亮点间距离
    getDistance(p1, p2){
        return p1.sub(p2).mag();
    },

    //判断是否在方块中
    isInBlock(worldPos){
        let inBlock = false;
        if(cc.Intersection.pointInPolygon(worldPos, this.blockPlygon.world.points)){
            inBlock = true;
        }

        return inBlock;
    },

    //根据落点与中心点的距离计算分数
    getScore(worldPos){
        let localPos = this.node.convertToNodeSpaceAR(worldPos);
        let dis = this.getDistance(this.centerNode.position, localPos);

        if(dis > 70){
            this.score = 1;
        }else if(dis <= 70 && dis > 50){
            this.score = 10;
        }else if(dis <= 50 && dis > 35){
            this.score = 20;
        }else if(dis <= 35 && dis > 20){
            this.score = 30;
        }else{
            this.score = 50;
        }
    },

    playAnimation(){
        this.scoreNode.getComponent(cc.Label).string = '+' + this.score;
        this.scoreNode.getComponent(cc.Animation).play();
    }
});
