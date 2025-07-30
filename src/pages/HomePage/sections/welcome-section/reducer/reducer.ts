import roomSelectionActions from "./actions"
import roomSelectionInitial from "./constants"

const reducer = (state = roomSelectionInitial, action: { payload: any; type: any }) => {
    const { payload, type } = action

    switch (type) {
        case roomSelectionActions.CHANGE_VALUE:
            return {
                ...state,
                [payload.prop]: payload.data
            }

        case roomSelectionActions.GET_OCCUPIED_DATES:
            return {
                ...state,
                occupiedDates: payload,
                loading: false,
            }
        default:
            return state
    }
}

export { reducer, roomSelectionActions, roomSelectionInitial }
