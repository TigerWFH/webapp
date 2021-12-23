import * as t from './type';
// import * as Immutable from 'immutable'
export interface IDouble {
    bInitial: boolean;
    info: any;
    rights: any;
}
export const initialDoubleState: IDouble = {
    bInitial: true,
    info: {},
    rights: {}
};

function double (state = {}, action: any) {
    switch(action.type) {
        case t.GET_CARD:
            return {
                ...state,
                bInitial: true/* 该值不会因为多个接口并发执行，而被覆盖 */
            };
        case t.GET_CARD_SUCCESS:
            return {
                ...state,
                bInitial: false
            }
        case t.GET_CARD_FAILURE:
            return {
                ...state,
                bInitial: false
            };
        case t.GET_CARD2:
            return {
                ...state,
                bInitial: true
            }
        case t.GET_CARD_SUCCESS2:
            return {
                ...state,
                bInitial: false
            };
        case t.GET_CARD_FAILURE2:
            return {
                ...state,
                bInitial: false
            }
        case t.RENDER_UI:
            return {
                ...state,
                bInitial: true
            }
        case t.RENDER_UI_SUCCESS:
            return {
                ...state,
                bInitial: false
            };
        case t.RENDER_UI_FAILURE:
            return {
                ...state,
                bInitial: false
            };
        default:
            return state;
    }
}

export default double;