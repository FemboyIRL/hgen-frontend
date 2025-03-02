import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "react-bootstrap-icons";
import "./reserve-bar.css";

const ReservaBar = () => {
    const [fecha, setFecha] = useState<string>(new Date().toISOString().split("T")[0]); // Formato YYYY-MM-DD
    const [personas, setPersonas] = useState<number>(1);
    const navigate = useNavigate();

    // Manejar cambio de fecha
    const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFecha(e.target.value);
    };

    // Manejar cambio de número de personas
    const handlePersonasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            setPersonas(Math.max(1, Math.min(4, value))); // Limitar entre 1 y 4
        }
    };

    // Manejar envío del formulario
    const handleSubmit = () => {
        navigate("/Reservation");
    };

    return (
        <div className="barra-reserva">
            <div>
                <label htmlFor="fecha-reserva">Fecha de Reserva</label>
                <input
                    type="date"
                    id="fecha-reserva"
                    className="fecha-reserva"
                    value={fecha}
                    onChange={handleFechaChange}
                    aria-label="Fecha de reserva"
                />
            </div>
            <div>
                <label htmlFor="num-personas">Número de Personas</label>
                <input
                    type="number"
                    id="num-personas"
                    className="num-personas"
                    value={personas}
                    onChange={handlePersonasChange}
                    min="1"
                    max="4"
                    aria-label="Número de personas"
                    placeholder="Número de personas"
                />
            </div>
            <button
                className="btn-reserva"
                onClick={handleSubmit}
                aria-label="Realizar la reserva"
            >
                <Search />
                <span className="btn-text"></span>{" "}
            </button>
        </div>
    );
};

export default ReservaBar;