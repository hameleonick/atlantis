/**
 * Created by nkapravchuk on 15.01.15.
 */

function ModeScreen(gameStage){
    this.initialize(gameStage)
}

var protoMS = ModeScreen.prototype;

protoMS.initialize = function(gameStage){

    this.gameStage = gameStage;

    this.deviceWidth = window.innerWidth;
    this.deviceHeight = window.innerHeight;

    this.modeContainer = null;

    this.setupView();

}

protoMS.setupView = function(){

    this.setupModeContainer();
    this.setupAdditionalElements();
    this.setupButtons();

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
        this.scale.x = resizeParams.scaleDeltaMin
        this.scale.y = resizeParams.scaleDeltaMin
        this.position.x = resizeParams.deviceWidth / 2;
        this.position.y = resizeParams.deviceHeight / 2;
//        if(resizeParams.orientationType)
//        {
//            this.rotation = 1.57;
//        }
//        else
//            this.rotation = 0;
    }

    window.elementsToResize.push(this.modeContainer);
    this.gameStage.addChildAt(this.modeContainer,1);
}

protoMS.setupBackground = function(){
    this.backgroundElement = new PIXI.Sprite.fromImage("./img/bg.png");

    this.backgroundElement.anchor.x = 0.5
    this.backgroundElement.anchor.y = 0.5

//    this.backgroundElement.scale.x = 0.75
//    this.backgroundElement.scale.y = 0.75

    this.backgroundElement.resizeFunc = function(resizeParams){
        console.log(this)
        console.log(resizeParams.deviceWidth + " " + this.width*resizeParams.scaleDeltaMin)
        console.log(resizeParams.deviceHeight + " " + this.height*resizeParams.scaleDeltaMin)
        var deltaW = 1;
        var deltaH = 1;
        if(resizeParams.deviceWidth > this.width*resizeParams.scaleDeltaMin)
        {
         //alert(resizeParams.deviceWidth + " " + this.width)
//            delta =
        }
        else
        {
             deltaW = resizeParams.deviceWidth / this.width/resizeParams.scaleDeltaMin;
        }

        if(resizeParams.deviceHeight > this.height*resizeParams.scaleDeltaMin)
        {
            //alert(resizeParams.deviceHeight + " " + this.height)

        }
        else
        {
            deltaH = resizeParams.deviceHeight / this.height/resizeParams.scaleDeltaMin;
        }

        console.log(deltaW +" "+ deltaH)
        this.scale.x = (deltaW>deltaH) ? deltaW : deltaH
        this.scale.y = (deltaW>deltaH) ? deltaW : deltaH

    }
//    this.backgroundElement.position.x = 0;
//    this.backgroundElement.position.y = 0;
    window.elementsToResize.push(this.backgroundElement);
    this.modeContainer.addChildAt(this.backgroundElement,0);
}

protoMS.setupButtons = function(){
    var img = new Image();
    img.src = "./img/pfr_pff.png"
    var texture = new PIXI.BaseTexture(img, PIXI.scaleModes.DEFAULT);
    var playForRealTexture =  new PIXI.Texture(texture, new PIXI.Rectangle(0, 0, 245, 57));
    var playForReal = new PIXI.Sprite(playForRealTexture);

    playForReal.scale.x = 1.1;
    playForReal.scale.y = 1.1;
    playForReal.anchor.x = 0.5;
    playForReal.anchor.y = 0.5;

    playForReal.position.y = 100

    var playForRealText = new PIXI.Text("Play For Real", {fill:"black",font:"bold 20pt Helvetica"})
    playForRealText.anchor.x = 0.5;
    playForRealText.anchor.y = 0.5;

    playForReal.addChild(playForRealText);

    var playForFunTexture = new PIXI.Texture(texture, new PIXI.Rectangle(0, 58, 245, 57));
    var playForFun = new PIXI.Sprite(playForFunTexture);

    playForFun.anchor.x = 0.5;
    playForFun.anchor.y = 0.5;

    playForFun.position.y = 170

    var playForFunText = new PIXI.Text("Play For Fun", {fill:"black",font:"bold 20pt Helvetica"})
    playForFunText.anchor.x = 0.5;
    playForFunText.anchor.y = 0.5;
    playForFunText.scale.x = 1.1;
    playForFunText.scale.y = 1.1;

    playForFun.addChild(playForFunText)

    this.modeContainer.addChildAt(playForReal,1);
    this.modeContainer.addChildAt(playForFun,1);
}