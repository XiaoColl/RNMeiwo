import React, {Component} from "react";
import {
    View,
    Animated,
    Keyboard
} from "react-native";
import {List, InputItem, Button, Toast} from "antd-mobile";
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {Actions} from 'react-native-router-flux';

import LoginAction from "../store/action/loginAction"

import styles from "../style/index";
import * as constant from "../style/constant"

/**
 * 欢迎页
 */
class LoginP extends Component {

    constructor(props) {
        super(props);

        this.userInputChange = this.userInputChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.toLogin = this.toLogin.bind(this);
        this.params = {
            userName: '18610201020',
            password: '18610201020'
        };
        this.state = {
            saveUserName: '',
            savePassword: '',
            secureTextEntry: true,
            secureIcon: "eye-with-line",
            opacity: new Animated.Value(0),
        }
    }

    componentDidMount() {
    }

    userInputChange(text) {
        this.params.userName = text;
    }

    passwordChange(text) {
        this.params.password = text;
    }

    toLogin() {
        let {loginAction} = this.props;
        if (!this.params.userName || this.params.userName.length === 0) {
            Toast.info("请输入手机号", 1)
            return
        }
        if (!this.params.password || this.params.password.length === 0) {
            Toast.info("请输入密码", 1)
            return
        }
        this.setState({
            saveUserName: this.params.userName,
            savePassword: this.params.password
        });
        Toast.loading("登录中...", false)
        Keyboard.dismiss();
        loginAction.doLogin(this.params.userName, this.params.password, (res) => {
            Toast.hide()
            if (!res) {
                Toast.fail("登录失败！", 1)
            } else {
                Actions.reset("tabbar");
            }
        })
    }


    render() {
        return (
            <View style={[styles.flexDirectionColumn, {
                backgroundColor: constant.mainBackgroundColor,
                paddingTop: 100,
                paddingLeft: 20,
                paddingRight: 20
            }]}>
                <List>
                    <InputItem
                        type="number"
                        placeholder="18610201020"
                        maxLength={11}
                        onChange={this.userInputChange}
                        defaultValue={"18610201020"}
                    >手机</InputItem>
                    <InputItem
                        type="password"
                        placeholder="******"
                        onChange={this.passwordChange}
                    >
                        密码
                    </InputItem>
                </List>


                <Button type="primary" style={{top: 50}} onClick={this.toLogin}>登录</Button>
            </View>
        )
    }
}


export default connect(state => ({state}), dispatch => ({
        loginAction: bindActionCreators(LoginAction, dispatch)
    })
)(LoginP)

