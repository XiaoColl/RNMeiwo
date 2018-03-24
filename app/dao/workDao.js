import Api from '../net'
import Address from '../net/address'


/**
 * 获取用户工作模块菜单
 */
const getWorkMenus = async () => {
    let res = await Api.netFetch(Address.getMenuInfo(), 'POST');

    if (res && res.result) {

        //TODO 存数据库操作暂时忽略

        return {
            result: true,
            data: res.data
        }
    } else {
        return {
            result: false
        }
    }
};



export default {
    getWorkMenus
}
