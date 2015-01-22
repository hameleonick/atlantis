/**
 * Created by nkapravchuk on 1/22/15.
 */

function GameScreen(gameStage){
    this.initialize(gameStage)
}

var protoGS = GameScreen.prototype;

protoGS.initialize = function(game){

    this.gameStage = game.gameStage;
    this.game = game;

    this.gameContainer = null;
    this.elementsToResize = [];
    this.setupView();
};

protoGS.setupView = function(){

    this.setupGameContainer();
    this.setupSlotsContainer();
    this.setupSpinContainer();

};

protoGS.setupGameContainer = function(){
    this.gameContainer = new PIXI.DisplayObjectContainer();

    this.gameContainer.resizeFunc = function (resizeParams) {

        var scale = resizeParams.scaleDeltaMax;
        if(resizeParams.ratio<=1.35)
        {
            scale = resizeParams.scaleDeltaMin;
        }
        this.scale.x = scale;
        this.scale.y = scale;
        this.position.x = resizeParams.deviceWidth / 2;
        this.position.y = resizeParams.deviceHeight / 2;
    }

    this.elementsToResize.push(this.gameContainer);
}

protoGS.setupSlotsContainer = function(){
    var frame = new PIXI.Sprite.fromImage("./img/frame.png");

    frame.anchor.x = 0.5;
    frame.anchor.y = 0.5;
    frame.scale.x = 1;
    frame.scale.y = 1;

    frame.position.x = -100;

    var logo = new PIXI.Sprite.fromImage("./img/logo.png");

    logo.anchor.x = 0.5;
    logo.anchor.y = 0.5;

    logo.position.x = -95;
    logo.position.y = -200;

    this.gameContainer.addChildAt(frame,0);
    this.gameContainer.addChildAt(logo,1);
}

protoGS.setupSpinContainer = function(){

    this.spinContainer = new PIXI.DisplayObjectContainer();

    var img = new Image();
    img.src = "./img/spin_sprite.png"
    var texture = new PIXI.BaseTexture(img, PIXI.scaleModes.DEFAULT);
    var spinTexture =  new PIXI.Texture(texture, new PIXI.Rectangle(0, 0, 401, 400));
    var spin = new PIXI.Sprite(spinTexture);

    spin.scale.x = 0.5;
    spin.scale.y = 0.5;

    spin.position.x = 265;
    spin.position.y = -100;

    spin.changeState = function(){

    }

    this.spinContainer.addChildAt(spin, 0);
    this.gameContainer.addChildAt(this.spinContainer,1);

}

protoGS.showGameScreen = function(show){
    if(show){
        this.resize();
        this.gameStage.addChildAt(this.gameContainer,1);

    }
    else{
        this.gameContainer.removeChildren();
        this.gameStage.removeChildAt(1);
        delete this.game.gameScreen;
    }
}

protoGS.resize = function(){
    var resizeParams = getResizeParams();
    for (var i = 0; i < this.elementsToResize.length; i++) {
        this.elementsToResize[i].resizeFunc(resizeParams);
    }
}

