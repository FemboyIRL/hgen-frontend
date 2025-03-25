import offerActions from "./actions";
import initialState from "./constants";

const reducer = (state = initialState, action: { payload: any; type: any }) => {
    const { type, payload } = action;
    switch (type) {
        case offerActions.LOADED_OFFER_LIST:
            return {
                ...state,
                loading: false,
                offers: payload
            };

        case offerActions.CHANGE_VALUE:
            return {
                ...state,
                [payload.prop]: payload.data
            };

        case offerActions.CHANGE_VALUE_FORM:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [payload.prop]: payload.data
                }
            };

        case offerActions.RESET_FORM:
            return {
                ...state,
                formData: initialState.formData,
                currentOffer: null
            };

        case offerActions.RELOAD_LIST:
            return {
                ...state,
                loading: !state.loading
            }

        case offerActions.CHANGE_ALL_VALUE_FORM:
            return {
                ...state,
                formData: payload
            }

        case offerActions.ADD_IMAGES:
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

        case offerActions.DELETE_IMAGE:
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

export { reducer, initialState, offerActions }