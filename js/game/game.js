/**
 * Created by nkapravchuk on 15.01.15.
 */

var game;

function GameAtlantis(){

    this.initialize();

//
//    return {
//
//        getInstance:function(){
//            if(!(game instanceof GameAtlantis))
//            {
//                game = new GameAtlantis();
//            }
//
//            return game;
//        }
//    }
}

var protoGA = GameAtlantis.prototype;

protoGA.initialize = function(){

    this.deviceWidth = window.innerWidth;
    this.deviceHeight = window.innerHeight;

    this.assetLoader = null;

    this.gameStage = null;

    this.setupBaseGameEventListeners();

    this.initAssetsLoader();

}

protoGA.runGame = function(){
    this.assetLoader.load();
}

protoGA.initAssetsLoader = function(){
    var assets = [
        "./img/bg.png",
        "./img/bet_select.png",
        "./img/frame.png",
        "./img/logo.png",
        "./img/coral_right.png",
        "./img/coral_left.png",
        "./img/symbols-anim.png",
        "./img/pfr_pff.png",
        "./img/loader.png",
        "./img/splash_ornament.png",
        "./img/spin_sprite.png"

    ];
    this.assetLoader=new PIXI.AssetLoader(assets);

    this.assetLoader.addEventListener("onComplete",function(e){
        this.setupGame();
        this.run();
        this.setupModeScreen(true);
    }.bind(this));

}

protoGA.setupGame = function(params){

    this.setupStage();
    this.setupBackground();
}

protoGA.setupModeScreen = function(loadGame){
    this.modeScreen = new ModeScreen(this);
    this.modeScreen.showModeScreen(true, loadGame);
}

protoGA.setupGameScreen = function(){
    this.gameScreen = new GameScreen(this);
    this.gameScreen.showGameScreen(true);
}

protoGA.setupStage = function(){
    this.gameStage = new PIXI.Stage(0x000613,true);
    this.gameStage.setBackgroundColor(0x000613);
}

protoGA.setupBackground = function(){

    this.backgroundContainer = new PIXI.DisplayObjectContainer();

    this.backgroundContainer.resizeFunc = function (resizeParams) {
        this.scale.x = resizeParams.scaleDeltaMin
        this.scale.y = resizeParams.scaleDeltaMin
        this.position.x = resizeParams.deviceWidth / 2;
        this.position.y = resizeParams.deviceHeight / 2;
    }

    window.elementsToResize.push(this.backgroundContainer);
    this.gameStage.addChildAt(this.backgroundContainer,0);

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

    window.elementsToResize.push(this.backgroundElement);
    this.backgroundContainer.addChildAt(this.backgroundElement,0);

}

protoGA.run = function(){

    this.renderer = new PIXI.autoDetectRenderer(this.deviceWidth, this.deviceHeight,{autoResize:true,view:null, transparent:false, antialias:false, preserveDrawingBuffer:false, resolution:window.devicePixelRatio, clearBeforeRender:true});
    this.resize();
    document.body.appendChild(this.renderer.view);

    var self = this;
    requestAnimationFrame(animate);

    function animate() {
        self.renderer.render(self.gameStage);
        requestAnimationFrame(animate);
    }

}

protoGA.resize = function(){
    setTimeout(function() {
        var resizeParams = getResizeParams();
        this.renderer.resize(resizeParams.deviceWidth, resizeParams.deviceHeight)
        for (var i = 0; i < elementsToResize.length; i++) {
            elementsToResize[i].resizeFunc(resizeParams)
        }
    }.bind(this),100);
}

protoGA.setupBaseGameEventListeners = function(){
    window.addEventListener('resize', this.resize.bind(this), false);
    window.addEventListener('orientationchange', this.resize.bind(this), false);
}
