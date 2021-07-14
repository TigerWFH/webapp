import { bindActionCreators } from 'redux'
import store from '@/store'
import * as t from './type'

// const detail = () => ({
//     type: t.DETAIL
// })

const detailSuccess = (data: any) => ({
    type: t.DETAIL_SUCCESS,
    payload: data
})

const requestDetail = () => {
    return (dispatch: any, getState: any) => {
        console.log("dispatch-detail")
        setTimeout(() => {
            dispatch(detailSuccess({}))
        }, 2000)
    }
}

export default bindActionCreators({
    requestDetail
}, store.dispatch)