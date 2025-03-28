import ordersActions from "./actions";
import initialState from "./constants";

const reducer = (state = initialState, action: { payload: any; type: any }) => {
    const { type, payload } = action;
    switch (type) {
        case ordersActions.LOADED_ORDERS_LIST:
            return {
                ...state,
                loading: false,
                orders: payload
            };

        case ordersActions.CHANGE_VALUE:
            return {
                ...state,
                [payload.prop]: payload.data
            };

        case ordersActions.CHANGE_VALUE_FORM:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [payload.prop]: payload.data
                }
            };

        case ordersActions.RESET_FORM:
            return {
                ...state,
                formData: initialState.formData,
                currentOrder: null
            };

        case ordersActions.RELOAD_LIST:
            return {
                ...state,
                loading: !state.loading
            }

        case ordersActions.CHANGE_ALL_VALUE_FORM:
            return {
                ...state,
                formData: payload
            }

        case ordersActions.ADD_MENU_ITEM:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    menuItems: [
                        ...state.formData.menuItems,
                        payload.data
                    ]
                }
            }

        default:
            return state;
    }
}

export { reducer, initialState, ordersActions }