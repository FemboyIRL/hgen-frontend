import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "react-bootstrap-icons";
import "./reserve-bar.css";

const ReservaBar = () => {
    const [checkIn, setCheckIn] = useState<string>("");
    const [checkOut, setCheckOut] = useState<string>("");
    const [huespedes, setHuespedes] = useState<string>("1 hab., 2 personas");
    const navigate = useNavigate();

    // Manejar cambio de fecha de check-in
    const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckIn(e.target.value);
    };

    // Manejar cambio de fecha de check-out
    const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckOut(e.target.value);
    };

    // Manejar envío del formulario
    const handleSubmit = () => {
        if (!checkIn || !checkOut) {
            alert("Por favor, selecciona las fechas de check-in y check-out.");
            return;
        }
        navigate("/Reservation");
    };

    return (
        <div className="reserva-bar">
            <div className="reserva-bar-content">
                <h1 className="reserva-bar-title">Reserva Aquí</h1>
                <form className="reserva-bar-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="reserva-bar-fields">
                        <div className="reserva-bar-field">
                            <label htmlFor="check-in">Check-in</label>
                            <input
                                type="date"
                                id="check-in"
                                value={checkIn}
                                onChange={handleCheckInChange}
                                aria-label="Fecha de check-in"
                            />
                        </div>
                        <div className="reserva-bar-field">
                            <label htmlFor="check-out">Check-out</label>
                            <input
                                type="date"
                                id="check-out"
                                value={checkOut}
                                onChange={handleCheckOutChange}
                                aria-label="Fecha de check-out"
                            />
                        </div>
                        <div className="reserva-bar-field">
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
                    <button
                        type="submit"
                        className="reserva-bar-button"
                        onClick={handleSubmit}
                        aria-label="Buscar hoteles"
                    >
                        <Search />
                        <span>Buscar</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReservaBar;