import {AsyncStorage} from 'react-native'

import {LOGIN} from '../type'
import * as Constant from '../../style/constant'
import UserDao from '../../dao/userDao'


/**
 * 登陆请求
 */
const doLogin = (userName, password, callback) => async (dispatch, getState) => {
    AsyncStorage.setItem(Constant.USER_NAME_KEY, userName);

    let requestParams = {
        loginname: userName,
        userpassword: password
    };

    let res = await UserDao.getLoginInfo(requestParams);

    if (res && res.result) {
        AsyncStorage.setItem(Constant.PW_KEY, password);
        AsyncStorage.setItem(Constant.USER_INFO, JSON.stringify(res));

        dispatch({
            type: LOGIN.IN,
            res
        });
    }
    setTimeout(() => {
        callback && callback(res.result);
    }, 1000)
};


// /**
//  * 退出登录
//  */
// const loginOut = () => async (dispatch, getState) => {
//     Api.clearToken();
//     userAction.clearUserInfo();
//     clear(getState);
//     dispatch({
//         type: LOGIN.CLEAR,
//     });
// };

export default {
    doLogin,
}