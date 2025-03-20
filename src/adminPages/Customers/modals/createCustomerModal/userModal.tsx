import { Form, FormControl, FormGroup } from "react-bootstrap";
import ApiConsumer from "../../../../services/api_consumer";
import CustomerActions from "../../reducer/actions";
import { CustomerReducer } from "../../reducer/constants";
import FormModal from "../../../../components/FormModal/form-modal";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface CreateCustomerModalProps {
    stateReducer: CustomerReducer
    dispatch: React.Dispatch<{
        type: string;
        payload: any;
    }>
    changeModal: () => void
}

const Customer = new ApiConsumer({ url: 'clients/' })

const CreateClientModal: React.FC<CreateCustomerModalProps> = ({ stateReducer, dispatch, changeModal }) => {

    useEffect(() => {
        if (stateReducer.customerModal) {
            if (stateReducer.currentCustomer) {
                getCustomerData()
            }
        }
    }, [stateReducer.customerModal])

    const getCustomerData = () => {
        const selectedCustomer = stateReducer.customers.find(customer => customer.user_id === stateReducer.currentCustomer?.user_id);
        dispatch({
            type: CustomerActions.CHANGE_ALL_VALUE_FORM,
            payload: selectedCustomer
        })
    }

    const changeValueForm = (prop: string, data: any) => {
        dispatch({
            type: CustomerActions.CHANGE_VALUE_FORM,
            payload: {
                prop,
                data
            },
        });
    }

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            if (!/^\d*$/.test(value)) {
                toast.error('El teléfono solo puede contener números');
                return;
            }
            if (value.length > 10) {
                toast.error('El teléfono no puede tener más de 10 dígitos');
                return;
            }
        }

        changeValueForm(name, value)
    };

    const closeModal = () => {
        dispatch({
            type: CustomerActions.CLEAN_FORM_DATA,
            payload: null
        })
        changeModal()
    }

    const reloadList = () => {
        dispatch({
            type: CustomerActions.RELOAD_LIST,
            payload: null,
        })
    }

    const handleSave = async () => {
        const { fullName, email, address, phone } = stateReducer.formData

        const body = {
            fullName,
            email,
            address,
            phone
        }

        const { status } = stateReducer.currentCustomer ? await Customer.update(body, stateReducer.currentCustomer.user_id) : await Customer.create(body)

        if (status) {
            closeModal()
            reloadList()
        }
    };

    return (
        <>
            <FormModal
                modalTitle={stateReducer.currentCustomer ? "Editar un cliente" : 'Agregar un cliente'}
                status={stateReducer.customerModal}
                btnText={stateReducer.currentCustomer ? "Editar" : 'Agregar'}
                onSubmit={handleSave}
                size={'md'}
                changeModal={() => closeModal()}
            >
                <Form>
                    <FormGroup className="mb-3">
                        <label>Nombre</label>
                        <div className="inputWithIcon">
                            <FormControl
                                type="text"
                                className="textInput"
                                placeholder="Ingresa el nombre del cliente(completo)"
                                value={stateReducer.formData.fullName}
                                name="fullName"
                                onChange={handleOnChangeInput}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <label>Correo electrónico</label>
                        <div className="inputWithIcon">
                            <FormControl
                                type="email"
                                className="textInput"
                                placeholder="Ingresa el correo del cliente"
                                value={stateReducer.formData.email}
                                name="email"
                                onChange={handleOnChangeInput}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <label>Teléfono</label>
                        <div className="inputWithIcon">
                            <FormControl
                                type="tel"
                                className="textInput"
                                placeholder="Ingresa el número de telefono del cliente"
                                value={stateReducer.formData.phone}
                                name="phone"
                                onChange={handleOnChangeInput}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <label>Dirección</label>
                        <div className="inputWithIcon">
                            <FormControl
                                type="text"
                                className="textInput"
                                placeholder="Ingresa la dirección del cliente"
                                value={stateReducer.formData.address}
                                name="address"
                                onChange={handleOnChangeInput}
                            />
                        </div>
                    </FormGroup>
                </Form>
            </FormModal>        </>
    )
}

export default CreateClientModal