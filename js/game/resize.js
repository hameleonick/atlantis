/**
 * Created by nkapravchuk on 16.01.15.
 */

window.elementsToResize = [];

function getResizeParams(){

    /*
     this.deviceWidth = window.innerWidth;
     this.deviceHeight = window.innerHeight;
     */
    var standartWidth = 640;
    var standartHeight = 960;
    this.deviceWidth = window.innerWidth;
    this.deviceHeight = window.innerHeight;
    var orientationType = 0; // 0:portrait; 1:landscape
    if(window.innerWidth > window.innerHeight)
    {
        standartWidth = 960;
        standartHeight = 640;
        orientationType = 1;
    }

    var scaleWidthFactor = (this.deviceWidth / standartWidth);
    var scaleHeightFactor = (this.deviceHeight / standartHeight);

    var scaleDeltaMin = Math.min(scaleWidthFactor, scaleHeightFactor);
    var scaleDeltaMax = Math.max(scaleWidthFactor, scaleHeightFactor);

    var resizeParams = {orientationType: orientationType,deviceWidth: this.deviceWidth, deviceHeight:this.deviceHeight,scaleWidthFactor:scaleWidthFactor, scaleHeightFactor:scaleHeightFactor, scaleDeltaMin:scaleDeltaMin, scaleDeltaMax:scaleDeltaMax};

    return resizeParams;

}