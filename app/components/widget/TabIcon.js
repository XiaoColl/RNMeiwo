import React from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';

import styles from '../../style'
import ScreenUtils from '../../utils/screenUtils'
import * as Constant from '../../style/constant'

const TabIcon = (props) => {

    return (
        <View style={styles.centered}>
            <Image source={props.image}
                // source={!props.focused ? props.image : props.selectedImage}
                   style={[{
                       height: ScreenUtils.getPX2CurDP(40),
                       width: ScreenUtils.getPX2CurDP(40),
                       marginTop: 2,
                       tintColor: props.tintColor
                   }]}/>
            <Text
                style={{color: props.tintColor, marginTop: 2, fontSize: ScreenUtils.getPX2CurDP(28)}}>
                {props.tabName}
            </Text>
        </View>
    )
};


export default TabIcon;