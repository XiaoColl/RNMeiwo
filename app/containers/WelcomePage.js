import React, {Component} from 'react';
import {
    View, Image
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import Images from "../image/Images";

import UserAction from '../store/action/userAction'

import screenUtils from "../utils/screenUtils"

/**
 * 欢迎页
 */
class WelcomePage extends Component {

    constructor(props) {
        super(props);
        this.toNext = this.toNext.bind(this);
    }

    //
    componentDidMount() {
        //是否登陆，是否用户信息
        UserAction.initUserInfo().then((res) => {
            this.toNext(res);
        });
    }

    toNext(res) {
        setTimeout(() => {
            if (res && res.result) {
                Actions.reset("tabbar");
            } else {
                Actions.reset("loginPage");
            }
        }, 1000);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Image style={{width: screenUtils.WIDTH, height: screenUtils.HEIGHT}} resizeMode={"stretch"}
                       source={Images.Welcome}/>
            </View>
        )
    }
}


export default WelcomePage

