import { Button, Col, Row } from "react-bootstrap"
import roomsActions from "./reducer/actions"
import { useEffect, useReducer } from "react"
import { initialState, reducer } from "./reducer/reducer"
import LoadingSpinnerContainer from "../../components/LoadingSpinner/loading-spinner"
import ApiConsumer from "../../services/api_consumer"
import './rooms.css'
import CreateRoomModal from "./modals/roomModal/roomModal"
import { Room } from "../../interfaces/RoomInterface"
import DeleteRoomModal from "./modals/deleteModal/deleteModal"

const Rooms = new ApiConsumer({ url: 'rooms/' })

const RoomsPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        getRooms()
    }, [state.loading])

    const getRooms = async () => {
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
                    type: roomsActions.LOADED_ROOMS_LIST,
                    payload: parsedData
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    const changeValue = (prop: string, data: any) => {
        dispatch({
            type: roomsActions.CHANGE_VALUE,
            payload: {
                prop,
                data
            }
        })
    }

    const selectRoom = (prop: any, data: any, room: Room) => {
        changeValue(prop, data)
        changeValue("currentRoom", room)
    }

    return (
        <>
            <div className="moduleContain">
                <div className="moduleInner">
                    <div className="innerContent">
                        <div className="innerContain">
                            <div className="titleContain">
                                <img src="/assets/icons/icon-door.svg" alt="" width={50} />
                                <div className="title">
                                    <h3>Habitaciones</h3>
                                    <p>Lista de Habitaciones registradas</p>
                                </div>
                            </div>
                            <div className="searchBarContain">
                                <Row style={{ alignItems: "center" }}>
                                    <Col xs="12" sm="7" md="7" lg="7" xl="8">
                                    </Col>
                                    <Col xs="12" sm="5" md="5" lg="5" xl="4">
                                        <Row style={{ justifyContent: "end" }}>
                                            <Button onClick={() => changeValue("roomModal", !state.roomModal)}>
                                                Nueva Habitacion
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            {state.loading ? (
                                <LoadingSpinnerContainer />
                            ) : state.rooms.length === 0 ? (
                                <p>No se encontraron habitaciones</p>
                            ) : (
                                <>
                                    <Row>
                                        {state.rooms.map((room: Room) => (
                                            <Col key={room.room_number} xs="12" sm="6" md="4" lg="3">
                                                <div className="roomCard" onClick={() => selectRoom("roomModal", !state.roomModal, room)}>
                                                    <img
                                                        src={room.images[0]}
                                                        alt={`Habitación ${room.room_number}`}
                                                        className="roomImage"
                                                    />
                                                    <div className="roomDetails">
                                                        <h4>{room.type}</h4>
                                                        <p>Número: {room.room_number}</p>
                                                        <p>
                                                            Disponible:{" "}
                                                            {room.is_available ? (
                                                                <span className="available">Sí</span>
                                                            ) : (
                                                                <span className="notAvailable">No</span>
                                                            )}
                                                        </p>
                                                        <p>{room.description}</p>
                                                    </div>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <CreateRoomModal stateReducer={state} dispatch={dispatch} changeModal={() => changeValue('roomModal', !state.roomModal)} />
            <DeleteRoomModal stateReducer={state} dispatch={dispatch} changeModal={() => changeValue('deleteRoomModal', !state.deleteRoomModal)} />
        </>
    )
}

export default RoomsPage