import HOME_ACTIONS from "./actions"
import HomeState from "./constants"

const reducer = (state = HomeState, action: { payload: any; type: any }) => {
    const { payload, type } = action

    switch (type) {
        case HOME_ACTIONS.CHANGE_VALUE:
            return {
                ...state,
                [payload.prop]: payload.data
            }

        case HOME_ACTIONS.CHANGE_VALUE_RESERVE_BAR:
            return {
                ...state,
                reserve_bar: {
                    ...state.reserve_bar,
                    [payload.prop]: payload.data
                }
            }

        case HOME_ACTIONS.GET_OCCUPIED_DATES:
            return {
                ...state,
                reserve_bar: {
                    ...state.reserve_bar,
                    occupied_dates: payload,
                }
            }

        case HOME_ACTIONS.GET_OFFERS:
            return {
                ...state,
                offers: payload
            }

        case HOME_ACTIONS.GET_ROOMS:
            return {
                ...state,
                rooms: payload
            }

        default:
            return state
    }
}

export { reducer, HOME_ACTIONS, HomeState }
