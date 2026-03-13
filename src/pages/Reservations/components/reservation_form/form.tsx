import {
    CalendarCheck,
    People,
    CreditCard,
    Dash,
    Plus,
    InfoCircle,
    CheckCircle,
    ArrowRepeat,
    DoorOpen,
    Person,
    PersonBadge
} from "react-bootstrap-icons";
import DatePicker from "react-datepicker"
import { CustomInput } from "../../../HomePage/sections/welcome-section/reserve-bar/reserve-bar"
import { ReservationsReducer } from "../../reducer/constants"
import { Form, InputGroup } from "react-bootstrap"
import { Room } from "../../../../types/room"
import { toast } from "react-toastify"
import reservationsActions from "../../reducer/actions"
import './form.css'
import { useState } from "react"

interface ReservationFormProps {
    state: ReservationsReducer
    dispatch: React.Dispatch<({
        type: string,
        payload: any
    })>
    handleRoomChange: (room: Room) => void
    changeValueForm: (prop: string, data: any) => void
}


const ReservationForm: React.FC<ReservationFormProps> = ({ state, dispatch, handleRoomChange, changeValueForm }) => {
    const [isLoading] = useState<boolean>(false)
    const [startDate, endDate] = state.form.date_range;

    // const handleOnChangeInput = (
    //     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    // ) => {

    //     console.log(e.target.name)
    //     console.log(e.target.value)

    //     const { name, value } = e.target;

    //     dispatch({
    //         type: reservationsActions.CHANGE_VALUE_FORM,
    //         payload: {
    //             prop: name,
    //             data: value,
    //         },
    //     });
    // };

    const handleDateChange = (update: [Date | null, Date | null]) => {
        const [start, end] = update;

        if (!start || !end) {
            changeValueForm("date_range", update);
            return;
        }

        // Verifica si el rango seleccionado se cruza con alguna fecha ocupada
        const isRangeInvalid = state.form.occupied_dates.some(({ start: occupiedStart, end: occupiedEnd }: any) => {
            const occupiedStartDate = new Date(occupiedStart);
            const occupiedEndDate = new Date(occupiedEnd);

            return (
                (start >= occupiedStartDate && start <= occupiedEndDate) || // La fecha de inicio está dentro de un rango ocupado
                (end >= occupiedStartDate && end <= occupiedEndDate) ||    // La fecha de fin está dentro de un rango ocupado
                (start <= occupiedStartDate && end >= occupiedEndDate)     // El rango seleccionado abarca completamente un rango ocupado
            );
        });

        if (isRangeInvalid) {
            toast.error("El rango seleccionado se cruza con fechas ocupadas. Por favor, elige otras fechas.");
            return;
        }

        changeValueForm("date_range", update);
    };

    const handleGuestsChange = (prop: string, data: any) => {
        dispatch({
            type: reservationsActions.CHANGE_VALUE_GUESTS,
            payload: {
                prop,
                data: prop === "adults" ? (state.form.guests.adults + data) : (state.form.guests.children + data)
            }
        })
    }

    const handleRippleEffect = (e: any) => {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');

        // Eliminar ripples anteriores
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(ripple);

        // Eliminar después de la animación
        setTimeout(() => {
            ripple.remove();
        }, 600);
    };

    return (
        <>
            <aside className="reservation-sidebar">

                <h2 className="sidebar-title">
                    Reserva tu habitación
                </h2>

                <form className="reservation-form">

                    {/* SECCIÓN 1: ELIGE TU HABITACIÓN */}
                    <div className="form-section">
                        <div className="section-header">
                            <DoorOpen className="section-icon" />
                            <h3 className="section-title">Elige tu habitación</h3>
                        </div>

                        <InputGroup>
                            <Form.Select
                                name="room_number"
                                value={state.form.selected_room?.room_number || ""}
                                className="custom-select"
                            >
                                <option value="">
                                    Selecciona una habitación
                                </option>

                                {state.rooms.map((room) => (
                                    <option
                                        onClick={() => handleRoomChange(room)}
                                        key={room.room_number}
                                        value={room.room_number}
                                    >
                                        Habitación {room.room_number} - {room.type || 'Estándar'}
                                    </option>
                                ))}
                            </Form.Select>
                        </InputGroup>

                        {/* Información adicional de la habitación seleccionada */}
                        {state.form.selected_room && (
                            <div className="room-selected-info">
                                <div className="info-chip">
                                    <span>{state.form.selected_room.beds || 1} cama(s)</span>
                                </div>
                                <div className="info-chip">
                                    <People />
                                    <span>{state.form.selected_room.capacity || 2} personas</span>
                                </div>
                                {state.form.selected_room.amenities && (
                                    <div className="amenities-preview">
                                        {state.form.selected_room.amenities.slice(0, 3).map((item, i) => (
                                            <span key={i} className="amenity-tag">{item}</span>
                                        ))}
                                        {state.form.selected_room.amenities.length > 3 && (
                                            <span className="amenity-tag more">+{state.form.selected_room.amenities.length - 3}</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* SECCIÓN 2: FECHAS DE ESTADÍA */}
                    <div className="form-section">
                        <div className="section-header">
                            <CalendarCheck className="section-icon" />
                            <h3 className="section-title">Fechas de estadía</h3>
                        </div>

                        <DatePicker
                            selectsRange
                            startDate={startDate}
                            endDate={endDate}
                            onChange={handleDateChange}
                            placeholderText="Selecciona fechas de entrada y salida"
                            customInput={<CustomInput />}
                            withPortal
                            portalId="root"
                            popperPlacement="bottom"
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            className="date-picker-input"
                        />

                        {/* Resumen de fechas */}
                        {startDate && endDate && (
                            <div className="date-summary">
                                <div className="date-item">
                                    <span className="date-label">Entrada:</span>
                                    <span className="date-value">{startDate.toLocaleDateString()}</span>
                                </div>
                                <div className="date-item">
                                    <span className="date-label">Salida:</span>
                                    <span className="date-value">{endDate.toLocaleDateString()}</span>
                                </div>
                                <div className="date-item total-nights">
                                    <span className="date-label">Noches:</span>
                                    <span className="date-value highlight">
                                        {Math.ceil(
                                            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
                                        )} noches
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SECCIÓN 3: NÚMERO DE PERSONAS */}
                    <div className="form-section">
                        <div className="section-header">
                            <People className="section-icon" />
                            <h3 className="section-title">Número de personas</h3>
                        </div>

                        <div className="guests-selector">
                            <div className="guests-input-group">
                                <button
                                    type="button"
                                    className="guest-btn"
                                    onClick={() => handleGuestsChange('adults', -1)}
                                    disabled={state.form.guests.adults <= 1}
                                >
                                    <Dash />
                                </button>

                                <div className="guest-count">
                                    <span className="guest-number">{state.form.guests.adults || 0}</span>
                                    <span className="guest-label">
                                        <Person className="guest-type-icon" /> Adultos
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className="guest-btn"
                                    onClick={() => handleGuestsChange('adults', 1)}
                                    disabled={state.form.guests.adults >= (state.form.selected_room?.capacity || 4)}
                                >
                                    <Plus />
                                </button>
                            </div>

                            <div className="guests-input-group">
                                <button
                                    type="button"
                                    className="guest-btn"
                                    onClick={() => handleGuestsChange('children', -1)}
                                    disabled={state.form.guests.children <= 0}
                                >
                                    <Dash />
                                </button>

                                <div className="guest-count">
                                    <span className="guest-number">{state.form.guests.children || 0}</span>
                                    <span className="guest-label">
                                        <PersonBadge className="guest-type-icon" /> Niños
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className="guest-btn"
                                    onClick={() => handleGuestsChange('children', 1)}
                                    disabled={state.form.guests.children >= 3}
                                >
                                    <Plus />
                                </button>
                            </div>

                            {/* Capacidad máxima warning */}
                            {state.form.selected_room && (
                                <div className="capacity-info">
                                    <InfoCircle className="capacity-icon" />
                                    <span className="capacity-text">
                                        Capacidad máxima: {state.form.selected_room.capacity || 4} personas
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SECCIÓN 4: RESUMEN Y PRECIO */}
                    <div className="form-section price-section">
                        <div className="section-header">
                            <CreditCard className="section-icon" />
                            <h3 className="section-title">Resumen y precio</h3>
                        </div>

                        {/* Detalle del precio */}
                        {state.form.selected_room && startDate && endDate && (
                            <div className="price-detail">
                                <div className="price-row">
                                    <span>Precio por noche:</span>
                                    <span>${state.form.selected_room.price || 0}</span>
                                </div>
                                <div className="price-row">
                                    <span>Noches:</span>
                                    <span>{Math.ceil((endDate.getDate() - startDate.getDate()) / (1000 * 60 * 60 * 24))}</span>
                                </div>
                                <div className="price-row">
                                    <span>Personas:</span>
                                    <span>{(state.form.guests.adults || 0) + (state.form.guests.children || 0)}</span>
                                </div>
                                <div className="price-divider"></div>
                                <div className="price-row total">
                                    <span>Total:</span>
                                    <span className="total-amount">${state.form.price || 0}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* BOTÓN DE CONFIRMACIÓN */}
                    <button
                        className={`reserve-confirm-btn ${!state.form.selected_room || !startDate || !endDate
                            ? ''
                            : (state.form.guests.adults > (state.form.selected_room?.capacity || 4)
                                ? 'warning'
                                : 'success')
                            } ${isLoading ? 'loading' : ''}`}
                        disabled={!state.form.selected_room || !startDate || !endDate || isLoading}
                        onClick={handleRippleEffect}
                    >
                        {isLoading ? (
                            <ArrowRepeat className="btn-icon spinning" />
                        ) : (
                            <CheckCircle className="btn-icon" />
                        )}
                        <span className="btn-text">
                            {isLoading ? 'Procesando...' : 'Confirmar reserva'}
                        </span>
                        {state.form.selected_room && startDate && endDate && !isLoading && (
                            <span className="btn-price">${state.form.price}</span>
                        )}
                    </button>

                </form>

            </aside>
        </>
    )
}

export default ReservationForm