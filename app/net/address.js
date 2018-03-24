
export const host = "http://192.168.1.16:8089/";//本地
export const hostWeb = "https://github.com/";
export const downloadUrl = 'https://www.pgyer.com/GSYGithubApp';
export const graphicHost = 'https://ghchart.rshah.org/';

export default AddressLocal = {
    /**
     * 我的用户信息 POST
     */
    getLoginInfo: () => {
        return `${host}user/login/AND1.0.3.7`;
    },
    /**
     * 获取用户工作菜单信息 POST
     */
    getMenuInfo: () => {
        return `${host}sys/getMenu/AND1.0.3.7`;
    },

};