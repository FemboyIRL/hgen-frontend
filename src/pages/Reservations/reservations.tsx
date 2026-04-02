import { useEffect, useReducer } from "react";
import { reducer, reservationsInitial, reservationsActions } from "./reducer/reducer";
import LoadingSpinnerContainer from "../../components/LoadingSpinner/loading-spinner";
import { Room } from "../../types/room";
import './reservations.css'
import { dummyRooms } from "../HomePage/dummy_data";
import { useLocation } from "react-router-dom";
import ReservationForm from "./components/reservation_form/form";
import HotelFooter from "../../components/layout/footer/footer";
import PaymentModal from "./components/payment_modal/payment_modal";

// const Rooms = new ApiConsumer({ url: 'rooms' })

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

  // const getAllRooms = async () => {
  //   try {
  //     const { status, data } = await Rooms.getAll()
  //     if (status) {
  //       const parsedData = data.data.map((room: any) => {
  //         try {
  //           return {
  //             ...room,
  //             images: JSON.parse(room.images),
  //           };
  //         } catch (error) {
  //           console.error("Error al parsear las imágenes:", error);
  //           return {
  //             ...room,
  //             images: [],
  //           };
  //         }
  //       });
  //       dispatch({
  //         type: reservationsActions.LOADED_ROOMS_LIST,
  //         payload: parsedData
  //       })
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }


  const changeValueForm = (prop: string, data: any) => {
    dispatch({
      type: reservationsActions.CHANGE_VALUE_FORM,
      payload: {
        prop,
        data
      }
    });
  };

  const changeValue = (prop: string, data: any) => {
    dispatch({
      type: reservationsActions.CHANGE_VALUE,
      payload: {
        prop,
        data
      }
    });
  };

  const changeValueGuests = (prop: string, data: any) => {
    dispatch({
      type: reservationsActions.CHANGE_VALUE_GUESTS,
      payload: {
        prop,
        data
      }
    });
  };

  const handleRoomChange = (room: Room) => {
    changeValueForm("selected_room", room)
    changeValueGuests("children", 0)
    changeValueGuests("adults", 0)
  }

  if (state.loading) return <LoadingSpinnerContainer />
  return (
    <div>

      <div className="reservation-page">

        <div className="reservation-layout">

          {/* SIDEBAR RESERVA */}

          <ReservationForm state={state} handleRoomChange={handleRoomChange} dispatch={dispatch} changeValueForm={changeValueForm} />

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
                  className={`room-card ${state.form.selected_room?.room_number === room.room_number
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

      <PaymentModal isOpen={state.payment_modal} onClose={() => changeValue("payment_modal", !state.payment_modal)} onConfirm={() => { }} totalAmount={state.form.price} />

      <HotelFooter />

    </div>
  )
}
export default ReservePage