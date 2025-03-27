import { Button, Col, Dropdown, DropdownButton, DropdownMenu, Form, FormControl, InputGroInputGroup, up, Row, InputGroup, } from "react-bootstrap";
import { OrderReducer } from "../reducer/constants";
import ApiConsumer from "../../../services/api_consumer";
import { useEffect } from "react";
import ordersActions from "../reducer/actions";
import FormModal from "../../../components/FormModal/form-modal";
import { Customer } from "../../../interfaces/CustomerInterface";


interface CreateOrderModalProps {
    stateReducer: OrderReducer
    dispatch: React.Dispatch<{
        type: string;
        payload: any;
    }>
    changeModal: () => void
}

const Order = new ApiConsumer({ url: 'order/' })

const CreateOrderModal: React.FC<CreateOrderModalProps> = ({ stateReducer, dispatch, changeModal }) => {

    useEffect(() => {
        if (stateReducer.orderModal) {
            console.log(stateReducer.customers)
            if (stateReducer.currentOrder) {
                getOrderData()
            }
        }
    }, [stateReducer.orderModal])

    const filterCustomerList = () => {
        const customerList = stateReducer.customers;

        const filteredList = customerList.filter((customer: Customer) =>
            customer.fullName.toLowerCase().includes(stateReducer.searchCustomer.toLowerCase()) ||
            customer.email.toLowerCase().includes(stateReducer.searchCustomer.toLowerCase()) ||
            customer.phone.includes(stateReducer.searchCustomer)
        );

        return filteredList;
    };

    const getOrderData = () => {
        const selectedOrderItem = stateReducer.orders.find(item => item.order_id === stateReducer.currentOrder?.order_id);
        dispatch({
            type: ordersActions.CHANGE_ALL_VALUE_FORM,
            payload: selectedOrderItem
        })
    }

    const changeValueForm = (prop: string, data: any) => {
        dispatch({
            type: ordersActions.CHANGE_VALUE_FORM,
            payload: {
                prop,
                data
            },
        });
    }

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        changeValueForm(name, value)

    }


    const closeModal = () => {
        dispatch({
            type: ordersActions.RESET_FORM,
            payload: null
        })
        changeModal()
    }

    const reloadList = () => {
        dispatch({
            type: ordersActions.RELOAD_LIST,
            payload: null,
        })
    }

    const handleSave = async () => {
        const { customer, menuItems } = stateReducer.formData

        const formData = new FormData();

        if (stateReducer.currentOrder) {
            formData.append('id', String(stateReducer.currentOrder.order_id))
        }

        formData.append("user_id", String(customer?.user_id))



        const { status } = stateReducer.currentOrder ? await Order.update(formData, stateReducer.currentOrder.order_id) : await Order.create(formData)

        if (status) {
            closeModal()
            reloadList()
        }
    };

    const onDelete = () => {
        dispatch({
            type: ordersActions.CHANGE_VALUE,
            payload: {
                prop: 'deleteOrderModal',
                data: !stateReducer.deleteOrderModal
            }
        })
    }

    const changeValue = (prop: string, data: any) => {
        dispatch({
            type: ordersActions.CHANGE_VALUE,
            payload: {
                prop,
                data
            }
        })
    }

    const temporal_list = filterCustomerList()

    return (
        <>
            <FormModal
                modalTitle={stateReducer.currentOrder ? "Editar una orden" : 'Agregar una orden'}
                status={stateReducer.orderModal}
                btnText={stateReducer.currentOrder ? "Editar" : 'Agregar'}
                onSubmit={handleSave}
                size={'md'}
                onDelete={stateReducer.currentOrder ? onDelete : undefined}
                changeModal={() => closeModal()}
            >
                <Form>
                    <Row style={{ height: '100px' }}>
                        <Col>
                            <InputGroup>
                                <Form.Control
                                    className="input"
                                    placeholder="Buscar cliente..."
                                    aria-label="Buscar cliente"
                                    value={stateReducer.searchCustomer}
                                    onChange={(e) => changeValue("searchCustomer", e.target.value)}
                                />
                                <DropdownButton
                                    className="btn"
                                    title="▼"
                                    id="input-group-dropdown-1"
                                    align="end"
                                    show={stateReducer.searchCustomer !== ''}
                                >
                                    {temporal_list.length > 0 ? (
                                        temporal_list.map((customer: Customer) => (
                                            <Dropdown.Item
                                                onClick={() => {
                                                    changeValueForm('customer', customer);
                                                    changeValue("searchCustomer", '');
                                                }}
                                                key={`customer-${customer.user_id}`}
                                            >
                                                <div>
                                                    <div>{customer.fullName}</div>
                                                    <small className="text-muted">{customer.email} | {customer.phone}</small>
                                                </div>
                                            </Dropdown.Item>
                                        ))
                                    ) : (
                                        <Dropdown.Item disabled>No se encontraron clientes</Dropdown.Item>
                                    )}
                                </DropdownButton>
                            </InputGroup>

                            {stateReducer.formData.customer && (
                                <div className="mt-2 p-2 border rounded">
                                    <strong>Cliente seleccionado:</strong>
                                    <div>{stateReducer.formData.customer.fullName}</div>
                                    <small className="text-muted">
                                        {stateReducer.formData.customer.email} | {stateReducer.formData.customer.phone}
                                    </small>
                                </div>
                            )}
                        </Col>
                    </Row>

                    <Row className="mt-3" style={{ height: "500px" }}>

                    </Row>
                </Form>
            </FormModal >
        </>
    )
}

export default CreateOrderModal