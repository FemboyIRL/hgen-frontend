import { Customer } from "../../../interfaces/CustomerInterface";
import { MenuItem } from "../../../interfaces/MenuItemInterface";
import { Order } from "../../../interfaces/OrdersInterface";

const initialState = {
    loading: true,
    orderModal: false,
    deleteOrderModal: false,
    menuItems: [] as MenuItem[],
    customers: [] as Customer[],
    orders: [] as Order[],
    filters: {
        currentCustomer: null as Customer | null,
        date: null as Date | null
    },
    formData: {
        customer: null as Customer | null,
        menuItems: [] as MenuItem[]
    },
    searchCustomer: '',
    searchMenuItem: '',
    currentOrder: null as Order | null,
};

export default initialState

export type OrderReducer = typeof initialState