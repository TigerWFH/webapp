import { AnyAction } from "redux"
import * as t from "./types"
export interface IInitialState {
    [propertyName: string] : any
}
export const initialState: IInitialState = {
    count: 0,
    name: "defaultName"
}
export default function(state: IInitialState = initialState, action: AnyAction) {
    switch(action.type) {
        case t.CHANGE_NAME: {
            return {
                ...state,
                name: action.payload
            }
        }
        default:
            return state
    }
}