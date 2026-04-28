import EmployeeActions from "./actions";
import initialState from "./constants";

const reducer = (state = initialState, action: { payload: any; type: any }) => {
    const { type, payload } = action;
    switch (type) {
        case EmployeeActions.LOADED_EMPLOYEES_LIST:
            return {
                ...state,
                loading: false,
                employees: payload
            };

        case EmployeeActions.CHANGE_VALUE:
            return {
                ...state,
                [payload.prop]: payload.data
            };

        case EmployeeActions.CHANGE_VALUE_FORM:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [payload.prop]: payload.data
                }
            };

        case EmployeeActions.SET_SEARCH_TERM:
            return {
                ...state,
                searchTerm: payload
            };

        case EmployeeActions.CLEAN_FORM_DATA:
            return {
                ...state,
                formData: initialState.formData,
                currentEmployee: null
            };

        case EmployeeActions.RELOAD_LIST:
            return {
                ...state,
                loading: !state.loading
            }

        case EmployeeActions.CHANGE_ALL_VALUE_FORM:
            return {
                ...state,
                formData: payload
            }

        default:
            return state;
    }
}

// eslint-disable-next-line react-refresh/only-export-components
export { reducer, initialState, EmployeeActions }