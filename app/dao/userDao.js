import {AsyncStorage} from 'react-native'
import Api from '../net'
import Address from '../net/address'
import * as Constant from '../style/constant'


/**
 * 获取本地登录用户信息
 */
const getUserInfoLocal = async () => {
    let userText = await AsyncStorage.getItem(Constant.USER_INFO);
    if (userText) {
        console.log('获取本地登录用户信息 : getUserInfoLocal', userText);
        let res = JSON.parse(userText);
        return {
            result: true,
            data: res
        }
    } else {
        return {
            result: false
        }
    }
};

/**
 * 获取登录用户信息
 */
const getLoginInfo = async (params) => {
    let res = await Api.netFetch(Address.getLoginInfo(), 'POST', params, false);

    if (res && res.result) {
        AsyncStorage.setItem(Constant.TOKEN_KEY, res.data.token);

        //TODO 存数据库操作暂时忽略

        console.log('获取登录用户信息 getLoginInfo', res.data.model);

        return {
            result: true,
            data: res.data.model
        }
    } else {
        return {
            result: false
        }
    }
};


export default {
    getUserInfoLocal,
    getLoginInfo
}
