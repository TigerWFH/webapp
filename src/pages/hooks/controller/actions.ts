import {
    bindActionCreators,
    ActionCreator,
    AnyAction
} from "redux"
import store from "@/store"
import * as t from "./types"

const changeName: ActionCreator<AnyAction> = (name: string) => {
    return {
        type: t.CHANGE_NAME,
        payload: name
    }
}

export default bindActionCreators({
    changeName
}, store.dispatch)


