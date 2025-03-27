import { useEffect, useReducer } from "react"
import { Button, Col, Row } from "react-bootstrap"
import { PencilFill, Trash3Fill } from "react-bootstrap-icons"
import { initialState, ordersActions, reducer } from "./reducer/reducer"
import LoadingSpinnerContainer from "../../components/LoadingSpinner/loading-spinner"
import ApiConsumer from "../../services/api_consumer"
import { Order } from "../../interfaces/OrdersInterface"
import CreateOrderModal from "./orderModal/orderModal"

const Orders = new ApiConsumer({ url: "orders/" })
const Customers = new ApiConsumer({ url: "clients/" })

const OrderPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const filterOrderList = () => {
        const ordersList = state.orders

        return ordersList
    }

    useEffect(() => {
        getOrders()
        getCustomers()
    }, [state.loading])


    const getCustomers = async () => {
        try {
            const { status, data } = await Customers.getAll()
            if (status) {
                dispatch({
                    type: ordersActions.CHANGE_VALUE,
                    payload: {
                        prop: 'customers',
                        data: data.data
                    }
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getOrders = async () => {
        try {
            const { status, data } = await Orders.getAll()
            if (status) {
                dispatch({
                    type: ordersActions.LOADED_ORDERS_LIST,
                    payload: data
                })
            }
        } catch (e) {
            console.log('papu', e)
        }
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

    const temporal_list = filterOrderList()

    const selectOrderId = (prop: any, data: any, order: Order) => {
        changeValue(prop, data)
        changeValue("currentOrder", order)
    }

    return (
        <>
            <div className="moduleContain">
                <div className="moduleInner">
                    <div className="innerContent">
                        <div className="innerContain">
                            <div className="titleContain">
                                <img src="/assets/icons/icon-order.svg" alt="" width={50} />
                                <div className="title">
                                    <h3>Ordenes</h3>
                                    <p>Lista de Ordenes registradas</p>
                                </div>
                            </div>
                            <div className="searchBarContain">
                                <Row style={{ alignItems: "center" }}>
                                    <Col xs="12" sm="7" md="7" lg="7" xl="8">
                                        <Row>

                                        </Row>
                                    </Col>
                                    <Col xs="12" sm="5" md="5" lg="5" xl="4">
                                        <Row style={{ justifyContent: "end" }}>
                                            <Button onClick={() => changeValue("orderModal", !state.orderModal)}>
                                                Nueva Orden
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            {state.loading ? (
                                <LoadingSpinnerContainer />
                            ) : (
                                <>
                                    {temporal_list ? (
                                        <p>No se encontraron ordenes.</p>
                                    ) : (
                                        <div className="tableModule">
                                            <table className="tableContain">
                                                <thead>
                                                    <tr>
                                                        <th>Precio</th>
                                                        <th>Cliente</th>
                                                        <th>Teléfono</th>
                                                        <th>Fecha</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {temporal_list.map((order: Order) => (
                                                        <tr key={`order-${order.order_id}`}>
                                                            <td>{`${order.total_price}`}</td>
                                                            <td>{order.user_name}</td>
                                                            <td>{String(order.order_date)}</td>
                                                            <td>
                                                                <div className="controllerOptions">
                                                                    <div className="optionsInner">
                                                                        <div className="option delete">
                                                                            <Trash3Fill
                                                                                onClick={() => selectOrderId("deleteOrderModal", !state.deleteOrderModal, order)}
                                                                            />
                                                                        </div>
                                                                        <div className="option edit">
                                                                            <PencilFill
                                                                                onClick={() => selectOrderId("orderModal", !state.orderModal, order)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <CreateOrderModal stateReducer={state} dispatch={dispatch} changeModal={() => changeValue("orderModal", !state.orderModal)} />
        </>
    )
}

export default OrderPage