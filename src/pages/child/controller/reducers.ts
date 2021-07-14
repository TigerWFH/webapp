import * as t from './type'
import {AnyAction} from 'redux'
export const initialState = {
    list: [] as any
}

function childReducer (state = initialState, action: AnyAction) {
    switch(action.type) {
        case t.GET_LIST:
            return state;
        case t.GET_LIST_SUCCESS:
            return {
                ...state,
                list: action.payload
            };
        case t.GET_LIST_FAILURE:
            return state;
        default:
            return state;
    }
}

export default childReducer;