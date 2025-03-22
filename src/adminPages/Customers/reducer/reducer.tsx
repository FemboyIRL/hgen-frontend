import CustomerActions from "./actions";
import initialState from "./constants";

const reducer = (state = initialState, action: { payload: any; type: any }) => {
    const { type, payload } = action;
    switch (type) {
        case CustomerActions.LOADED_CUSTOMERS_LIST:
            return {
                ...state,
                loading: false,
                customers: payload
            };

        case CustomerActions.CHANGE_VALUE:
            return {
                ...state,
                [payload.prop]: payload.data
            };

        case CustomerActions.CHANGE_VALUE_FORM:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [payload.prop]: payload.data
                }
            };

        case CustomerActions.SET_SEARCH_TERM:
            return {
                ...state,
                searchTerm: payload
            };

        case CustomerActions.CLEAN_FORM_DATA:
            return {
                ...state,
                formData: initialState.formData,
                currentCustomer: null
            };

        case CustomerActions.RELOAD_LIST:
            return {
                ...state,
                loading: !state.loading
            }

        case CustomerActions.CHANGE_ALL_VALUE_FORM:
            return {
                ...state,
                formData: payload
            }

        default:
            return state;
    }
}

// eslint-disable-next-line react-refresh/only-export-components
export { reducer, initialState, CustomerActions }