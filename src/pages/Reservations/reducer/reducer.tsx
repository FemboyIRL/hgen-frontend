import reservationsActions from "./actions"
import reservationsInitial from "./constants"

const reducer = (state = reservationsInitial, action: { payload: any; type: any }) => {
    const { payload, type } = action

    switch (type) {
        case reservationsActions.CHANGE_VALUE_FORM:
            return {
                ...state,
                form: {
                    ...state.form,
                    [payload.prop]: payload.data
                }
            }

        case reservationsActions.CHANGE_VALUE:
            return {
                ...state,
                [payload.prop]: payload.data
            }

        case reservationsActions.LOADED_ROOMS_LIST:
            return {
                ...state,
                rooms: payload,
                loading: false,
            }

        default:
            return state
    }
}

export { reducer, reservationsActions, reservationsInitial }
