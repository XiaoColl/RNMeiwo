import React, {Component} from 'react';
import {
    View, Text, Image, StatusBar
} from 'react-native';
import {Toast, Grid} from 'antd-mobile';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import styles from "../style"
import * as   constant from "../style/constant";
import WorkActions from '../store/action/workAction'
import ScreenUtils from "../utils/screenUtils";

/**
 * 首页工作模块界面
 */
class WorkTabPage extends Component {

    constructor(props) {
        super(props);


        this.getMenus = this.getMenus.bind(this);
    }


    //
    componentDidMount() {
        this.getMenus();
    }

    getMenus() {
        let {workAction} = this.props;

        workAction.getWorkMenus((res) => {
            if (!res) {
                Toast.fail("获取工作模块失败！", 1)
            }
        })
    }

    render() {
        let {workState} = this.props;
        let dataSource = (workState.work_menu_list);
        return (
            <View style={styles.mainBox}>
                <StatusBar hidden={false} backgroundColor={'transparent'} translucent barStyle={'light-content'}/>
                <Grid data={dataSource}
                      columnNum={4}
                      renderItem={dataItem => (
                          <View style={[styles.centerH, {marginTop: ScreenUtils.getPX2CurDP(30)}]}>
                              <Image source={{uri: dataItem.picture}}
                                     style={{width: ScreenUtils.getPX2CurDP(60), height: ScreenUtils.getPX2CurDP(60)}}
                                     alt=""/>
                              <View>
                                  <Text style={{
                                      color: constant.cardShadowColor,
                                      fontSize: ScreenUtils.getPX2CurDP(30),
                                      marginTop: ScreenUtils.getPX2CurDP(20)
                                  }}>{dataItem.name}</Text>
                              </View>
                          </View>
                      )}
                />
            </View>
        )
    }
}


export default connect(state => ({
    workState: state.workReducer,
}), dispatch => ({
    workAction: bindActionCreators(WorkActions, dispatch)
}))(WorkTabPage)

