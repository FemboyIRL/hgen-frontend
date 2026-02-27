import { CalendarCheckFill } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./reserve-bar.css";
import { toast } from "react-toastify";
import HOME_ACTIONS from "../../../reducer/actions";

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

export const CustomInput: React.FC<CustomInputProps> = ({ value, onClick }) => {
    return (
        <div className="input-group flex-nowrap justify-content-end" onClick={onClick} style={{ cursor: 'pointer' }}>
            <input
                type="text"
                className="w-100 text-input"
                value={value}
                readOnly
                placeholder="Selecciona fechas"
            />
            <div className="input-group-append w-10 d-flex justify-content-end align-items-center px-2">
                <CalendarCheckFill size={20} />
            </div>
        </div>
    )
}

const ReservaBar: React.FC<ReserveBarProps> = ({ state, dispatch }) => {
    const [startDate, endDate] = state.reserve_bar.date_range;

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

    console.log(state.occupiedDates)

    return (
        <>
            <form className="reserva-bar-form d-flex flex-column gap-3" onSubmit={(e) => e.preventDefault()}>
                <div className="reserva-bar-fields d-flex justify-content-center align-items-center flex-wrap gap-5">
                    <div className="reserva-bar-field">
                        <div className="datePicker d-flex align-items-center no-wrap">
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
                                className="text-input"
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