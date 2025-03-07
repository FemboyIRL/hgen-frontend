import roomSelectionActions from "./actions"
import roomSelectionInitial from "./constants"

const reducer = (state = roomSelectionInitial, action: { payload: any; type: any }) => {
    const { payload, type } = action

    switch (type) {
        case roomSelectionActions.CHANGE_VALUE_FORM:
            return {
                ...state,
                form: {
                    ...state.form,
                    [payload.prop]: payload.data
                }
            }

        case roomSelectionActions.CHANGE_VALUE:
            return {
                ...state,
                [payload.prop]: payload.data
            }

        default:
            return state
    }
}

export { reducer, roomSelectionActions, roomSelectionInitial }
