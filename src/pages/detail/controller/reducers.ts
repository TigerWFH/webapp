import * as t from './type'
import { AnyAction } from 'redux'
interface ISeller {
    id?: string | number
    name?: string
}
interface ISku extends ISeller {
    amount?: number
    price?: number
}
export interface IDetail {
    skuList: ISku[],
    seller: ISeller
}
export const initialState: IDetail = {
    seller: {},
    skuList: []
};

function detailReducer (state = initialState, action: AnyAction) {
    switch(action.type) {
        case t.DETAIL: {
            return state
        }
        case t.DETAIL_SUCCESS: {
            return state
        }
    }
    return state
}

export default detailReducer;