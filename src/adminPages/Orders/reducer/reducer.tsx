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
                    menuItems: {
                        ...state.formData.menuItems,
                        [payload.item.id]: [
                            ...(state.formData.menuItems[payload.item.id] || []),
                            ...(!state.formData.menuItems[payload.item.id]?.some(item =>
                                item.item.id === payload.item.id
                            ) ? [{
                                item: payload.item,
                                quantity: payload.quantity || 1,
                                category: payload.item.id
                            }] : [])
                        ]
                    }
                }
            };

        case ordersActions.UPDATE_MENU_ITEM_QUANTITY: {
            const { category, itemId, action, value } = payload;

            return {
                ...state,
                formData: {
                    ...state.formData,
                    menuItems: {
                        ...state.formData.menuItems,
                        [category]: state.formData.menuItems[category]?.map(item => {
                            if (item.item.id === itemId) {
                                let newQuantity = item.quantity;

                                switch (action) {
                                    case "increase":
                                        newQuantity += 1;
                                        break;

                                    case "decrease":
                                        newQuantity = Math.max(1, item.quantity - 1);
                                        break;

                                    case "input":
                                        if (value !== null) {
                                            newQuantity = Math.max(1, value);
                                        }
                                        break;
                                }

                                return { ...item, quantity: newQuantity };
                            }
                            return item;
                        })
                    }
                }
            };
        }

        case ordersActions.DELETE_MENU_ITEM:
            return {
                ...state,
                formData: {
                    ...state.formData,
                    menuItems: {
                        ...state.formData.menuItems,
                        [payload.category]: state.formData.menuItems[payload.category]?.filter(
                            (menuItem) => menuItem.item.id !== payload.itemId
                        ) || []
                    }
                }
            };
        default:
            return state;
    }
}

export { reducer, initialState, ordersActions }