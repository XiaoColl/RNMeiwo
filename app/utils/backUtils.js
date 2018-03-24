import React from 'react';
import {
    BackHandler, Platform
} from 'react-native';
import {Toast} from "antd-mobile";
import {Actions} from 'react-native-router-flux';

export default function BackUtils() {
    let hasTip = false;
    let ts;
    return function () {
        if (Actions.state.routes[0].index > (Platform.OS === 'android' ? 1 : 0)) {
            Actions.pop();
            return true;
        }
        ts = Date.now();
        if (!hasTip) {
            let handler = function () {
                let now = Date.now();
                if (now - ts < 1000) {
                    requestAnimationFrame(handler)
                } else {
                    hasTip = false
                }
            };
            handler();
            hasTip = true;
            Toast.info("双击退出", 1);
            return true
        } else {
            BackHandler.exitApp();
            // SplashScreen.exit();
            return true
        }
    }
}
