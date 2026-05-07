import { Col, Form, Row } from "react-bootstrap";
import { MenuItemsList, OrderReducer } from "../reducer/constants";
import ApiConsumer from "../../../services/api_consumer";
import { useCallback, useEffect, useMemo } from "react";
import ordersActions from "../reducer/actions";
import FormModal from "../../../components/FormModal/form-modal";
import { Customer } from "../../../types/customer";
import { MenuItem } from "../../../types/menu_item";
import CustomerSearchSection from "../components/customer_search_bar";
import MenuItemSearchSection from "../components/menu_item_search";
import CartItemRow from "../components/cart_item_row";


interface CreateOrderModalProps {
    stateReducer: OrderReducer
    dispatch: React.Dispatch<{
        type: string;
        payload: any;
    }>
    changeModal: () => void
}

const Order = new ApiConsumer({ url: 'orders/' })

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

    // Función para transformar order del backend a formData
    const transformOrderToFormData = (order: any) => {
        // Verificar si order.menu_items tiene cantidades o necesitas asumir quantity = 1
        const menuItemsMap: Record<string, MenuItemsList[]> = {};

        order.menu_items.forEach((item: MenuItem) => {
            // ⚠️ Aquí está el problema: tu backend no envía quantity
            // Por ahora asumimos quantity = 1, pero deberías agregar quantity en el backend
            const quantity = 1; // Si no viene, default 1

            const categoryKey = item.id;

            if (!menuItemsMap[categoryKey]) {
                menuItemsMap[categoryKey] = [];
            }

            menuItemsMap[categoryKey].push({
                item: item,
                quantity: quantity,
                category: 0
            });
        });

        return {
            customer: order.user_id ? {
                user_id: order.user_id,
                fullName: order.user_name,
                email: order.user_email,
                phone: order.user_phone || ''
            } : null,
            menuItems: menuItemsMap
        };
    };

    // const transformFormDataToOrder = (formData: any) => {
    //     const menuItemsArray: MenuItem[] = [];

    //     Object.values(formData.menuItems).forEach((items: any) => {
    //         items.forEach(({ item, quantity }: MenuItemsList) => {

    //             for (let i = 0; i < quantity; i++) {
    //                 menuItemsArray.push(item);
    //             }
    //         });
    //     });

    //     return {
    //         user_id: formData.customer?.user_id,
    //         menu_items: menuItemsArray,
    //     };
    // };
    const getOrderData = () => {
        if (!stateReducer.currentOrder) return;

        // Transformar los datos del backend al formato del form
        const transformedFormData = transformOrderToFormData(stateReducer.currentOrder);

        // Actualizar el formData con los datos transformados
        dispatch({
            type: ordersActions.CHANGE_ALL_VALUE_FORM,
            payload: transformedFormData
        });
    };

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

        const { customer, menuItems } = stateReducer.formData

        const totalPrice = Object.values(menuItems)
            .flat()
            .reduce((total, menuItem) => {
                return total = total + (menuItem.quantity * Number(menuItem.item.price));
            }, 0);

        const body = {
            customer_id: customer?.user_id,
            total_price: totalPrice,
            menuItems
        }

        const { status } = stateReducer.currentOrder ? await Order.update(body, stateReducer.currentOrder.order_id) : await Order.create(body)

        if (status) {
            closeModal()
            reloadList()
        }
    };

    // const onDelete = () => {
    //     dispatch({
    //         type: ordersActions.CHANGE_VALUE,
    //         payload: {
    //             prop: 'deleteOrderModal',
    //             data: !stateReducer.deleteOrderModal
    //         }
    //     })
    // }

    const changeValue = (prop: string, data: any) => {
        dispatch({
            type: ordersActions.CHANGE_VALUE,
            payload: {
                prop,
                data
            }
        })
    }


    const handleQuantityChange = useCallback((
        itemId: string,
        category: string,
        action: 'increase' | 'decrease' | 'input',
        value?: number
    ) => {
        dispatch({
            type: ordersActions.UPDATE_MENU_ITEM_QUANTITY,
            payload: {
                category,
                itemId,
                action,
                value
            }
        });
    }, [dispatch]);

    // Eliminar item del carrito
    const handleRemoveItem = useCallback((itemId: string, category: string) => {
        dispatch({
            type: ordersActions.DELETE_MENU_ITEM,
            payload: { category, itemId }
        });
    }, [dispatch]);

    // Calcular total del pedido
    const calculateTotal = useMemo(() => {
        let total = 0;
        Object.values(stateReducer.formData.menuItems).forEach((items: any[]) => {
            items.forEach(({ item, quantity }) => {
                total += (item.price || 0) * quantity;
            });
        });
        return total.toFixed(2);
    }, [stateReducer.formData.menuItems]);

    // Obtener items del carrito de forma plana (para facilitar el render)
    const cartItems = useMemo(() => {
        const items: Array<MenuItemsList & { categoryKey: string }> = [];
        Object.entries(stateReducer.formData.menuItems).forEach(([categoryKey, itemsList]) => {
            itemsList.forEach(item => {
                items.push({ ...item, categoryKey });
            });
        });
        return items;
    }, [stateReducer.formData.menuItems]);

    const hasItems = cartItems.length > 0;

    const temporal_customer_list = filterCustomerList()

    const temporal_menu_list = filterMenuList()

    return (
        <>
            <FormModal
                modalTitle={stateReducer.currentOrder ? "Editar una orden" : 'Agregar una orden'}
                status={stateReducer.orderModal}
                btnText={stateReducer.currentOrder ? "Editar" : 'Agregar'}
                onSubmit={handleSave}
                size={'lg'}
                changeModal={closeModal}
            >
                <Form>
                    <div className="container">
                        {/* Sección de selección de cliente */}
                        <Row>
                            <Col>
                                <CustomerSearchSection
                                    searchCustomer={stateReducer.searchCustomer}
                                    selectedCustomer={stateReducer.formData.customer}
                                    customerList={temporal_customer_list}
                                    onSearchChange={(value) => changeValue("searchCustomer", value)}
                                    onSelectCustomer={(customer) => {
                                        changeValueForm('customer', customer);
                                        changeValue("searchCustomer", '');
                                    }}
                                />
                            </Col>
                        </Row>

                        {/* Sección de selección de platillos */}
                        <Row className="mt-2">
                            <Col>
                                <MenuItemSearchSection
                                    searchMenuItem={stateReducer.searchMenuItem}
                                    menuList={temporal_menu_list}
                                    onSearchChange={(value) => changeValue("searchMenuItem", value)}
                                    onSelectItem={(item) => {
                                        dispatch({
                                            type: ordersActions.ADD_MENU_ITEM,
                                            payload: { item, quantity: 1 }
                                        });
                                        changeValue("searchMenuItem", '');
                                    }}
                                />

                                {/* Lista de platillos seleccionados */}
                                {hasItems && (
                                    <Form.Group className="mt-3">
                                        <Form.Label className="fw-bold">
                                            Platillos seleccionados ({cartItems.length} items)
                                        </Form.Label>

                                        {cartItems.map(({ item, quantity, categoryKey }) => (
                                            <CartItemRow
                                                key={`${categoryKey}-${item.id}`}
                                                item={item}
                                                quantity={quantity}
                                                categoryKey={categoryKey}
                                                onQuantityChange={handleQuantityChange}
                                                onRemove={handleRemoveItem}
                                            />
                                        ))}

                                        {/* Total del pedido */}
                                        <div className="mt-3 pt-2 border-top">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <strong>Total:</strong>
                                                <strong className="fs-5">${calculateTotal}</strong>
                                            </div>
                                        </div>
                                    </Form.Group>
                                )}
                            </Col>
                        </Row>
                    </div>
                </Form>
            </FormModal>
        </>
    )
}

export default CreateOrderModal