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
    var deviceWidth = window.innerWidth;
    var deviceHeight = window.innerHeight;
    var orientationType = 0; // 0:portrait; 1:landscape
    var ratio = deviceHeight / deviceWidth;
    if(window.innerWidth > window.innerHeight)
    {
        standartWidth = 960;
        standartHeight = 640;
        orientationType = 1;

        ratio = deviceWidth/  deviceHeight
    }



    var scaleWidthFactor = (deviceWidth / standartWidth);
    var scaleHeightFactor = (deviceHeight / standartHeight);

    var scaleDeltaMin = Math.min(scaleWidthFactor, scaleHeightFactor);
    var scaleDeltaMax = Math.max(scaleWidthFactor, scaleHeightFactor);

    var resizeParams = {ratio: ratio, orientationType: orientationType,deviceWidth: deviceWidth, deviceHeight:deviceHeight,scaleWidthFactor:scaleWidthFactor, scaleHeightFactor:scaleHeightFactor, scaleDeltaMin:scaleDeltaMin, scaleDeltaMax:scaleDeltaMax};

    return resizeParams;

}


//1024 768 1.333333333333
//2048 1536 1.333333333

//1280 768 1.6

// 960 640 1.5
