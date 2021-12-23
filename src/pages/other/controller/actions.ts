import * as t from './type'

export function begin() {
    return {
        type: t.ACTION_BEGIN
    }
}
export function beginSuccess(data: any) {
    return {
        type: t.ACTION_BEGIN_SUCCESS,
        payload: data
    }
}
export function beginFAilure(error: any) {
    return {
        type: t.ACTION_BEGIN_FAILURE,
        payload: error
    }
}