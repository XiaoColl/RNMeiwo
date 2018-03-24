import React, {Component} from 'react';

import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox,
} from "react-native-router-flux";

import Images from "./image/Images";
import styles from "./style"
import * as Constant from "./style/constant"
import BackUtils from './utils/backUtils'
import ScreenUtils from "./utils/screenUtils";

import TabIcon from "./components/widget/TabIcon";
import WelcomePage from "./containers/WelcomePage";
import LoginP from "./containers/LoginP";
import WorkTabPage from "./components/WorkTabPage";

/**
 * 全局路由
 */
const getRouter = () => {

    return (
        <Router getSceneStyle={() => {
            return styles.routerStyle
        }}
                backAndroidHandler={
                    BackUtils()}>
            <Lightbox>
                <Scene key="root"
                       navigationBarStyle={styles.navigationBar}
                       titleStyle={{color: Constant.titleTextColor}}>
                    <Scene key="main">
                        <Scene key="welcome" component={WelcomePage} hideNavBar/>
                    </Scene>

                    <Scene key="loginPage" component={LoginP} hideNavBar/>

                    <Scene
                        key="tabbar"        // 唯一标识
                        tabs
                        lazy
                        wrap={false}
                        showLabel={false}
                        tabBarPosition={"bottom"}
                        title={"MEIWO"}
                        tabBarStyle={{
                            height: ScreenUtils.getPX2CurDP(100),
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: Constant.tabBackgroundColor
                        }}>
                        <Scene key="tabWork"
                               component={WorkTabPage}
                               icon={TabIcon}
                               tabName="工作"
                               image={Images.Main}/>
                        <Scene key="tabMsg"
                               component={WorkTabPage}
                               icon={TabIcon}
                               tabName={'通知'}
                               image={Images.Main}/>
                        <Scene key="tabMine"
                               component={WorkTabPage}
                               icon={TabIcon}
                               tabName={'我的'}
                               image={Images.Main}/>
                    </Scene>

                </Scene>
            </Lightbox>
        </Router>
    )

};


export default getRouter;

