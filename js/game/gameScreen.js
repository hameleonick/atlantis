/**
 * Created by nkapravchuk on 1/22/15.
 */

function GameScreen(gameStage){
    this.initialize(gameStage)
}

var protoGS = GameScreen.prototype;

protoGS.initialize = function(game){

    window.startAllSlots = false;
    this.gameStage = game.gameStage;
    this.game = game;

    this.gameContainer = null;
    this.elementsToResize = [];
    this.configurationSlots = [];
    this.getSlotsConfiguration();
    this.setupView();

};

protoGS.getSlotsConfiguration = function(){
    this.configurationSlots = [[9,2,11,12,9,4,5,9,7,8,11,5,9,4,6,9,5,7,8,7,11,3,7,12,9,4,6,12,11,3,7,12,9,4,6,8,10,5,11,3,7,11,2,9,7,2,11,7,2,8,9,4,6,8,5,7,11,10,5,11,10,9,4,6,10,11,5,10,11],
        [8,3,12,6,8,7,9,6,10,2,8,10,7,4,10,12,5,9,6,5,8,3,6,8,6,1,6,9,8,3,12,10,11,4,10,12,6,3,12,10,11,4,12,2,7,10,8,12,10,2,11,4,10,12,5,8,7,12,8,5,12,11,4,10,12,8,6,10,9],
        [5,7,6,11,12,1,9,6,11,2,9,11,12,5,10,12,11,10,12,8,10,3,11,9,7,4,9,11,10,3,11,9,7,4,9,11,8,3,11,6,7,4,11,2,7,10,9,6,8,5,7,4,9,6,5,9,7,8,5,11,5,7,4,9,6,8,5,7,8],
        [10,1,11,6,8,2,9,6,11,3,9,12,7,6,12,7,6,11,7,6,5,3,9,5,11,4,10,5,9,3,6,5,11,4,10,8,7,2,12,8,10,4,11,10,12,6,11,9,8,10,12,4,10,12,5,12,9,8,5,10,8,12,4,10,12,7,5,8,7],
        [7,4,11,6,12,1,9,6,11,2,9,11,5,12,1,6,9,8,7,12,10,3,12,10,9,4,6,10,12,3,5,10,9,4,6,10,12,3,10,12,7,2,11,9,8,6,9,8,7,5,9,4,8,7,5,8,10,7,6,8,5,7,4,11,8,7,6,12,11]];

    this.winCombination = [4, 15 , 30 , 8, 29];
};

protoGS.setupView = function(){

    this.cacheSlotTextures();
    this.setupGameContainer();
    this.setupSlotsContainer();
    this.setupSpinContainer();
    this.setupTopBar();
    this.setupMenu();
    this.setupJackpots();
    this.setupAdditionalElements()


};

protoGS.setupAdditionalElements = function(){
    // 948 / 564

    // 158 / 141

    var turtleImg = new Image();
    turtleImg.src = "./img/turtle.png";
    var turtleBaseTexture = new PIXI.BaseTexture(turtleImg, PIXI.scaleModes.DEFAULT);
    var turtleTexture =  new PIXI.Texture(turtleBaseTexture, new PIXI.Rectangle(0, 0, 158, 141));
    var turtle = new PIXI.Sprite(turtleTexture);
    this.Turtle = turtle;
    turtle.currentSlideX = 0;
    turtle.currentSlideY = 0;
    turtle.rotation =0.5
    turtle.resizeFunc = function(resizeParams){
        this.position.x = resizeParams.deviceWidth + 160  ;
        this.position.y = -150  ;
        this.scale.x =  resizeParams.scaleDeltaMin;
        this.scale.y = resizeParams.scaleDeltaMin;
        this.resizeParams = resizeParams;
    }

    turtle.startAnimation = function(){
        this.animationTimer = setInterval(function(){
            if(this.currentSlideX == 6)
            {
                this.currentSlideX = 0;
                this.currentSlideY++;
            }
            if(this.currentSlideY == 4)
            {
                this.currentSlideY = 0;
            }
            var turtleTexture =  new PIXI.Texture(turtleBaseTexture, new PIXI.Rectangle(this.currentSlideX*158, this.currentSlideY*141, 158, 141));
            this.setTexture(turtleTexture);
            this.currentSlideX++;
        }.bind(this),80);
    }

    turtle.stopAnimation = function(){
        clearInterval(this.animationTimer)
    }

    turtle.startMoving = function(){
        var self = this;
        this.startAnimation();
        var nextPositionX = -160;
        var nextPositionY = this.resizeParams.deviceHeight - 150;
        this.scale.y =  this.resizeParams.scaleDeltaMin;
        this.rotation = 0.5
        if(this.position.x == -160){
            nextPositionX = this.resizeParams.deviceWidth + 160;
            nextPositionY = 0;
            this.scale.y =  -this.resizeParams.scaleDeltaMin;
            this.rotation = 1.6
        }

        TweenMax.to(this, 30, {x:nextPositionX, y:nextPositionY,ease:Linear.easeNone, onUpdate:function(){

            },onComplete:function(){
            self.stopAnimation();
        }
        })
    }

    this.gameStage.addChildAt(turtle,1);
    this.elementsToResize.push(turtle);

    setInterval(this.Turtle.startMoving.bind(this.Turtle),60000)
}

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
        this.position.x = resizeParams.deviceWidth / 2  ;
        this.position.y = resizeParams.deviceHeight / 2 + 40*scale;
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

    var maskframe = new PIXI.Graphics();
    maskframe.beginFill();
    maskframe.drawRect(-frame.width/2 + 25,-frame.height/2 + 20  ,frame.width- 50,frame.height-40);
    maskframe.endFill();

//    maskframe.position.x = -100;
//    frame.mask = maskframe
    frame.addChild(maskframe)

    var logo = new PIXI.Sprite.fromImage("./img/logo.png");

    logo.anchor.x = 0.5;
    logo.anchor.y = 0.5;

    logo.position.x = -95;
    logo.position.y = -200;

    var ways243 =  new PIXI.Sprite.fromImage("./img/243.png");
    ways243.anchor.x = 0.5;
    ways243.anchor.y = 0.5;

    ways243.position.x = -95;
    ways243.position.y = 200;

    var ways243Text = new PIXI.Text("243 WAYS TO WIN", {fill:"black",font:"bold 14pt Helvetica"});
    ways243Text.anchor.x = 0.5;
    ways243Text.anchor.y = 0.5;
    ways243Text.position.y = 1;

    ways243.addChild(ways243Text);


    var slotsContainer = new PIXI.DisplayObjectContainer();
    slotsContainer.mask = maskframe;
    this.slotObjs = this.generateSlots();

    for(var i=0;i<5;i++)
    {
        for(var j=0;j<4;j++)
        {
            slotsContainer.addChild(this.slotObjs[i].slots[j])
        }
    }


    window.testSlot = this.slotObjs;

    frame.addChild(slotsContainer)


    this.gameContainer.addChildAt(frame,0);
//    this.gameContainer.addChildAt(maskframe,1);
    this.gameContainer.addChildAt(logo,1);
    this.gameContainer.addChildAt(ways243,1);
}

protoGS.runSlots = function(){
//    if(window.startAllSlots){
        this.slotObjs[0].startSlotRunning();
        setTimeout(function(){
            this.slotObjs[1].startSlotRunning();
            setTimeout(function(){
                this.slotObjs[2].startSlotRunning();
                setTimeout(function(){
                    this.slotObjs[3].startSlotRunning();
                    setTimeout(function(){
                        this.slotObjs[4].startSlotRunning();
                    }.bind(this),70)
                }.bind(this),70)
            }.bind(this),70)
        }.bind(this),70)
//    }
}

protoGS.runningSlots = function(slots){
    var slotsList = slots;
    var self = this;
    var anim = new TweenMax.to(slotsList, 0.5, {y:"+=250",onUpdate:function(){
//        console.log("GOOD NEWS")
//        console.log(slotsList[3].position.y)
        if(slotsList[3].position.y>=100)
        {

            var slot = slotsList.pop();
            slot.changeState();
//
//            console.log(slot.position.y)
            slot.position.y = -313 + (slot.position.y-200);
            slotsList.unshift(slot);
            anim.kill();
            if(!stopSlots)
                self.runningSlots(slotsList);
            else if(count<20)
            {
                self.runningSlots(slotsList);
                count++;
            }
            else{
                console.log("nooooo")
                console.log(slotsList[3].position.y - 77)
                new TweenMax.to(slotsList, 0.3, {y:"-=30", onComplete:function(){
                    console.log("complete")
                }});
            }



        }
    }, onComplete:function(){
        console.log("conplete")


    }});
}

protoGS.cacheSlotTextures = function(){
    var img = new Image();
    img.src = "./img/symbols-anim.png"
    var imgBlur = new Image();
    imgBlur.src = "./img/symbols-anim-blur.png"
    var texture = new PIXI.BaseTexture(img, PIXI.scaleModes.DEFAULT);
    var textureBlur = new PIXI.BaseTexture(imgBlur, PIXI.scaleModes.DEFAULT);

//    this.textures = [{},{}];
//    var tempText =
var j=12;
    for(var i=0;i<12;i++){
        var slotTextureBlur =  new PIXI.Texture(textureBlur, new PIXI.Rectangle(0, i*100, 100, 100));
        var slotTexture =  new PIXI.Texture(texture, new PIXI.Rectangle(0, i*100, 100, 100));
//        this.textures[0][i] = slotTexture;
//        this.textures[1][i] = slotTextureBlur

        PIXI.Texture.addTextureToCache(slotTexture,i)
        PIXI.Texture.addTextureToCache(slotTextureBlur,j)
        j++;
    }

}

// y 202
protoGS.generateSlots = function(){
//    var img = new Image();
//    img.src = "./img/symbols-anim.png"
//    var imgBlur = new Image();
//    imgBlur.src = "./img/symbols-anim-blur.png"
//    var texture = new PIXI.BaseTexture(img, PIXI.scaleModes.DEFAULT);
//    var textureBlur = new PIXI.BaseTexture(imgBlur, PIXI.scaleModes.DEFAULT);

    var changeState = function(){

        this.parentObj.slotCurrentIndex++;
        if(this.configurationSlots.length == this.parentObj.slotCurrentIndex)
            this.parentObj.slotCurrentIndex = 0;

        this.slotCurrentIndex = this.parentObj.slotCurrentIndex;
        if(this.parentObj.blurEffect)
            var slotTexture = PIXI.TextureCache[this.configurationSlots[this.parentObj.slotCurrentIndex]+11] //new PIXI.Texture(textureBlur, new PIXI.Rectangle(0, (this.configurationSlots[this.parentObj.slotCurrentIndex]-1)*100, 100, 100));
        else
            var slotTexture = PIXI.TextureCache[this.configurationSlots[this.parentObj.slotCurrentIndex]-1]; // PIXI.Texture(texture, new PIXI.Rectangle(0, (this.configurationSlots[this.parentObj.slotCurrentIndex]-1)*100, 100, 100));
        this.setTexture(slotTexture);
    }

    var showBlur = function(show){
        this.blurEffect = show;
    }

    var startSlotRunning = function(){
//            this.continueSlotRunning()
//            this.showBlur(true);
//        return;

        var self = this;
        self.stopContinueSlots = false;
        setTimeout(function(){
            self.showBlur(false);
            self.slotCurrentIndex = self.winCombination[self.drumIndex]-3;
            self.stopContinueSlots = true;
        },3000)

        TweenMax.to(this.slots, 0.2, {y:"+=125",ease:Back.easeIn, onComplete:function(){
            self.continueSlotRunning();
            self.showBlur(true);
        }});
    }

    var continueSlotRunning = function(){
        var slotsList = this.slots;
        var self = this;
        self.lastAnimationTime = new Date().getTime();
//        slotsList[0].position.y += 30;
//        slotsList[1].position.y += 30;
//        slotsList[2].position.y += 30;
//        slotsList[3].position.y += 30;
//        if(slotsList[3].position.y>=200)
//        {
//            var slot = slotsList.pop();
//            slot.changeState();
//            slot.position.y = -313;
//            slotsList.unshift(slot);
//        }
//        return
//TODO: SteppedEase - for future optimizations
        var speed = 0.15;
        if(meter.fps <=15)
            speed = 0.55;
        var anim = new TweenMax.to(slotsList, speed, {y:"+=300.5", ease:Linear.easeNone,onUpdate:function(){
            if(slotsList[3].position.y>=170)
            {

                var slot = slotsList.pop();
                slot.changeState();
//
                slot.position.y = -313 + (slot.position.y-200);
                slotsList.unshift(slot);
                anim.kill();
                if(!self.stopContinueSlots)
                    self.continueSlotRunning();
                else{
                    if(self.slotCurrentIndex == self.winCombination[self.drumIndex]+1){
                        self.stopSlots();
                    }
                    else
                        self.continueSlotRunning();
                }

            }
        }});
    }

    var stopSlots = function(){

        var slotsList = this.slots;
        var self = this;
        var delta = slotsList[0].position.y+313;
        TweenMax.to(slotsList, 0.4, {y:"-="+delta,ease:Back.easeOut, onComplete:function(){
            var index =  Math.floor((Math.random() * 3) + 1);
            setTimeout(function(){slotsList[index].showWinAnimation();},(4-self.drumIndex)*70);
        }});
    }

    var imgWin = new Image();
    imgWin.src = "./img/symbolsAnim/general.png"
    var baseTextureWin = new PIXI.BaseTexture(imgWin, PIXI.scaleModes.DEFAULT);

    var showWinAnimation = function(){
        var slide = 0;
        var self = this;
        var count = 0;
        var winTimer = setInterval(function(){
            if(slide==20) {
                slide = 0;
                count++;
            }


            var winTexture =  new PIXI.Texture(baseTextureWin, new PIXI.Rectangle(slide*120, 0, 120, 120));
//            var win = new PIXI.Sprite(winTexture);
            self.getChildAt(0).setTexture(winTexture);
            if(count == 3)
            {
                clearInterval(winTimer)
            }
            slide++;
        },80)

    }


//    var slots = [];
    var slotObjs = {};
    for(var i=0;i<5;i++)
    {
        slotObjs[i] = {slots:[], slotCurrentIndex:0};
        slotObjs[i].startSlotRunning = startSlotRunning;
        slotObjs[i].continueSlotRunning = continueSlotRunning;
        slotObjs[i].showBlur = showBlur;
        slotObjs[i].stopSlots = stopSlots;
        slotObjs[i].drumIndex = i;
        slotObjs[i].winCombination = this.winCombination;
        for(var j=0;j<4;j++)
        {
//            if(!slots[i])11
            var slotTexture =  PIXI.TextureCache[this.configurationSlots[i][j]-1]//new PIXI.Texture(texture, new PIXI.Rectangle(0, (this.configurationSlots[i][j]-1)*100, 100, 100));
            var slot = new PIXI.Sprite(slotTexture);
            slot.slotCurrentIndex = j;
            slotObjs[i].slotCurrentIndex = j;
            slot.configurationSlots = this.configurationSlots[i];
            slot.changeState = changeState;
            slot.showWinAnimation = showWinAnimation;
            var winTexture =  new PIXI.Texture(baseTextureWin, new PIXI.Rectangle(0, 0, 120, 120));
            var win = new PIXI.Sprite(winTexture);
            win.position.x = -15;
            win.position.y = -10;
            slot.addChild(win);
            var deltaY = 0;
            var deltaX = 0
            if(j)
                deltaY = 30;
            if(i)
                deltaX = 37;
            slot.position.y = -313 + (j*(100+deltaY));
            slot.position.x = -335 + (i*(100+deltaX));
            slot.scale.x = 1.2;
            slot.scale.y = 1.2;
            slotObjs[i].slots.push(slot);
            slot.parentObj = slotObjs[i];
        }
    }

    return slotObjs;
}

protoGS.setupSpinContainer = function(){
    var self = this;

    this.spinContainer = new PIXI.DisplayObjectContainer();

    var img = new Image();
    img.src = "./img/spin_sprite.png"
    var texture = new PIXI.BaseTexture(img, PIXI.scaleModes.DEFAULT);
    var spinTexture =  new PIXI.Texture(texture, new PIXI.Rectangle(0, 0, 401, 400));
    var spin = new PIXI.Sprite(spinTexture);

    spin.interactive = true;
    spin.buttonMode = true;

    spin.scale.x = 0.5;
    spin.scale.y = 0.5;

    spin.position.x = 265;
    spin.position.y = -100;

    spin.mousedown = spin.touchstart = function(data) {
        this.data = data;
        this.alpha = 0.8;
    }

    spin.mouseup = spin.mouseupoutside = spin.touchend = spin.touchendoutside = function (data) {
        this.alpha = 1
        // set the interaction data to null
        this.data = null;
//        window.startAllSlots = true;
        self.runSlots();
//        self.runSlots(self.slots[0],function(){
//            self.runSlots(self.slots[1], function(){
//                self.runSlots(self.slots[2], function(){
//                    self.runSlots(self.slots[3], function(){
//                        self.runSlots(self.slots[4]);
//                    });
//                });
//            });
//        });






    };

    spin.changeState = function(){

    }

    var img = new Image();
    img.src = "./img/bet_sprite.png"
    var texture = new PIXI.BaseTexture(img, PIXI.scaleModes.DEFAULT);
    var betTexture =  new PIXI.Texture(texture, new PIXI.Rectangle(0, 0, 198, 60));
    var bet = new PIXI.Sprite(betTexture);

    bet.position.x = 265;
    bet.position.y = 120;

    var betText = new PIXI.Text("BET 0.1", {fill:"black",font:"bold 20pt Helvetica"});
    betText.anchor.x = 0.5;
    betText.anchor.y = 0.5;

    betText.position.x = 100;
    betText.position.y = 35;

    bet.addChild(betText);

    bet.interactive = true;
    bet.buttonMode = true;

    bet.mousedown = bet.touchstart = function(data) {
        this.data = data;
        this.alpha = 0.8;
    }

    bet.mouseup = bet.mouseupoutside = bet.touchend = bet.touchendoutside = function (data) {
        this.alpha = 1
        // set the interaction data to null
        this.data = null;
    };

    var img = new Image();
    img.src = "./img/ASButtons.png"
    var texture = new PIXI.BaseTexture(img, PIXI.scaleModes.DEFAULT);
    var autospinTexture =  new PIXI.Texture(texture, new PIXI.Rectangle(0, 115, 191, 60));
    var autospin = new PIXI.Sprite(autospinTexture);

    autospin.position.x = 270;
    autospin.position.y = -165;

    var autospinText = new PIXI.Text("Autospin", {fill:"black",font:"bold 20pt Helvetica"});
    autospinText.anchor.x = 0.5;
    autospinText.anchor.y = 0.5;

    autospinText.position.x = 95;
    autospinText.position.y = 35;

    autospin.addChild(autospinText);

    this.spinContainer.addChildAt(spin, 0);
    this.spinContainer.addChildAt(bet, 0);
    this.spinContainer.addChildAt(autospin, 0);
    this.gameContainer.addChildAt(this.spinContainer,1);

}

protoGS.setupTopBar = function(){
//    #90c8ff
    var topbar = new PIXI.Graphics();

    var totalBetText = new PIXI.Text("Total Bet: 2.5", {fill:"white",font:"bold 11.5pt Helvetica"});
    totalBetText.anchor.x = 0;
    totalBetText.anchor.y = 0;

    var balanceText = new PIXI.Text("Balance: 500", {fill:"white",font:"bold 11.5pt Helvetica"});
    balanceText.anchor.x = 0;
    balanceText.anchor.y = 0;


    topbar.resizeFunc = function(resizeParams){

        topbar.beginFill(0x024181);
        topbar.lineStyle(1, 0x024181, 1);
        topbar.drawRect(0, 0, resizeParams.deviceWidth,  15*resizeParams.scaleDeltaMin);
        topbar.endFill();

        balanceText.scale.x = resizeParams.scaleDeltaMin
        balanceText.scale.y = resizeParams.scaleDeltaMin
        balanceText.position.x = resizeParams.deviceWidth - balanceText.width;

        totalBetText.scale.x = resizeParams.scaleDeltaMin
        totalBetText.scale.y = resizeParams.scaleDeltaMin

    }

    topbar.addChild(totalBetText)
    topbar.addChild(balanceText)
    this.elementsToResize.push(topbar);

    this.gameStage.addChildAt(topbar, 1);

//    this.gameContainer.addChildAt(topbar,1);
}

protoGS.setupMenu = function(){
    var self = this;
    var img = new Image();
    img.src = "./img/externals/brands/PCC/menu_tabs.png"
    var texture = new PIXI.BaseTexture(img, PIXI.scaleModes.DEFAULT);
    var menuButtonTexture =  new PIXI.Texture(texture, new PIXI.Rectangle(0, 0, 44, 110));
    var menuButton = new PIXI.Sprite(menuButtonTexture);

    menuButton.anchor.x = 0;
    menuButton.anchor.y = 0.5;

    menuButton.interactive = true;
    menuButton.buttonMode = true;

    menuButton.resizeFunc = function(resizeParams){
        menuButton.position.y = resizeParams.deviceHeight/2;
        menuButton.scale.x = 0.75*resizeParams.scaleDeltaMin;
        menuButton.scale.y = 0.75*resizeParams.scaleDeltaMin;
    }

    menuButton.mousedown = menuButton.touchstart = function(data) {
        this.data = data;
        this.alpha = 0.8;
    }

    menuButton.mouseup = menuButton.mouseupoutside = menuButton.touchend = menuButton.touchendoutside = function (data) {
        this.alpha = 1
        // set the interaction data to null
        this.data = null;
        self.showGameScreen(false);
        self.game.setupModeScreen();
    };

    this.elementsToResize.push(menuButton);

    this.gameStage.addChildAt(menuButton, 1);
}

protoGS.setupJackpots = function(){
    var img = new Image();
    img.src = "./img/jpTicker.png";
    var texture = new PIXI.BaseTexture(img, PIXI.scaleModes.DEFAULT);
    var herculesTexture =  new PIXI.Texture(texture, new PIXI.Rectangle(0, 0, 254, 62));
    var hercules = new PIXI.Sprite(herculesTexture);
    hercules.position.x = -315;
    hercules.position.y = -240;
    hercules.anchor.x = 0.5
    hercules.anchor.y = 0.5

    var poseidonTexture =  new PIXI.Texture(texture, new PIXI.Rectangle(0, 63, 254, 62));
    var poseidon = new PIXI.Sprite(poseidonTexture);
    poseidon.position.x = 123;
    poseidon.position.y = -240;
    poseidon.anchor.x = 0.5
    poseidon.anchor.y = 0.5


    this.gameContainer.addChild(hercules)
    this.gameContainer.addChild(poseidon)
}

protoGS.showGameScreen = function(show){
    if(show){
        this.resize();
        this.gameStage.addChildAt(this.gameContainer,2);
        this.Turtle.startMoving();
    }
    else{
        this.gameContainer.removeChildren();
        while(this.gameStage.children.length>1){
            this.gameStage.removeChildAt(1);
        }
        delete this.game.gameScreen;
    }
}

protoGS.resize = function(){
    var resizeParams = getResizeParams();
    for (var i = 0; i < this.elementsToResize.length; i++) {
        this.elementsToResize[i].resizeFunc(resizeParams);
    }
}

