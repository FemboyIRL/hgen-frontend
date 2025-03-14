const initialState = {
    loading: false,
    customerModal: false,
    deleteCustomerModal: false,
    customers: [],
    searchTerm: '',
    formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: ''
    },
    currentCustomer: null
};

export default initialState