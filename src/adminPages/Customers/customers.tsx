/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Row } from "react-bootstrap";
import { PencilFill, Trash3Fill } from "react-bootstrap-icons";
import LoadingSpinnerContainer from "../../components/LoadingSpinner/loading-spinner";
import '../module-styles.css'
import { useEffect, useReducer } from "react";
import { reducer, initialState, CustomerActions } from "./reducer/reducer"
import ApiConsumer from "../../services/api_consumer";
import DeleteModal from "./modals/deleteCustomerModal/deleteModal";
import { Customer } from "../../types/customer";
import CreateClientModal from "./modals/createCustomerModal/userModal";

const Customers = new ApiConsumer({ url: "clients" })

const CustomersPage = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const filterCustomerList = () => {
        const customerList = state.customers;

        const filteredList = customerList.filter((customer: Customer) =>
            customer.fullName.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            customer.phone.includes(state.searchTerm)
        );

        return filteredList;
    };

    useEffect(() => {
        getCustomers();
    }, [state.loading]);

    const getCustomers = async () => {
        try {
            const { status, data } = await Customers.getAll(
                state.searchTerm ? `?search=${state.searchTerm}` : ''
            );
            if (status) {
                dispatch({
                    type: CustomerActions.LOADED_CUSTOMERS_LIST,
                    payload: data.data
                });
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    }

    const changeValue = (prop: string, data: any) => {
        dispatch({
            type: CustomerActions.CHANGE_VALUE,
            payload: {
                prop,
                data
            }
        })
    }

    const selectCustomerId = (prop: any, data: any, customer: Customer) => {
        changeValue(prop, data);
        changeValue("currentCustomer", customer)
    }

    const temporal_list = filterCustomerList();

    return (
        <>
            <div className="moduleContain">
                <div className="moduleInner">
                    <div className="innerContent">
                        <div className="innerContain">
                            <div className="titleContain">
                                <img src="/assets/icons/icon-customer.svg" alt="" width={50} />
                                <div className="title">
                                    <h3>Clientes</h3>
                                    <p>Lista de Clientes registrados</p>
                                </div>
                            </div>
                            <div className="searchBarContain">
                                <Row style={{ alignItems: "center" }}>
                                    <Col xs="12" sm="7" md="7" lg="7" xl="8">
                                        <Row>
                                            <form action="">
                                                <img src="/icons/iconSearch.svg" alt="" />
                                                <input
                                                    type="search"
                                                    name="searchBar"
                                                    value={state.searchTerm}
                                                    onChange={(e) => changeValue("searchTerm", e.target.value)}
                                                />
                                            </form>
                                        </Row>
                                    </Col>
                                    <Col xs="12" sm="5" md="5" lg="5" xl="4">
                                        <Row style={{ justifyContent: "end" }}>
                                            <Button onClick={() => changeValue("customerModal", !state.customerModal)}>
                                                Nuevo Cliente
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            {state.loading ? (
                                <LoadingSpinnerContainer />
                            ) : (
                                <>
                                    {temporal_list.length === 0 ? (
                                        <p>No se encontraron clientes.</p>
                                    ) : (
                                        <div className="tableModule">
                                            <table className="tableContain">
                                                <thead>
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>Email</th>
                                                        <th>Teléfono</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {temporal_list.map((customer: any) => (
                                                        <tr key={`customer-${customer.id}`}>
                                                            <td>{`${customer.fullName}`}</td>
                                                            <td>{customer.email}</td>
                                                            <td>{customer.phone}</td>
                                                            <td>
                                                                <div className="controllerOptions">
                                                                    <div className="optionsInner">
                                                                        <div className="option delete">
                                                                            <Trash3Fill
                                                                                onClick={() => selectCustomerId("deleteCustomerModal", !state.deleteCustomerModal, customer)}
                                                                            />
                                                                        </div>
                                                                        <div className="option edit">
                                                                            <PencilFill
                                                                                onClick={() => selectCustomerId("customerModal", !state.customerModal, customer)}
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
            <DeleteModal stateReducer={state} dispatch={dispatch} changeModal={() => changeValue("deleteCustomerModal", !state.deleteCustomerModal)} />
            <CreateClientModal stateReducer={state} dispatch={dispatch} changeModal={() => changeValue("customerModal", !state.customerModal)} />
        </>
    );
}

export default CustomersPage