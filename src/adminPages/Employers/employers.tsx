/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Row } from "react-bootstrap";
import { PencilFill, Trash3Fill } from "react-bootstrap-icons";
import LoadingSpinnerContainer from "../../components/LoadingSpinner/loading-spinner";
import '../module-styles.css'
import { useEffect, useReducer } from "react";
import { reducer, initialState, EmployeeActions } from "./reducer/reducer"
import ApiConsumer from "../../services/api_consumer";
import { Employee } from "../../types/employee";
import { FaSearch, FaUserPlus, FaUserTie } from "react-icons/fa";
import { dummyEmployees } from "../../pages/HomePage/dummy_data";
import DeleteEmployeeModal from "./modals/deleteEmployeeModal/deleteModal";
import CreateEmployeeModal from "./modals/createEmployeeModal/userModal";

const Employers = new ApiConsumer({ url: "clients" })

const EmployeesPage = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const filterEmployeeList = () => {
        const employeeList = state.employees;

        const filteredList = employeeList.filter((employee: Employee) =>
            employee.fullName.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            employee.position.includes(state.searchTerm)
        );

        return filteredList;
    };

    useEffect(() => {
        // getEmployers();
        dispatch({
            type: EmployeeActions.LOADED_EMPLOYEES_LIST,
            payload: dummyEmployees
        })
    }, [state.loading]);

    const getEmployees = async () => {
        try {
            const { status, data } = await Employers.getAll(
                state.searchTerm ? `?search=${state.searchTerm}` : ''
            );
            if (status) {
                dispatch({
                    type: EmployeeActions.LOADED_EMPLOYEES_LIST,
                    payload: data.data
                });
            }
        } catch (error) {
            console.error('Error fetching Employers:', error);
        }
    }

    const changeValue = (prop: string, data: any) => {
        dispatch({
            type: EmployeeActions.CHANGE_VALUE,
            payload: {
                prop,
                data
            }
        })
    }

    const selectEmployeeId = (prop: any, data: any, employee: Employee) => {
        changeValue(prop, data);
        changeValue("currentEmployee", employee)
    }

    const temporal_list = filterEmployeeList();

    return (
        <>
            <div className="moduleContain">
                <div className="moduleInner">
                    <div className="innerContent">
                        <div className="innerContain">
                            <div className="titleContain">
                                <FaUserTie size={50} color="#000" />
                                <div className="title">
                                    <h3>Empleados</h3>
                                    <p>Lista de Empleados registrados</p>
                                </div>
                            </div>
                            <div className="searchBarContain">
                                <Row style={{ alignItems: "center" }}>
                                    <Col xs="12" sm="7" md="7" lg="7" xl="8">
                                        <Row>
                                            <form action="">
                                                <FaSearch size={18} />

                                                <input
                                                    type="search"
                                                    name="searchBar"
                                                    value={state.searchTerm}
                                                    onChange={(e) =>
                                                        changeValue("searchTerm", e.target.value)
                                                    }
                                                    placeholder="Buscar empleado..."
                                                />
                                            </form>
                                        </Row>
                                    </Col>

                                    <Col xs="12" sm="5" md="5" lg="5" xl="4">
                                        <Row style={{ justifyContent: "end" }}>
                                            <Button
                                                onClick={() =>
                                                    changeValue(
                                                        "employeeModal",
                                                        !state.employeeModal
                                                    )
                                                }
                                            >
                                                Nuevo Empleado
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
                                        <p>No se encontraron empleados.</p>
                                    ) : (
                                        <div className="tableModule">
                                            <table className="tableContain">
                                                <thead>
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>Email</th>
                                                        <th>Puesto</th>
                                                        <th>Fecha de contratación</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {temporal_list.map((employee: any) => (
                                                        <tr key={`employee-${employee.user_id}`}>
                                                            <td>{employee.fullName}</td>
                                                            <td>{employee.email}</td>
                                                            <td>{employee.position}</td>
                                                            <td>{new Date(employee.hire_date).toLocaleDateString()}</td>
                                                            <td>
                                                                <div className="controllerOptions">
                                                                    <div className="optionsInner">
                                                                        <div className="option delete">
                                                                            <Trash3Fill
                                                                                onClick={() => selectEmployeeId("deleteEmployeeModal", !state.deleteEmployeeModal, employee)}
                                                                            />
                                                                        </div>
                                                                        <div className="option edit">
                                                                            <PencilFill
                                                                                onClick={() => selectEmployeeId("employeeModal", !state.employeeModal, employee)}
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
            <DeleteEmployeeModal stateReducer={state} dispatch={dispatch} changeModal={() => changeValue("deleteEmployeeModal", !state.deleteEmployeeModal)} />
            <CreateEmployeeModal stateReducer={state} dispatch={dispatch} changeModal={() => changeValue("employeeModal", !state.employeeModal)} />
        </>
    );
}

export default EmployeesPage