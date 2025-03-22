import roomsActions from "./actions";
import initialState from "./constants";

const reducer = (state = initialState, action: { payload: any; type: any }) => {
    const { type, payload } = action;
    switch (type) {
        case roomsActions.LOADED_ROOMS_LIST:
            return {
                ...state,
                loading: false,
                rooms: payload
            };

        case roomsActions.CHANGE_VALUE:
            return {
                ...state,
                [payload.prop]: payload.data
            };

        case roomsActions.CHANGE_VALUE_FORM:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [payload.prop]: payload.data
                }
            };

        case roomsActions.RESET_FORM:
            return {
                ...state,
                formData: initialState.formData,
                currentRoom: null
            };

        case roomsActions.RELOAD_LIST:
            return {
                ...state,
                loading: !state.loading
            }

        case roomsActions.CHANGE_ALL_VALUE_FORM:
            return {
                ...state,
                formData: payload
            }

        case roomsActions.ADD_IMAGES:
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

        case roomsActions.DELETE_IMAGE:
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

export { reducer, initialState, roomsActions }