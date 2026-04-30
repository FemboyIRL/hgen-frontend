import ReservationsActions from "./actions";
import initialState from "./constants";

const reducer = (state = initialState, action: { payload: any; type: any }) => {
    const { type, payload } = action;
    switch (type) {
        case ReservationsActions.LOADED_RESERVATION_LIST:
            return {
                ...state,
                loading: false,
                reservations: payload
            };

        case ReservationsActions.CHANGE_VALUE:
            return {
                ...state,
                [payload.prop]: payload.data
            };

        case ReservationsActions.CHANGE_VALUE_FORM:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [payload.prop]: payload.data
                }
            };

        case ReservationsActions.RESET_FORM:
            return {
                ...state,
                formData: initialState.formData,
                currentReservation: null
            };

        case ReservationsActions.RELOAD_LIST:
            return {
                ...state,
                loading: !state.loading
            }

        case ReservationsActions.CHANGE_ALL_VALUE_FORM:
            return {
                ...state,
                formData: payload
            }

        default:
            return state;
    }
}

export { reducer, initialState, ReservationsActions }