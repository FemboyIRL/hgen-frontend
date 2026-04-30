import { Form, FormGroup, Row, Button, FormControl } from "react-bootstrap";
import FormModal from "../../../../components/FormModal/form-modal";
import { ReservationReducer } from "../../reducer/constants";
import ReservationsActions from "../../reducer/actions";
import { useEffect } from "react";

interface ReservationModalProps {
    state: ReservationReducer;
    dispatch: React.Dispatch<{
        type: string
        payload: any
    }>
    changeModal: () => void;
    onAddNewCustomer: () => void;
}

const ReservationModal = ({
    state,
    dispatch,
    changeModal,
    onAddNewCustomer,
}: ReservationModalProps) => {

    useEffect(() => {
        if (state.reservationModal) {
            if (state.currentReservation) {
                getReservation()
                console.log('papu')
            }
        }
    }, [state.reservationModal])

    const getReservation = () => {
        const selectedReservation = state.reservations.find(item => item.id === state.currentReservation?.id);
        dispatch({
            type: ReservationsActions.CHANGE_ALL_VALUE_FORM,
            payload: selectedReservation
        })
    }

    const changeValueForm = (prop: string, data: any) => {
        dispatch({
            type: ReservationsActions.CHANGE_VALUE_FORM,
            payload: {
                prop,
                data
            },
        });
    }

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const { name, value } = e.target
        changeValueForm(name, value)
    }


    const closeModal = () => {
        dispatch({
            type: ReservationsActions.RESET_FORM,
            payload: null
        })
        changeModal()
    }

    // const reloadList = () => {
    //     dispatch({
    //         type: ReservationsActions.RELOAD_LIST,
    //         payload: null,
    //     })
    // }

    const handleSave = () => {

    }

    return (
        <>
            <FormModal
                modalTitle={state.currentReservation ? "Editar una reservación" : 'Agregar una reservación'}
                status={state.reservationModal}
                btnText={state.currentReservation ? "Editar" : 'Agregar'}
                onSubmit={handleSave}
                size={'lg'}
                changeModal={() => closeModal()}
            >
                <Form>
                    {/* Sección de Cliente */}
                    <FormGroup className="mb-3">
                        <label>Cliente</label>
                        <div className="inputWithIcon d-flex gap-2">
                            <FormControl
                                list="customers-list"
                                type="text"
                                className="textInput"
                                placeholder="Busca un cliente..."
                                value={state.formData.customer.fullName}
                                onChange={(e) => {
                                    const selectedCustomer = state.customers.find(
                                        c => c.fullName === e.target.value || c.user_id === e.target.value
                                    );
                                    if (selectedCustomer) {
                                        handleOnChangeInput({
                                            target: {
                                                name: 'customer',
                                                value: {
                                                    customer_id: selectedCustomer.user_id,
                                                    customer_name: selectedCustomer.fullName,
                                                    customer_email: selectedCustomer.email,
                                                    customer_phone: selectedCustomer.phone || '',
                                                }
                                            }
                                        });
                                    } else {
                                        handleOnChangeInput({
                                            target: {
                                                name: 'customer.fullName',
                                                value: e.target.value
                                            }
                                        });
                                    }
                                }}
                                style={{ flex: 1 }}
                            />
                            <datalist id="customers-list">
                                {state.customers.map((customer) => (
                                    <option key={customer.user_id} value={customer.fullName}>
                                        {customer.fullName} - {customer.email} - {customer.phone}
                                    </option>
                                ))}
                            </datalist>
                            <Button
                                type="button"
                                className="imgButton"
                                onClick={onAddNewCustomer}
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                + Nuevo Cliente
                            </Button>
                        </div>
                    </FormGroup>

                    {/* Sección de Empleado */}
                    <FormGroup className="mb-3">
                        <label>Empleado</label>
                        <div className="inputWithIcon d-flex gap-2">
                            <FormControl
                                as="select"
                                className="textInput"
                                value={state.formData.employee.user_id}
                                name="employee.employee_id"
                                onChange={handleOnChangeInput}
                                style={{ flex: 1 }}
                            >
                                <option value="">Selecciona un empleado</option>
                                {state.employees.map((employee) => (
                                    <option key={employee.user_id} value={employee.user_id}>
                                        {employee.fullName}
                                    </option>
                                ))}
                            </FormControl>
                        </div>
                    </FormGroup>

                    {/* Número de habitación */}
                    <FormGroup className="mb-3">
                        <label>Número de habitación</label>
                        <div className="inputWithIcon">
                            <FormControl
                                as="select"
                                className="textInput"
                                value={state.formData.room.room_number}
                                name="room_number"
                                onChange={handleOnChangeInput}
                            >
                                <option value="">Selecciona una habitación</option>
                                {state.rooms?.map((room) => (
                                    <option key={room.room_number} value={room.room_number}>
                                        {room.room_number}
                                    </option>
                                ))}
                            </FormControl>
                        </div>
                    </FormGroup>

                    {/* Fechas */}
                    <Row className="mb-3">
                        <FormGroup as={Row} className="col-md-6">
                            <label>Fecha de check-in</label>
                            <div className="inputWithIcon">
                                <FormControl
                                    type="date"
                                    className="textInput"
                                    value={state.formData.check_in_date instanceof Date ?
                                        state.formData.check_in_date.toISOString().split('T')[0] :
                                        state.formData.check_in_date}
                                    name="check_in_date"
                                    onChange={handleOnChangeInput}
                                />
                            </div>
                        </FormGroup>
                        <FormGroup as={Row} className="col-md-6">
                            <label>Fecha de check-out</label>
                            <div className="inputWithIcon">
                                <FormControl
                                    type="date"
                                    className="textInput"
                                    value={state.formData.check_out_date instanceof Date ?
                                        state.formData.check_out_date.toISOString().split('T')[0] :
                                        state.formData.check_out_date}
                                    name="check_out_date"
                                    onChange={handleOnChangeInput}
                                />
                            </div>
                        </FormGroup>
                    </Row>

                    {/* Precio total y estado */}
                    <Row className="mb-3">
                        <FormGroup as={Row} className="col-md-6">
                            <label>Precio total</label>
                            <div className="inputWithIcon">
                                <FormControl
                                    type="number"
                                    className="textInput"
                                    placeholder="Ingresa el precio total"
                                    value={state.formData.total_price}
                                    name="total_price"
                                    onChange={handleOnChangeInput}
                                />
                            </div>
                        </FormGroup>
                        <FormGroup as={Row} className="col-md-6">
                            <label>Estado</label>
                            <div className="inputWithIcon">
                                <FormControl
                                    as="select"
                                    className="textInput"
                                    value={state.formData.status}
                                    name="status"
                                    onChange={handleOnChangeInput}
                                >
                                    <option value="pending">Pendiente</option>
                                    <option value="confirmed">Confirmada</option>
                                    <option value="cancelled">Cancelada</option>
                                    <option value="completed">Completada</option>
                                </FormControl>
                            </div>
                        </FormGroup>
                    </Row>

                    {/* Dirección de facturación */}
                    <FormGroup className="mb-3">
                        <label>Dirección de facturación</label>
                        <div className="inputWithIcon">
                            <FormControl
                                type="text"
                                className="textInput"
                                placeholder="Ingresa la dirección de facturación"
                                value={state.formData.billing_address}
                                name="billing_address"
                                onChange={handleOnChangeInput}
                            />
                        </div>
                    </FormGroup>

                    {/* Método de pago */}
                    <FormGroup className="mb-3">
                        <label>Método de pago</label>
                        <div className="inputWithIcon">
                            <FormControl
                                as="select"
                                className="textInput"
                                value={state.formData.payment_method}
                                name="payment_method"
                                onChange={handleOnChangeInput}
                            >
                                <option value="">Selecciona un método</option>
                                <option value="credit_card">Tarjeta de crédito</option>
                                <option value="debit_card">Tarjeta de débito</option>
                                <option value="cash">Efectivo</option>
                                <option value="bank_transfer">Transferencia bancaria</option>
                            </FormControl>
                        </div>
                    </FormGroup>
                </Form>
            </FormModal>
        </>
    );
};

export default ReservationModal;