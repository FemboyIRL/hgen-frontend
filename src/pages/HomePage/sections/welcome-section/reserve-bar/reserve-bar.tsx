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
    handleSubmit: () => void
}

interface CustomSelectInputProps {
    value?: string;
    onClick?: () => void;
}

export const CustomSelectInput: React.FC<CustomSelectInputProps> = ({ value, onClick }) => {
    return (
        <div
            className="premium-input"
            onClick={onClick}
        >
            <input
                type="text"
                className="premium-input-field"
                value={value}
                readOnly
                placeholder="Selecciona habitación"
            />

            <div className="premium-input-icon">
                <DoorOpenFill size={20} />
            </div>
        </div>
    );
};

export const CustomInput: React.FC<CustomInputProps> = ({ value, onClick }) => {
    return (
        <div
            className="premium-input"
            onClick={onClick}
        >
            <input
                type="text"
                className="premium-input-field"
                value={value}
                readOnly
                placeholder="Selecciona fechas"
            />

            <div className="premium-input-icon">
                <CalendarCheckFill size={20} />
            </div>
        </div>
    );
};

const ReservaBar: React.FC<ReserveBarProps> = ({ state, dispatch, handleSubmit }) => {
    const [startDate, endDate] = state.reserve_bar.date_range;

    const selectedRoom = state.reserve_bar.selected_room?.room_number;

    const handleRoomChange = (roomId: string) => {

        const selected_room = state.rooms.find(
            (room: Room) => room.room_number === roomId
        );

        changeValue("selected_room", selected_room);

        changeValue("date_range", [null, null]);
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
                className="reserve-bar-premium"
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="reserve-bar-grid">

                    {/* HABITACIÓN */}
                    <div className="reserve-field position-relative">

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
                            value={state.reserve_bar.selected_room || ""}
                            onChange={(e) => handleRoomChange(e.target.value)}
                            className="reserve-hidden-select"
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

                    {/* FECHAS */}

                    <div className="reserve-field">

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

                            customInput={<CustomInput />}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            withPortal
                            portalId="root"
                            popperPlacement="bottom"
                        />

                    </div>

                    {/* BOTÓN */}

                    <button
                        className="reserve-btn"
                        onClick={handleSubmit}
                    >
                        Reservar
                    </button>

                </div>
            </form>
        </>
    );
}

export default ReservaBar;