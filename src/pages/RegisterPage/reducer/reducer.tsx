import initialState from '../reducer/constants'
import registerActions from './actions';

const reducer = (state = initialState, action: { payload: any; type: any }) => {
    const { type, payload } = action;
    switch (type) {
        case registerActions.CHANGE_VALUE:
            console.log('hola')
            return {
                ...state,
                [payload.prop]: payload.data
            }

        case registerActions.CHANGE_VALUE_FORM:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [payload.prop]: payload.data
                }
            }
    }
}

export { reducer, initialState, registerActions }