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

const ReservePage = () => {
    const [state, dispatch] = useReducer(reducer, reservationsInitial);

    const location = useLocation()

    const { selected_room, date_range } = location.state || {}

    useEffect(() => {
        if (selected_room != null) {
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

    const handleRoomChange = (room: Room) => {
        console.log(room)
        changeValueForm("selected_room", room)
    }

    if (state.loading) return <LoadingSpinnerContainer />
    return (
        <div className="reservation-page">
        
          <div className="reservation-layout">
        
            {/* SIDEBAR RESERVA */}
            <aside className="reservation-sidebar">
        
              <h2 className="sidebar-title">
                Reserva tu habitación
              </h2>
        
              <form className="reservation-form">
        
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="room_number"
                    placeholder="Número de habitación"
                    value={state.form.selected_room?.room_number || ""}
                    onChange={handleOnChangeInput}
                  />
                </InputGroup>
                
        
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
                  placeholderText="Selecciona fechas"
                  customInput={<CustomInput />}
                  withPortal
                />
        
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="totalPrice"
                    placeholder="Precio total"
                    value={state.form.price}
                    readOnly
                  />
                </InputGroup>
        
                <button className="reserve-confirm-btn">
                  Confirmar reserva
                </button>
        
              </form>
        
            </aside>
        
        
            {/* CONTENIDO */}
            <main className="reservation-content">
        
              {/* HABITACIÓN SELECCIONADA */}
              {state.form.selected_room && (
                <div className="selected-room">
        
                  <img
                    src={state.form.selected_room?.images[0]}
                    className="selected-room-image"
                  />
        
                  <div className="selected-room-info">
        
                    <h2>
                      Habitación {state.form.selected_room?.room_number}
                    </h2>
        
                    <p>
                      {state.form.selected_room?.description}
                    </p>
        
                  </div>
        
                </div>
              )}
        
        
              {/* LISTA DE HABITACIONES */}
              <div className="rooms-grid">
        
                {state.rooms.map((room: Room) => (
        
                  <div
                    key={room.room_number}
                    className={`room-card ${
                      state.form.selected_room?.room_number === room.room_number
                      ? "active"
                      : ""
                    }`}
                    onClick={() => handleRoomChange(room)}
                  >
        
                    <img src={room.images[0]} />
        
                    <div className="room-card-body">
                      <h4>Habitación {room.room_number}</h4>
                    </div>
        
                  </div>
        
                ))}
        
              </div>
        
            </main>
        
          </div>
        
        </div>
        )
}
export default ReservePage