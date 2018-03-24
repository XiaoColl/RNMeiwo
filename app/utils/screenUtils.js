import React  from 'react';
import {Dimensions, PixelRatio} from 'react-native'


//  mdpi for android
PIXEL_RATIO_160_1 = 1;
// hdp from android
PIXEL_RATIO_240_1d5 = 1.5;
// iphone4, 4s, 5, 5c, 5s, 6, 7; xhdpi from android
PIXEL_RATIO_320_2 = 2;
// iphone6p, 7p; xxhdpi for android,1080p
PIXEL_RATIO_480_3 = 3;
// larger from android
PIXEL_RATIO_560_3x5 = 3.5;

// 设置基准分辨率
BASE_PIXEL_WIDTH = 750;
BASE_PIXEL_HEIGHT = 1334;
BASE_PIXEL_RATIO = PIXEL_RATIO_320_2;

/**
 * @param px  单位px
 * @return 基准分辨率下px转为 当前设备分辨率的dp值
 */
function getPX2CurDP(px) {
    //经过一波公式操作，简化成下列算式
    return Math.round((px * Dimensions.get('window').width / BASE_PIXEL_WIDTH + 0.5));
    // return (px * getScaleSize()) / PixelRatio.get();
}

//
// /**
//  * @param px  单位px
//  * @return 基准分辨率下px转为的dp值
//  */
// function getBaseDP(px) {
//     return px / BASE_PIXEL_RATIO;
// }
//
// /**
//  * 以宽度为标准
//  * @returns 当前设备宽度与 基准分辨率宽度之比
//  */
// function getScaleSize() {
//     return getCurWidth() / BASE_PIXEL_WIDTH;
// }
//
// /**
//  * 以宽度为标准
//  * @returns 当前设备宽度像素总值
//  */
// function getCurWidth() {
//     return Dimensions.get('window').width * PixelRatio.get();
// }

export default {
    WIDTH : Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
    onePixel: 1 / PixelRatio.get(),
    getPX2CurDP,
}