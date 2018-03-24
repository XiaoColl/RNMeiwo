import {WORK} from '../type';
import {createReducer} from '../'

const initialState = {
    //当前趋势列表
    work_menu_list: [],
};

const actionHandler = {
    [WORK.WORK_MENUS]: (state, action) => {
        return {
            ...state,
            work_menu_list: action.res
        }
    },
};

export default createReducer(initialState, actionHandler)