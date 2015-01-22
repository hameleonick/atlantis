/**
 * Created by nkapravchuk on 15.01.15.
 */

function ModeScreen(gameStage){
    this.initialize(gameStage)
}

var protoMS = ModeScreen.prototype;

protoMS.initialize = function(game){

    this.gameStage = game.gameStage;
    this.game = game;

    this.modeContainer = null;
    this.elementsToResize = [];
    this.setupView();
}

protoMS.setupView = function(){

    this.setupModeContainer();
    this.setupAdditionalElements();
    this.setupStartButtons();
    this.setupSystemButtons();
    this.setupInitialize();

}

protoMS.setupAdditionalElements = function(){
    var frame = new PIXI.Sprite.fromImage("./img/frame.png");

    frame.anchor.x = 0.5;
    frame.anchor.y = 0.42;
    frame.scale.x = 1;
    frame.scale.y = 1;

    var logo = new PIXI.Sprite.fromImage("./img/logo.png");

    logo.anchor.x = 0.5;
    logo.anchor.y = 3.63;

    var corals = new PIXI.Sprite.fromImage("./img/corals.png");
    corals.anchor.x = 0.5;
    corals.anchor.y = -0.6;

    var img = new Image();
    img.src = "./img/symbols-anim.png"
    var texture = new PIXI.BaseTexture(img, PIXI.scaleModes.NEAREST);
    var wildTexture =  new PIXI.Texture(texture, new PIXI.Rectangle(0, 0, 100, 100));
    var wild = new PIXI.Sprite(wildTexture);

    wild.anchor.x = 1.8;
    wild.anchor.y = 1;

    wild.scale.x = 1.2;
    wild.scale.y = 1.2;

    var scatterTexture = new PIXI.Texture(texture, new PIXI.Rectangle(0, 100, 100, 100));
    var scatter = new PIXI.Sprite(scatterTexture);
    scatter.anchor.x = -0.7;
    scatter.anchor.y = 1;
    scatter.scale.x = 1.2;
    scatter.scale.y = 1.2;

    var wildText = new PIXI.Text("WILD", {fill:"#f4ad30",font:"bold 20pt Helvetica"})
    wildText.anchor.x = 2.75;
    wildText.anchor.y = -0.25;

    var scatterText = new PIXI.Text("SCATTER", {fill:"#f4ad30",font:"bold 20pt Helvetica"})
    scatterText.anchor.x = -0.65;
    scatterText.anchor.y = -0.25;

   /* var coralR = new PIXI.Sprite.fromImage("./img/coral_right.png");
    coralR.anchor.x = -0.9;
    coralR.anchor.y = -0.65;

    var coralL = new PIXI.Sprite.fromImage("./img/coral_left.png");
    coralL.anchor.x = 1.74;
    coralL.anchor.y = -0.65;

    var maskR = new PIXI.Graphics();
    maskR.beginFill();
    maskR.drawRoundedRect(160,100,coralR.width,coralR.height,50);
    maskR.endFill();

    var maskL = new PIXI.Graphics();
    maskL.beginFill();
    maskL.drawRoundedRect(-340,80,200,150,50);
    maskL.endFill();
*/
//    frame.addChildAt(coralR,0)
console.log(frame)
    this.modeContainer.addChildAt(frame,0);
    this.modeContainer.addChildAt(logo,1);
    this.modeContainer.addChildAt(corals,1);
    this.modeContainer.addChildAt(wild,1);
    this.modeContainer.addChildAt(scatter,1);
    this.modeContainer.addChildAt(wildText,1);
    this.modeContainer.addChildAt(scatterText,1);
//    this.modeContainer.addChildAt(coralR,1);
//    this.modeContainer.addChildAt(coralL,1);
//    this.modeContainer.addChildAt(maskR,1);
//    this.modeContainer.addChildAt(maskL,1);
//    coralR.mask = maskR;
//    coralL.mask = maskL;

}

protoMS.setupModeContainer = function(){
    this.modeContainer = new PIXI.DisplayObjectContainer();

    this.modeContainer.resizeFunc = function (resizeParams) {

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

    this.elementsToResize.push(this.modeContainer);

}

protoMS.showModeScreen = function(show, loadGame){
    if(show){
        this.resize();
        this.gameStage.addChildAt(this.modeContainer,1);
        if(loadGame)
            this.loadGame();
        else
        {
            this.showPlayButtons(true);
            this.showNavButtons(true);
        }
    }
    else{
        this.modeContainer.removeChildren();
        this.gameStage.removeChildAt(1);
        delete this.game.modeScreen;
    }
}

protoMS.loadGame = function(){
    this.gameLoading(false, function(){
        this.showBaseElements();
    }.bind(this))
}

protoMS.setupSystemButtons = function(){
    var img = new Image();
    img.src = "./img/home_account.png"
    var texture = new PIXI.BaseTexture(img, PIXI.scaleModes.DEFAULT);
    var homeTexture =  new PIXI.Texture(texture, new PIXI.Rectangle(0, 0, 180, 172));
    this.homeButton = new PIXI.Sprite(homeTexture);

    this.homeButton.scale.x = 0.6;
    this.homeButton.scale.y = 0.6;

    this.homeButton.anchor.x = 0.5;
    this.homeButton.anchor.y = 0.5;

    this.homeButton.position.x = -415;
    this.homeButton.position.y = -170;

    this.homeButton.visible = false;

    var accountTexture = new PIXI.Texture(texture, new PIXI.Rectangle(190, 0, 190, 172));
    this.account = new PIXI.Sprite(accountTexture);

    this.account.scale.x = 0.6;
    this.account.scale.y = 0.6;

    this.account.anchor.x = 0.5;
    this.account.anchor.y = 0.5;

    this.account.position.x = 410;
    this.account.position.y = -170;

    this.account.visible = false;

    this.modeContainer.addChildAt(this.homeButton,1)
    this.modeContainer.addChildAt(this.account,1)

}

protoMS.setupStartButtons = function(){
    var self = this;
    var img = new Image();
    img.src = "./img/pfr_pff.png"
    var texture = new PIXI.BaseTexture(img, PIXI.scaleModes.DEFAULT);
    var playForRealTexture =  new PIXI.Texture(texture, new PIXI.Rectangle(0, 0, 245, 57));
    this.playForReal = new PIXI.Sprite(playForRealTexture);

    this.playForReal.scale.x = 1.1;
    this.playForReal.scale.y = 1.1;
    this.playForReal.anchor.x = 0.5;
    this.playForReal.anchor.y = 0.5;

    this.playForReal.position.y = 100;
    this.playForReal.visible = false

    var playForRealText = new PIXI.Text("Play For Real", {fill:"black",font:"bold 20pt Helvetica"})
    playForRealText.anchor.x = 0.5;
    playForRealText.anchor.y = 0.5;

    this.playForReal.addChild(playForRealText);

    var playForFunTexture = new PIXI.Texture(texture, new PIXI.Rectangle(0, 58, 245, 57));
    this.playForFun = new PIXI.Sprite(playForFunTexture);

    this.playForFun.anchor.x = 0.5;
    this.playForFun.anchor.y = 0.5;

    this.playForFun.position.y = 170;
    this.playForFun.visible = false;

    var playForFunText = new PIXI.Text("Play For Fun", {fill:"black",font:"bold 20pt Helvetica"})
    playForFunText.anchor.x = 0.5;
    playForFunText.anchor.y = 0.5;
    playForFunText.scale.x = 1.1;
    playForFunText.scale.y = 1.1;

    this.playForFun.addChild(playForFunText);

    this.playForFun.interactive = true;
    this.playForFun.buttonMode = true;

    this.playForFun.mousedown = this.playForFun.touchstart = function(data) {
        this.data = data;
        this.alpha = 0.8;
    }

    this.playForFun.mouseup = this.playForFun.mouseupoutside = this.playForFun.touchend = this.playForFun.touchendoutside = function (data) {
        this.alpha = 1
        // set the interaction data to null
        this.data = null;
        self.startPlayForFunGame();
    };

    this.modeContainer.addChildAt(this.playForReal,1);
    this.modeContainer.addChildAt(this.playForFun,1);
}

protoMS.setupInitialize = function(){

    this.loadingContainer = new PIXI.DisplayObjectContainer();

    var initializeText = new PIXI.Text("Initialization...", {fill:"#f4ad30",font:"bold 20pt Helvetica"})
    initializeText.anchor.x = 0.5;
    initializeText.anchor.y = 0.5;

    initializeText.position.x = 100;
    initializeText.position.y = 50;

    var splashOrnament =  new PIXI.Sprite.fromImage("./img/splash_ornament.png");
    splashOrnament.anchor.x = 0.5;
    splashOrnament.anchor.y = 0.5;

    splashOrnament.position.y = 90;
    splashOrnament.position.x = 90;

    splashOrnament.visible = false;

    this.loadingBalls = this.createLoadingBalls();


    for(var i=0;i<5;i++) {
        this.loadingContainer.addChildAt(this.loadingBalls[i],0);
    }

    this.loadingContainer.addChildAt(initializeText,0);
    this.loadingContainer.addChildAt(splashOrnament,0);

    this.loadingContainer.showOrnament = function(show){
        splashOrnament.visible = show;
    };

    this.loadingContainer.position.x = -80;
    this.loadingContainer.position.y = 100;

    this.loadingContainer.visible = false;

    this.modeContainer.addChildAt(this.loadingContainer,1);

}

protoMS.createLoadingBalls = function(){
    var img = new Image();
    img.src = "./img/loader.png";
    var texture = new PIXI.BaseTexture(img, PIXI.scaleModes.DEFAULT)
    var balls = [];
    for(var i=0;i<5;i++) {
        var loadTexture = new PIXI.Texture(texture, new PIXI.Rectangle(38, 0, 39, 40));
        var load = new PIXI.Sprite(loadTexture)
        load.position.x = i*45;
        load.anchor.x = 0.5;
        load.anchor.y = 0.5;
        load.secondState = function (flag) {
            var x = 38;
            if (flag) {
                x = 0;
            }
            var loadTexture = new PIXI.Texture(texture, new PIXI.Rectangle(x, 0, 39, 40));
            this.setTexture(loadTexture);
        }
        balls.push(load)
    }

    return balls;
}

protoMS.gameLoading = function(showOrnament, callback){
    var currentIndex = 0;
    for(var i=0;i<5;i++) {
        this.loadingBalls[i].secondState(false);
    }
    this.loadingContainer.showOrnament(showOrnament);
    this.showLoadingContainer(true);
    var intervalTimer = setInterval(function(){

        if(currentIndex)
        {
            this.loadingBalls[currentIndex-1].secondState(false);
            this.loadingBalls[currentIndex].secondState(true);
        }
        else
        {
            this.loadingBalls[4].secondState(false);
            this.loadingBalls[0].secondState(true);
        }

        if(currentIndex == 4)
            currentIndex = 0;
        else
            currentIndex++;



    }.bind(this),200);

    var loadingTimer = setTimeout(function(){
        clearInterval(intervalTimer);
        if(callback)
            callback.call(this);
    }.bind(this),1500);
}

protoMS.showBaseElements = function(){
    this.showLoadingContainer(false);
    this.showPlayButtons(true);
    this.showNavButtons(true);
}

protoMS.showLoadingContainer = function(show){
    this.loadingContainer.visible = show;
}

protoMS.showPlayButtons = function(show){
    this.playForFun.visible = show;
    this.playForReal.visible = show;
}

protoMS.showNavButtons = function(show){
    this.homeButton.visible = show;
    this.account.visible = show;
}

protoMS.startPlayForFunGame = function(){
    this.showLoadingContainer(true);
    this.showPlayButtons(false);
    this.gameLoading(true, function(){
        this.showModeScreen(false);
        this.game.setupGameScreen();
    }.bind(this));


}

protoMS.resize = function(){
//    setTimeout(function() {
    var resizeParams = getResizeParams();
    for (var i = 0; i < this.elementsToResize.length; i++) {
        this.elementsToResize[i].resizeFunc(resizeParams)
    }
//    }.bind(this),100);
}