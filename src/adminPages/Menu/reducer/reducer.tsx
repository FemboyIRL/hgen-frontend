import menuActions from "./actions";
import initialState from "./constants";

const reducer = (state = initialState, action: { payload: any; type: any }) => {
    const { type, payload } = action;
    switch (type) {
        case menuActions.LOADED_MENU_LIST:
            return {
                ...state,
                loading: false,
                menuItems: payload
            };

        case menuActions.CHANGE_VALUE:
            return {
                ...state,
                [payload.prop]: payload.data
            };

        case menuActions.CHANGE_VALUE_FORM:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [payload.prop]: payload.data
                }
            };

        case menuActions.RESET_FORM:
            return {
                ...state,
                formData: initialState.formData,
                currentMenuItem: null
            };

        case menuActions.RELOAD_LIST:
            return {
                ...state,
                loading: !state.loading
            }

        case menuActions.CHANGE_ALL_VALUE_FORM:
            return {
                ...state,
                formData: payload
            }

        case menuActions.ADD_IMAGES:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    images: [
                        ...state.formData.images,
                        ...payload.data
                    ]
                }
            }

        case menuActions.DELETE_IMAGE:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    images: state.formData.images.filter((_, i) => i !== payload.data),
                },
            };
        default:
            return state;
    }
}

export { reducer, initialState, menuActions }