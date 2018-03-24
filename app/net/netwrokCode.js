import {Toast} from 'antd-mobile';
import {Actions} from "react-native-router-flux";

//网络错误
export const NETWORK_ERROR = 1;
//网络超时
export const NETWORK_TIMEOUT = 2;
//网络返回数据格式化一次
export const NETWORK_JSON_EXCEPTION = 3;


export const SUCCESS = 200;


export default function (code, statusText) {
    switch (code) {
        case 401:
            //授权逻辑
            if (Actions.currentScene !== 'loginPage') {
                Actions.reset("loginPage");
            }
            return "未授权或授权失败";//401 Unauthorized
        case 403:
            Toast.info("403权限错误", 1);
            return "403权限错误";
        case 404:
            Toast.info("404错误", 1);
            return "404错误";
        case 410:
            Toast.info("410错误", 1);
            return "410错误";
        case NETWORK_TIMEOUT:
            //超时
            Toast.info('网络超时', 1);
            return '网络超时';
        default:
            if (statusText) {
                Toast.info(statusText, 1);
            } else {
                Toast.info("其他异常", 1);
            }
            return "其他异常"
    }

}