import { Col, Dropdown, DropdownButton, Form, Row, InputGroup, Button, Badge, } from "react-bootstrap";
import { OrderReducer } from "../reducer/constants";
import ApiConsumer from "../../../services/api_consumer";
import { useEffect } from "react";
import ordersActions from "../reducer/actions";
import FormModal from "../../../components/FormModal/form-modal";
import { Customer } from "../../../interfaces/CustomerInterface";
import { MenuItem } from "../../../interfaces/MenuItemInterface";
import { Plus } from "react-bootstrap-icons";


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
        changeValue("searchCustomer", '')
        changeValue("searchMenuItem", '')
        changeModal()
    }

    const reloadList = () => {
        dispatch({
            type: ordersActions.RELOAD_LIST,
            payload: null,
        })
    }

    const handleSave = async () => {

        console.log('platillos', stateReducer.formData.menuItems)

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

    const handleOnChangeInput = (e: React.MouseEvent | React.ChangeEvent) => {
        const target = e.currentTarget as HTMLElement;
        const actionType = target.dataset.action;
        const itemId = target.dataset.itemId;
        const category = target.dataset.category;

        if (!itemId || !category || !actionType) return;

        // Para el input numérico
        const inputValue = actionType === "input"
            ? Math.max(1, parseInt((target as HTMLInputElement).value)) || 1
            : null;

        console.log(inputValue, actionType, category)

        dispatch({
            type: ordersActions.UPDATE_MENU_ITEM_QUANTITY,
            payload: {
                category,
                itemId: parseInt(itemId),
                action: actionType,
                value: inputValue
            }
        });
    };

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
                    <div className="container">
                        <Row>
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
                        <Row className="mt-2" >
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
                                                                item: item,
                                                                quantity: 1,
                                                            }
                                                        })
                                                        changeValue("searchMenuItem", '');
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

                                {Object.keys(stateReducer.formData.menuItems).length > 0 && (
                                    <Form.Group className="mt-3">
                                        <Form.Label className="fw-bold">Platillos seleccionados</Form.Label>

                                        {Object.entries(stateReducer.formData.menuItems).map(([category, items]) => {
                                            console.log(category)
                                            console.log(items)
                                            return (
                                                <>
                                                    <div key={`category-${category}`} className="border rounded bg-light p-2 mb-3">
                                                        {items.map((group) => (
                                                            <Form.Control
                                                                as="div"
                                                                key={`selected-item-${group.item.id}`}
                                                                className="mb-2 p-2 border-bottom d-flex align-items-center"
                                                            >
                                                                <div className="d-flex align-items-center flex-grow-1">
                                                                    {/* Image */}
                                                                    <div className="mr-3" style={{ width: '50px', height: '50px' }}>
                                                                        <img
                                                                            src={group.item.images?.[0] || '/placeholder-food.jpg'}
                                                                            alt={group.item.name}
                                                                            className="img-fluid rounded"
                                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                                        />
                                                                    </div>

                                                                    {/* Name and Price */}
                                                                    <div className="flex-grow-1">
                                                                        <div className="fw-medium">{group.item.name || 'Nombre no disponible'}</div>
                                                                        {group.item.price && (
                                                                            <small className="text-muted">
                                                                                ${group.item.price} c/u
                                                                            </small>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                {/* Quantity Controls */}
                                                                <div className="d-flex align-items-center ml-3">
                                                                    <Button
                                                                        variant="outline-secondary"
                                                                        size="sm"
                                                                        className="p-0 rounded-circle"
                                                                        style={{ width: '28px', height: '28px' }}
                                                                        data-action="decrease"
                                                                        data-item-id={group.item.id}
                                                                        data-category={group.category}
                                                                        onClick={handleOnChangeInput}
                                                                        disabled={group.quantity <= 1}
                                                                    >
                                                                        -
                                                                    </Button>

                                                                    <Form.Control
                                                                        type=""
                                                                        name="quantity"
                                                                        min="1"
                                                                        value={group.quantity}
                                                                        data-item-id={group.item.id}
                                                                        data-category={group.category}
                                                                        onChange={handleOnChangeInput}
                                                                        className="mx-2 text-center"
                                                                        style={{ width: '45px' }}
                                                                    />

                                                                    <Button
                                                                        variant="outline-secondary"
                                                                        size="sm"
                                                                        className="p-0 rounded-circle"
                                                                        style={{ width: '28px', height: '28px' }}
                                                                        data-action="increase"
                                                                        data-item-id={group.item.id}
                                                                        data-category={group.category}
                                                                        onClick={handleOnChangeInput}
                                                                    >
                                                                        <Plus size={16} />
                                                                    </Button>
                                                                </div>
                                                            </Form.Control>
                                                        ))}
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </Form.Group>
                                )}
                            </Col>
                        </Row>
                    </div>
                </Form>
            </FormModal >
        </>
    )
}

export default CreateOrderModal