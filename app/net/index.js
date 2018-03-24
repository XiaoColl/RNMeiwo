import {NetInfo, AsyncStorage} from 'react-native';
import {Toast} from 'antd-mobile';
import {Actions} from 'react-native-router-flux';

import * as Constant from '../style/constant'
import * as Code from './netwrokCode'
import handlerError from './netwrokCode'


export const CONTENT_TYPE_JSON = "application/json; charset=utf-8";
export const CONTENT_TYPE_FORM = "application/x-www-form-urlencoded";

class HttpManager {

    constructor() {
        this.optionParams = {
            timeoutMs: 15000,
            token: null,
        };
    };

    /**
     * get请求
     *
     * @param url 请求url
     * @param header 外加头
     * @return {Promise.<*>}
     */
    async getFetch(url, header) {
        return this.netFetch(url, 'GET', null, null, header)
    }

    /**
     * 发起网络请求
     * @param url 请求url
     * @param method 请求方式
     * @param params 请求参数
     * @param json 是否需要json格式的参数请求
     * @param header 外加头
     * @return {Promise.<*>}
     */
    async netFetch(url, method = 'GET', params, json, header) {
        let isConnected = await NetInfo.isConnected.fetch().done;

        if (!isConnected) {
            return {
                result: false,
                code: Code.NETWORK_ERROR,
                msg: '网络错误'
            }
        }

        let headers = {};
        if (header) {
            headers = Object.assign({}, headers, header)
        }

        //授权码
        if (!this.optionParams.token) {
            let token = await this.getToken();
            if (token) {
                this.optionParams.token = token;
                headers.cookie = 'token=' + this.optionParams.token;
            }
        } else {
            headers.cookie = 'token=' + this.optionParams.token;
        }

        let requestParams;

        if (method !== 'GET') {
            if (json) {
                requestParams = this.formParamsJson(method, params, headers)
            } else {
                requestParams = this.formParams(method, params, headers)
            }
        } else {
            requestParams = this.formParams(method, params, headers)
        }

        let response = await this.requestWithTimeout(this.optionParams.timeoutMs, fetch(url, requestParams));

        if (__DEV__) {
            console.log('请求url: ', url);
            console.log('请求参数: ', requestParams);
            console.log('返回参数: ', response);
        }

        if (response && response.status === Code.NETWORK_TIMEOUT) {
            return {
                result: false,
                code: response.status,
                data: handlerError(response.status, response.statusText),
            }
        }

        try {
            let responseJson = await response.json();

            console.log('返回JSON: ', responseJson);

            if (response.status === 200 || response.status === 201) {
                if (response.status === "10") {
                    Toast.fail("登录过期，请重新登录", 2)
                    Actions.loginP();
                    return null
                }
                if (responseJson.status === "1" || responseJson.status === "200") {
                    return {
                        result: true,
                        code: Code.SUCCESS,
                        data: responseJson.value,
                        headers: response.headers
                    }
                }
                return {
                    result: false,
                    code: responseJson.status,
                    data: responseJson.msg
                }
            }
        } catch (e) {
            console.log(e, url);
            return {
                result: response.ok,
                code: response.status ? response.status : Code.NETWORK_JSON_EXCEPTION,
                data: response._bodyText,
                response
            }
        }

        return {
            result: false,
            code: response.status,
            data: handlerError(response.status, response.statusText),
        }
    }

    /**
     * 清除授权
     */
    clearToken() {
        this.optionParams.token = null;
        AsyncStorage.removeItem(Constant.TOKEN_KEY);
    }


    /**
     * 获取授权token
     */
    async getToken() {
        let token = await AsyncStorage.getItem(Constant.TOKEN_KEY);
        return token;
    }

    /**
     * 格式化json请求参数
     */
    formParamsJson(method, params, headers) {
        const body = JSON.stringify(params);
        const req = {
            method: method,
            // cookieEnabled: true,
            // cookies: 'token=' + this.optionParams.token,
            // cookie: 'token=' + this.optionParams.token,
            headers: new Headers({
                'Content-Type': CONTENT_TYPE_JSON,
                // 'token': this.optionParams.token,
                // 'cookies': 'token=' + this.optionParams.token,
                // 'cookie': 'token=' + this.optionParams.token,
                ...(headers || {})
            }),
            body
        };
        return req
    }

    /**
     * 格式化表单请求参数
     */
    formParams(method, params, headers) {
        const str = [];
        for (let p in params) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
        }
        let body = null;
        if (str.length > 0) {
            body = str.join("&");
        }
        const req = {
            method: method,
            // cookieEnabled: true,
            // cookies: 'token=' + this.optionParams.token,
            // cookie: 'token=' + this.optionParams.token,
            headers: new Headers({
                    'Content-Type': CONTENT_TYPE_FORM,
                    // 'token': this.optionParams.token,
                    // 'cookies': 'token=' + this.optionParams.token,
                    // 'cookie': 'token=' + this.optionParams.token,
                    ...(headers || {})
                }
            ),
            body
        };
        return req
    }

    /**
     * 超时管理
     */
    requestWithTimeout(ms, promise) {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                resolve({
                    status: Code.NETWORK_TIMEOUT,
                    message: '网络超时'
                })
            }, ms);
            promise.then(
                (res) => {
                    clearTimeout(timeoutId);
                    resolve(res);
                },
                (err) => {
                    clearTimeout(timeoutId);
                    resolve(err);
                }
            );
        })
    }

}

export default new HttpManager();
