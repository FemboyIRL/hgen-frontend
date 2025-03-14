/* eslint-disable react-refresh/only-export-components */
import CustomerActions from "./actions";
import initialState from "./constants";

const reducer = (state = initialState, action: { payload: any; type: any }) => {
    switch (action.type) {
        case CustomerActions.LOADING_CUSTOMERS_LIST:
            return {
                ...state,
                loading: true
            };

        case CustomerActions.LOADED_CUSTOMERS_LIST:
            return {
                ...state,
                loading: false,
                customers: action.payload
            };

        case CustomerActions.ADD_CUSTOMER:
            return {
                ...state,
                customers: [...state.customers, action.payload]
            };

        case CustomerActions.CHANGE_VALUE:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            };

        case CustomerActions.CHANGE_VALUE_FORM:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.payload.name]: action.payload.value
                }
            };

        case CustomerActions.SET_SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.payload
            };

        case CustomerActions.SET_CURRENT_CUSTOMER:
            return {
                ...state,
                currentCustomer: action.payload
            };

        case CustomerActions.RESET_FORM:
            return {
                ...state,
                formData: initialState.formData,
                currentCustomer: null
            };

        default:
            return state;
    }
}

export { reducer, initialState, CustomerActions }