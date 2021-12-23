import * as t from './type'
import { bindActionCreators } from 'redux'
import store from '../../../store'

const getList = () => {
    return {
        type: t.GET_LIST
    }
}
const getListSuccess = (data: any) => {
    const mockData = []
    while(mockData.length < 10000) {
        mockData.push({
            name: `monkey${++mockData.length}`,
            age: mockData.length,
            comment: `这是第${mockData.length}条评论`
        })
    }
    return {
        type: t.GET_LIST_SUCCESS,
        payload: mockData
    }
}
const getListFailure = (error: any) => {
    return {
        type: t.GET_LIST_FAILURE,
        payload: error
    }
}

export default bindActionCreators({
    getList,
    getListSuccess,
    getListFailure
}, store.dispatch)

