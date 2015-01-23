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
};

protoGS.setupView = function(){

    this.setupGameContainer();
    this.setupSlotsContainer();
    this.setupSpinContainer();
    this.setupTopBar();
    this.setupMenu();

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

    var maskframe = new PIXI.Graphics();
    maskframe.beginFill();
    maskframe.drawRoundedRect(-frame.width/2 + 25,-frame.height/2 + 20  ,frame.width- 50,frame.height-40,30);
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
    var slots = this.generateSlots();
//    slotsContainer.addChild(slots[0][0])
//    slotsContainer.addChild(slots[0][1])
//    slotsContainer.addChild(slots[0][2])
//    slotsContainer.addChild(slots[1][0])
//    slotsContainer.addChild(slots[1][1])
//    slotsContainer.addChild(slots[1][2])
//    slotsContainer.addChild(slots[2][0])
//    slotsContainer.addChild(slots[2][1])
//    slotsContainer.addChild(slots[2][2])
//    slotsContainer.addChild(slots[3][0])
//    slotsContainer.addChild(slots[3][1])
//    slotsContainer.addChild(slots[3][2])
//    slotsContainer.addChild(slots[4][0])
//    slotsContainer.addChild(slots[4][1])
//    slotsContainer.addChild(slots[4][2])

    for(var i=0;i<5;i++)
    {
        for(var j=0;j<4;j++)
        {
            slotsContainer.addChild(slots[i][j])
        }
    }


    window.testSlot = slots[0][0];

    frame.addChild(slotsContainer)


    this.gameContainer.addChildAt(frame,0);
//    this.gameContainer.addChildAt(maskframe,1);
    this.gameContainer.addChildAt(logo,1);
    this.gameContainer.addChildAt(ways243,1);
}

protoGS.generateSlots = function(){
    var img = new Image();
    img.src = "./img/symbols-anim.png"
    var texture = new PIXI.BaseTexture(img, PIXI.scaleModes.DEFAULT);
//    var wildTexture =  new PIXI.Texture(texture, new PIXI.Rectangle(0, 0, 100, 100));
//    var wild = new PIXI.Sprite(wildTexture);

    var changeState = function(){
        this.slotCurrentIndex++;
        if(this.configurationSlots.length == this.slotCurrentIndex)
            this.slotCurrentIndex = 0;
        var slotTexture =  new PIXI.Texture(texture, new PIXI.Rectangle(0, (this.configurationSlots[this.slotCurrentIndex]-1)*100, 100, 100));
        this.setTexture(slotTexture);
    }

    var slots = [];
    for(var i=0;i<5;i++)
    {
        for(var j=0;j<4;j++)
        {
            if(!slots[i])
                slots[i] = [];
            var slotTexture =  new PIXI.Texture(texture, new PIXI.Rectangle(0, (this.configurationSlots[i][j]-1)*100, 100, 100));
            var slot = new PIXI.Sprite(slotTexture);
            slot.slotCurrentIndex = j;
            slot.configurationSlots = this.configurationSlots[i];
            slot.changeState = changeState;

            var deltaY = 0;
            var deltaX = 0
            if(j)
                deltaY = 30;
            if(i)
                deltaX = 37;
            slot.position.y = -183 + (j*(100+deltaY));
            slot.position.x = -335 + (i*(100+deltaX));
            slot.scale.x = 1.2;
            slot.scale.y = 1.2;
            slots[i][j] = slot;
        }
    }

    return slots;
}

protoGS.setupSpinContainer = function(){

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

protoGS.showGameScreen = function(show){
    if(show){
        this.resize();
        this.gameStage.addChildAt(this.gameContainer,1);

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

