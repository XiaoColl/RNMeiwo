

import {USER} from '../type'
import UserDao from '../../dao/userDao'
import * as Constant from '../../style/constant'
import store from '../'
import {AsyncStorage} from 'react-native'

const {dispatch, getState} = store;

/**
 * 初始化用户信息
 */
const initUserInfo = async () => {
    let token = await AsyncStorage.getItem(Constant.TOKEN_KEY);
    let res = await UserDao.getUserInfoLocal();
    if (res && res.result && token) {
        dispatch({
            type: USER.USER_INFO,
            res: res.data
        });
    }
    return {
        result: res.result && (token !== null),
        data: res.data
    };

};

/**
 * 获取登录用户信息
 */
const getLoginInfo = async (params) => {
    let res = await UserDao.getLoginInfo(params);
    if (res && res.result) {
        dispatch({
            type: USER.USER_INFO,
            res: res.data
        });
    }
    return res;
};

/**
 * 清除登录用户信息
 */
const clearUserInfo = () => {
    AsyncStorage.removeItem(Constant.USER_INFO);
    dispatch({
        type: USER.USER_INFO,
        res: null
    });
};



export default {
    initUserInfo,
    getLoginInfo,
    clearUserInfo,
}
