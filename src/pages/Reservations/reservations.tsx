import { useEffect, useReducer } from "react";
import { reducer, reservationsInitial, reservationsActions } from "./reducer/reducer";
import { Form, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { CustomInput } from "../HomePage/sections/welcome-section/reserve-bar/reserve-bar";
import { toast } from "react-toastify";
import ApiConsumer from "../../services/api_consumer";
import LoadingSpinnerContainer from "../../components/LoadingSpinner/loading-spinner";
import { Room } from "../../types/room";
import './reservations.css'
import { dummyRooms } from "../HomePage/dummy_data";
import { useLocation } from "react-router-dom";

const Rooms = new ApiConsumer({ url: 'rooms' })

const ReservePage= () => {
    const [state, dispatch] = useReducer(reducer, reservationsInitial);

    const location = useLocation()
    
    const { selected_room, date_range } = location.state || {}

    useEffect(() => {
        if(selected_room != null) {
            changeValueForm("selected_room", selected_room)
        }
        if (date_range && (date_range[0] !== null || date_range[1] !== null)) {
            changeValueForm("date_range", date_range)
          }          
    }, [])

console.log(state.form.date_range)
console.log(state.form.selected_room)
    
    useEffect(() => {
        dispatch({
            type: reservationsActions.CHANGE_VALUE,
            payload: {
                prop: "rooms",
                data: dummyRooms
            }
        })
        // getAllRooms()
    }, [state.loading])

    const getAllRooms = async () => {
        try {
            const { status, data } = await Rooms.getAll()
            if (status) {
                const parsedData = data.data.map((room: any) => {
                    try {
                        return {
                            ...room,
                            images: JSON.parse(room.images),
                        };
                    } catch (error) {
                        console.error("Error al parsear las imágenes:", error);
                        return {
                            ...room,
                            images: [],
                        };
                    }
                });
                dispatch({
                    type: reservationsActions.LOADED_ROOMS_LIST,
                    payload: parsedData
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    const [startDate, endDate] = state.form.date_range;

    const changeValueForm = (prop: string, data: any) => {
        dispatch({
            type: reservationsActions.CHANGE_VALUE_FORM,
            payload: {
                prop,
                data
            }
        });
    };

    // const changeValue = (prop: string, data: any) => {
    //     dispatch({
    //         type: reservationsActions.CHANGE_VALUE,
    //         payload: {
    //             prop,
    //             data
    //         }
    //     });
    // };

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch({
            type: reservationsActions.CHANGE_VALUE_FORM,
            payload: {
                prop: name,
                data: value,
            }
        });
    };
    const handleDateChange = (update: [Date | null, Date | null]) => {
        const [start, end] = update;

        if (!start || !end) {
            changeValueForm("dateRange", update);
            return;
        }

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

        changeValueForm("dateRange", update);
    };

    if (state.loading) return <LoadingSpinnerContainer />

    return (<div>
        <div className="w-100 bg-primary p-0 m-0" style={{ height: '5vh' }}>
        </div>
        <div className="m-0 px-3 py-2 d-flex align-items-center flex-wrap" style={{ height: '100vh', width: "100vw" }}>
            <div className="d-flex flex-column h-75 w-lg-50 w-100 justify-content-evenly align-items-center">
                <form className="d-flex justify-content-evenly p-4 h-100 w-100 flex-column">
                    <InputGroup >
                        <Form.Control
                            type="number"
                            name="room_number"
                            placeholder="Número de habitación"
                            value={state.form.selected_room?.room_number || ""}
                            onChange={handleOnChangeInput}
                            className="text-input"
                        />
                    </InputGroup>
                    <DatePicker
                        selectsRange
                        startDate={startDate}
                        endDate={endDate}
                        excludeDates={
                            state.form.occupied_dates
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

                    <InputGroup >

                    </InputGroup>
                    <InputGroup >

                    </InputGroup>

                    {/* Campo para precio total (solo lectura) */}
                    <InputGroup >
                        <Form.Control
                            type="number"
                            name="totalPrice"
                            placeholder="Precio total"
                            value={state.form.totalPrice}
                            onChange={handleOnChangeInput}
                            className="text-input"
                            readOnly
                        />
                    </InputGroup>
                </form>
            </div>
            <div className="w-100 center p-3 w-lg-50 h-75 card bg-primary rounded" >
                {
                    state.rooms.map((room: Room) => (
                        <div
                            key={room.room_number}
                            className={`room-card ${state.selectedRoom?.room_number == room.room_number ? "selected" : ""}`}
                        >
                            <img
                                src={room.images[0]}
                                alt={`Habitación ${room.room_number}`}
                                className="room-image"
                            />
                            <p>Habitación {room.room_number}</p>
                        </div>
                    ))
                }
            </div>
        </div >
    </div>
    );
};

export default ReservePage