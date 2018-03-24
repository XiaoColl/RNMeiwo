import {WORK} from '../type'
import WorkDao from '../../dao/workDao'
import store from '../'

const {dispatch, getState} = store;


/**
 * 获取用户工作模块菜单
 */
const getWorkMenus = (callback) => async () => {
    let res = await WorkDao.getWorkMenus();
    if (res && res.result) {
        dispatch({
            type: WORK.WORK_MENUS,
            res: res.data
        });
    }

    setTimeout(() => {
        callback && callback(res.result);
    }, 1000)
};


export default {
    getWorkMenus
}
