import * as t from './type';
export const initialState = {
    name: 'redux-monkey',
    info: {
        name: 'redux-info-name-default',
        age: 0
    }
};

function otherReducer (state = initialState, action: any) {
    switch(action.type) {
        case t.ACTION_BEGIN:
            return state;
        case t.ACTION_BEGIN_SUCCESS:
            return state;
        case t.ACTION_BEGIN_FAILURE:
            return state;
        default:
            return state;
    }
}

export default otherReducer;