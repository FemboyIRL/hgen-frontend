import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Search, CalendarCheckFill } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./reserve-bar.css";
import { reducer, roomSelectionActions, roomSelectionInitial } from "../reducer/reducer";
import SetGuestsModal from "../set-guests-modal/set-guests-modal";

interface CustomInputProps {
    value?: string
    onClick?: () => void
}


const ReservaBar = () => {
    const [state, dispatch] = useReducer(reducer, roomSelectionInitial);
    const { dateRange, huespedes } = state;
    const [startDate, endDate] = dateRange;
    const navigate = useNavigate();

    const handleDateChange = (update: [Date | null, Date | null]) => {
        changeValue("dateRange", update);
    };

    const changeValue = (prop: string, data: any) => {
        dispatch({
            type: roomSelectionActions.CHANGE_VALUE,
            payload: {
                prop,
                data
            }
        })
    }

    const CustomInput: React.FC<CustomInputProps> = ({ value, onClick }) => {
        return (
            <div className="input-group" onClick={onClick} style={{ cursor: 'pointer' }}>
                <input
                    type="text"
                    className="form-control"
                    value={value}
                    readOnly
                    placeholder="Selecciona fechas"
                />
                <div className="input-group-append">
                    <CalendarCheckFill />
                </div>
            </div>
        )
    }

    // Manejar envío del formulario
    const handleSubmit = () => {
        if (!startDate || !endDate) {
            alert("Por favor, selecciona las fechas de check-in y check-out.");
            return;
        }
        navigate("/Reservation");
    };

    return (
        <>
            <div className="reserva-bar">
                <div className="reserva-bar-content">
                    <h1 className="reserva-bar-title">Reserva Aqui</h1>
                    <form className="reserva-bar-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="reserva-bar-fields">
                            <div className="reserva-bar-field">
                                <label htmlFor="date-picker">Check-in / Check-out</label>
                                <DatePicker
                                    selectsRange
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={(update) => {
                                        handleDateChange(update);
                                    }}
                                    placeholderText="Selecciona fechas "
                                    id="date-picker"
                                    className="date-picker-input"
                                    customInput={<CustomInput />}
                                    withPortal
                                />
                            </div>
                            <div className="reserva-bar-field huespedes">
                                <label htmlFor="huespedes">Huéspedes</label>
                                <input
                                    type="text"
                                    id="huespedes"
                                    value={huespedes}
                                    readOnly
                                    aria-label="Número de huéspedes"
                                    onClick={() => changeValue('roomModal', !state.roomModal)} />
                            </div>
                        </div>
                        <div className="reserva-bar-button">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                aria-label="Buscar hoteles"
                            >
                                <Search />
                                <span>Buscar</span>
                            </button>
                        </div>
                    </form>
                </div>
                <SetGuestsModal stateReducer={state} dispatch={dispatch} changeModal={() => changeValue('roomModal', !state.roomModal)} />
            </div>
        </>
    );
};

export default ReservaBar;