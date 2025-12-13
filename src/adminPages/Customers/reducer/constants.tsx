import { Customer } from '../../../types/customer'

const initialState = {
    loading: true,
    customerModal: false,
    deleteCustomerModal: false,
    customers: [] as Customer[],
    searchTerm: '',
    formData: {
        fullName: '',
        email: '',
        phone: '',
        address: ''
    },
    currentCustomer: null as Customer | null,
};

export default initialState

export type CustomerReducer = typeof initialState;
