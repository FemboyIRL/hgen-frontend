import { Col, Dropdown, DropdownButton, Form, Row, InputGroup, } from "react-bootstrap";
import { OrderReducer } from "../reducer/constants";
import ApiConsumer from "../../../services/api_consumer";
import { useEffect } from "react";
import ordersActions from "../reducer/actions";
import FormModal from "../../../components/FormModal/form-modal";
import { Customer } from "../../../interfaces/CustomerInterface";
import { MenuItem } from "../../../interfaces/MenuItemInterface";
import { FileMinus, Plus } from "react-bootstrap-icons";


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

    const filterMenuList = () => {
        const menuItemsList = stateReducer.menuItems;

        const filteredList = menuItemsList.filter((item: MenuItem) =>
            item.name.toLowerCase().includes(stateReducer.searchMenuItem.toLowerCase())
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
        const { customer } = stateReducer.formData

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

    const temporal_customer_list = filterCustomerList()

    const temporal_menu_list = filterMenuList()

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
                                    {temporal_customer_list.length > 0 ? (
                                        temporal_customer_list.map((customer: Customer) => (
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
                    <Row className="mt-5" style={{ height: "500px" }}>
                        <Col>
                            <InputGroup>
                                <Form.Control
                                    className="input"
                                    placeholder="Buscar platillo..."
                                    aria-label="Buscar platillo"
                                    value={stateReducer.searchMenuItem}
                                    onChange={(e) => changeValue("searchMenuItem", e.target.value)}
                                />
                                <DropdownButton
                                    className="btn"
                                    title="▼"
                                    id="input-group-dropdown-1"
                                    align="end"
                                    show={stateReducer.searchMenuItem !== ''}
                                >
                                    {temporal_menu_list.length > 0 ? (
                                        temporal_menu_list.map((item: MenuItem) => (
                                            <Dropdown.Item
                                                onClick={() => {
                                                    dispatch({
                                                        type: ordersActions.ADD_MENU_ITEM,
                                                        payload: {
                                                            prop: null,
                                                            data: item
                                                        }
                                                    })
                                                    changeValue("searchMenuItem", '');
                                                    console.log(stateReducer.formData.menuItems)
                                                }}
                                                key={`item-${item.id}`}
                                            >
                                                <div>
                                                    <div>{item.name}</div>
                                                </div>
                                            </Dropdown.Item>
                                        ))
                                    ) : (
                                        <Dropdown.Item disabled>No se encontraron platillos en el menu</Dropdown.Item>
                                    )}
                                </DropdownButton>
                            </InputGroup>

                            {stateReducer.formData.menuItems?.length > 0 && (
                                <div className="mt-2 p-2 border rounded bg-light">
                                    <strong className="d-block mb-2">Platillos seleccionados:</strong>
                                    <div className="selected-items-container">
                                        {stateReducer.formData.menuItems.map((item, index) => (
                                            <div
                                                key={`selected-item-${item.id || index}`}
                                                className="mb-2 pb-2 border-bottom d-flex align-items-center justify-content-between"
                                            >
                                                {/* Image on the left */}
                                                <div className="d-flex align-items-center" style={{ width: '40%' }}>
                                                    {item.images?.[0] && (
                                                        <img
                                                            src={item.images[0]}
                                                            alt={item.name || 'Menu item'}
                                                            className="rounded"
                                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                        />
                                                    )}
                                                    <div className="ml-3">
                                                        <div className="fw-medium">{item.name || 'Nombre no disponible'}</div>
                                                        {item.price && (
                                                            <small className="text-muted">${item.price}</small>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="d-flex align-items-center">
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary p-0 d-flex align-items-center justify-content-center"
                                                        style={{ width: '28px', height: '28px', borderRadius: '50%' }}

                                                    >
                                                        <FileMinus size={16} />
                                                    </button>

                                                    <span className="mx-2" style={{ minWidth: '20px', textAlign: 'center' }}>
                                                        {1}
                                                    </span>

                                                    <button
                                                        className="btn btn-sm btn-outline-secondary p-0 d-flex align-items-center justify-content-center"
                                                        style={{ width: '28px', height: '28px', borderRadius: '50%' }}
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Form>
            </FormModal >
        </>
    )
}

export default CreateOrderModal