import { Employee } from '../../../types/employee'

const initialState = {
    loading: true,
    employeeModal: false,
    deleteEmployeeModal: false,
    employees: [] as Employee[],
    searchTerm: '',
    formData: {
        user_id: '',
        fullName: '',
        email: '',
        position: '',
        hire_date: new Date(),
    },
    currentEmployee: null as Employee | null,
};

export default initialState

export type EmployeeReducer = typeof initialState;