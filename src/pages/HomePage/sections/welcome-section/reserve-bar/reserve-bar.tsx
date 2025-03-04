import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./reserve-bar.css";

const ReservaBar = () => {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;
    const [huespedes, setHuespedes] = useState<string>("1 hab., 2 personas");
    const navigate = useNavigate();

    // Manejar envío del formulario
    const handleSubmit = () => {
        if (!startDate || !endDate) {
            alert("Por favor, selecciona las fechas de check-in y check-out.");
            return;
        }
        navigate("/Reservation");
    };

    return (
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
                                    setDateRange(update);
                                }}
                                placeholderText="Selecciona fechas"
                                id="date-picker"
                                className="date-picker-input"
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
                                onClick={() => alert("Selector de huéspedes no implementado")}
                            />
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
        </div>
    );
};

export default ReservaBar;