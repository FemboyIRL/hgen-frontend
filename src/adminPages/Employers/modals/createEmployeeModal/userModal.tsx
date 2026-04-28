import { Form, FormControl, FormGroup } from "react-bootstrap";
import ApiConsumer from "../../../../services/api_consumer";
import EmployeeActions from "../../reducer/actions";
import { EmployeeReducer } from "../../reducer/constants";
import FormModal from "../../../../components/FormModal/form-modal";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface CreateEmployeeModalProps {
    stateReducer: EmployeeReducer
    dispatch: React.Dispatch<{
        type: string;
        payload: any;
    }>
    changeModal: () => void
}

const Employee = new ApiConsumer({ url: 'employees/' })

const CreateEmployeeModal: React.FC<CreateEmployeeModalProps> = ({ stateReducer, dispatch, changeModal }) => {

    useEffect(() => {
        if (stateReducer.employeeModal) {
            if (stateReducer.currentEmployee) {
                getEmployeeData()
            }
        }
    }, [stateReducer.employeeModal])

    const getEmployeeData = () => {
        const selectedEmployee = stateReducer.employees.find(employee => employee.user_id === stateReducer.currentEmployee?.user_id);
        dispatch({
            type: EmployeeActions.CHANGE_ALL_VALUE_FORM,
            payload: selectedEmployee
        })
    }

    const changeValueForm = (prop: string, data: any) => {
        dispatch({
            type: EmployeeActions.CHANGE_VALUE_FORM,
            payload: {
                prop,
                data
            },
        });
    }

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Validaciones específicas para cada campo si es necesario
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                toast.error('Ingresa un correo electrónico válido');
                return;
            }
        }

        if (name === 'position' && value.length > 50) {
            toast.error('El puesto no puede tener más de 50 caracteres');
            return;
        }

        if (name === 'fullName' && value.length > 100) {
            toast.error('El nombre no puede tener más de 100 caracteres');
            return;
        }

        changeValueForm(name, value)
    };

    const handleOnChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const date = value ? new Date(value) : new Date();
        changeValueForm(name, date)
    };

    const closeModal = () => {
        dispatch({
            type: EmployeeActions.CLEAN_FORM_DATA,
            payload: null
        })
        changeModal()
    }

    const reloadList = () => {
        dispatch({
            type: EmployeeActions.RELOAD_LIST,
            payload: null,
        })
    }

    const handleSave = async () => {
        const { fullName, email, position, hire_date } = stateReducer.formData

        const body = {
            fullName,
            email,
            position,
            hire_date: hire_date instanceof Date ? hire_date.toISOString() : hire_date
        }

        const { status } = stateReducer.currentEmployee
            ? await Employee.update(body, stateReducer.currentEmployee.user_id)
            : await Employee.create(body)

        if (status) {
            closeModal()
            reloadList()
        }
    };

    // Formatear fecha para el input date (YYYY-MM-DD)
    const formatDateForInput = (date: Date | string) => {
        if (!date) return '';
        const d = date instanceof Date ? date : new Date(date);
        return d.toISOString().split('T')[0];
    };

    return (
        <>
            <FormModal
                modalTitle={stateReducer.currentEmployee ? "Editar empleado" : 'Agregar empleado'}
                status={stateReducer.employeeModal}
                btnText={stateReducer.currentEmployee ? "Editar" : 'Agregar'}
                onSubmit={handleSave}
                size={'lg'}
                changeModal={() => closeModal()}
            >
                <Form>
                    <FormGroup className="mb-3">
                        <label>Nombre completo</label>
                        <div className="inputWithIcon">
                            <FormControl
                                type="text"
                                className="textInput"
                                placeholder="Ingresa el nombre completo del empleado"
                                value={stateReducer.formData.fullName}
                                name="fullName"
                                onChange={handleOnChangeInput}
                                required
                            />
                        </div>
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <label>Correo electrónico</label>
                        <div className="inputWithIcon">
                            <FormControl
                                type="email"
                                className="textInput"
                                placeholder="Ingresa el correo del empleado"
                                value={stateReducer.formData.email}
                                name="email"
                                onChange={handleOnChangeInput}
                                required
                            />
                        </div>
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <label>Puesto</label>
                        <div className="inputWithIcon">
                            <FormControl
                                type="text"
                                className="textInput"
                                placeholder="Ingresa el puesto del empleado (ej. Software Engineer)"
                                value={stateReducer.formData.position}
                                name="position"
                                onChange={handleOnChangeInput}
                                required
                            />
                        </div>
                    </FormGroup>

                    <FormGroup className="mb-3">
                        <label>Fecha de contratación</label>
                        <div className="inputWithIcon">
                            <FormControl
                                type="date"
                                className="textInput"
                                value={formatDateForInput(stateReducer.formData.hire_date)}
                                name="hire_date"
                                onChange={handleOnChangeDate}
                                required
                            />
                        </div>
                    </FormGroup>
                </Form>
            </FormModal>
        </>
    )
}

export default CreateEmployeeModal