import { CalendarCheckFill, DoorOpenFill } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./reserve-bar.css";
import { toast } from "react-toastify";
import HOME_ACTIONS from "../../../reducer/actions";
import { Room } from "../../../../../types/room";

interface CustomInputProps {
    value?: string
    onClick?: () => void
}

interface ReserveBarProps {
    state: any,
    dispatch: React.Dispatch<{
        type: string,
        payload: any
    }>;
}

interface CustomSelectInputProps {
    value?: string;
    onClick?: () => void;
}

export const CustomSelectInput: React.FC<CustomSelectInputProps> = ({ value, onClick }) => {
    return (
        <div
            className="input-group flex-nowrap shadow-sm rounded-3 border-0"
            onClick={onClick}
            style={{
                cursor: "pointer",
                transition: 'all 0.2s ease',
                border: '2px solid #e9ecef',
                backgroundColor: '#f8f9fa'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#dee2e6';
                e.currentTarget.style.backgroundColor = '#f1f3f5';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e9ecef';
                e.currentTarget.style.backgroundColor = '#f8f9fa';
            }}
            onFocus={(e) => {
                e.currentTarget.style.borderColor = '#0d6efd';
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.boxShadow = '0 0 0 0.25rem rgba(13, 110, 253, 0.25)';
            }}
        >
            <input
                type="text"
                className="form-control border-0 bg-transparent py-3"
                value={value}
                readOnly
                placeholder="Selecciona habitación"
                style={{
                    fontSize: '1rem',
                    cursor: "pointer",
                    boxShadow: 'none'
                }}
            />
            <div className="input-group-append d-flex justify-content-end align-items-center px-3">
                <DoorOpenFill
                    size={20}
                    className="text-secondary"
                    style={{ transition: 'color 0.2s ease' }}
                />
            </div>
        </div>
    );
};

export const CustomInput: React.FC<CustomInputProps> = ({ value, onClick }) => {
    return (
        <div
            className="input-group flex-nowrap shadow-sm rounded-3 border-0"
            onClick={onClick}
            style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: '2px solid #e9ecef',
                backgroundColor: '#f8f9fa'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#dee2e6';
                e.currentTarget.style.backgroundColor = '#f1f3f5';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e9ecef';
                e.currentTarget.style.backgroundColor = '#f8f9fa';
            }}
            onFocus={(e) => {
                e.currentTarget.style.borderColor = '#0d6efd';
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.boxShadow = '0 0 0 0.25rem rgba(13, 110, 253, 0.25)';
            }}
        >
            <input
                type="text"
                className="form-control border-0 bg-transparent py-3"
                value={value}
                readOnly
                placeholder="Selecciona fechas"
                style={{
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: 'none'
                }}
            />
            <div className="input-group-append d-flex justify-content-end align-items-center px-3">
                <CalendarCheckFill
                    size={20}
                    className="text-secondary"
                    style={{ transition: 'color 0.2s ease' }}
                />
            </div>
        </div>
    );
};

const ReservaBar: React.FC<ReserveBarProps> = ({ state, dispatch }) => {
    const [startDate, endDate] = state.reserve_bar.date_range;

    const selectedRoom = state.reserve_bar.selected_room;

    const handleRoomChange = (roomId: string) => {
        changeValue("selected_room", roomId);
        changeValue("date_range", [null, null])
    };

    const handleDateChange = (update: [Date | null, Date | null]) => {
        const [start, end] = update;

        if (!start || !end) {
            changeValue("date_range", update);
            return;
        }

        // Verifica si el rango seleccionado se cruza con alguna fecha ocupada
        const isRangeInvalid = state.reserve_bar.occupied_dates.some(({ start: occupiedStart, end: occupiedEnd }: any) => {
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

        changeValue("date_range", update);
    };

    const changeValue = (prop: string, data: any) => {
        dispatch({
            type: HOME_ACTIONS.CHANGE_VALUE_RESERVE_BAR,
            payload: {
                prop,
                data
            }
        })
    }


    return (
        <>
            <form
                className="reserva-bar-form bg-white p-4 rounded-4 shadow-sm"
                onSubmit={(e) => e.preventDefault()}
                style={{ maxWidth: '800px', margin: '0 auto' }}
            >
                <div className="reserva-bar-fields d-flex justify-content-center align-items-center flex-wrap gap-4">
                    {/* SELECTOR DE HABITACIONES */}
                    <div className="reserva-bar-field position-relative flex-grow-1">
                        <CustomSelectInput
                            value={
                                state.rooms.find((r: Room) => r.room_number === selectedRoom)?.room_number || ""
                            }
                            onClick={() => {
                                const select = document.getElementById("room-select");
                                select?.focus();
                                select?.click();
                            }}
                        />

                        <select
                            id="room-select"
                            value={selectedRoom || ""}
                            onChange={(e) => handleRoomChange(e.target.value)}
                            className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                            style={{ cursor: "pointer" }}
                        >
                            <option value="" disabled>
                                Selecciona habitación
                            </option>

                            {state.rooms.map((room: Room) => (
                                <option key={room.room_number} value={room.room_number}>
                                    {room.room_number}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* SELECTOR DE FECHAS */}
                    <div className="reserva-bar-field flex-grow-1">
                        <div className="datePicker">
                            <DatePicker
                                selectsRange
                                startDate={startDate}
                                endDate={endDate}
                                excludeDates={
                                    state.reserve_bar.occupied_dates
                                        .map(({ start, end }: any) => {
                                            const startDate = new Date(start);
                                            const endDate = new Date(end);
                                            const datesInRange = [];
                                            const currentDate = new Date(startDate);

                                            while (currentDate <= endDate) {
                                                datesInRange.push(new Date(currentDate));
                                                currentDate.setDate(currentDate.getDate() + 1);
                                            }
                                            return datesInRange;
                                        })
                                        .flat()
                                }
                                onChange={handleDateChange}
                                placeholderText="Selecciona fechas"
                                id="date-picker"
                                className="w-100"
                                customInput={<CustomInput />}
                                withPortal
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ReservaBar;