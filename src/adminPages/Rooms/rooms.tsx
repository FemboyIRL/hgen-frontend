import { Button, Col, Row } from "react-bootstrap"
import roomsActions from "./reducer/actions"
import { useEffect, useReducer } from "react"
import { initialState, reducer } from "./reducer/reducer"
import LoadingSpinnerContainer from "../../components/LoadingSpinner/loading-spinner"
import ApiConsumer from "../../services/api_consumer"
import './rooms.css'
import CreateRoomModal from "./modals/roomModal/roomModal"
import { Room } from "../../types/room"
import DeleteRoomModal from "./modals/deleteModal/deleteModal"
import { dummyRooms } from "../../pages/HomePage/dummy_data"

const Rooms = new ApiConsumer({ url: 'rooms/' })

const RoomsPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState)


    useEffect(() => {
        // getRooms()
        dispatch({
            type: roomsActions.LOADED_ROOMS_LIST,
            payload: dummyRooms
        })
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
                                <div className="admin-cards-container">
                                    
                                    <Row>
                                        {state.rooms.map((room: Room) => (
                                            <Col key={room.room_number} xs="12" sm="6" md="4" lg="3">
                                                <div className="admin-room-card" onClick={() => selectRoom("roomModal", !state.roomModal, room)}>
                                                    {/* Imagen principal */}
                                                    <div className="admin-room-image-wrapper">
                                                        <img
                                                            src={room.images?.[0] || '/assets/images/no-image.jpg'}
                                                            alt={`Habitación ${room.room_number}`}
                                                            className="admin-room-image"
                                                        />
                                                    </div>

                                                    {/* Información principal */}
                                                    <div className="admin-room-info">
                                                        <div className="admin-room-header">
                                                            <h4 className="admin-room-type">{room.type}</h4>
                                                            <span className="admin-room-number">#{room.room_number}</span>
                                                        </div>

                                                        {/* Características rápidas */}
                                                        <div className="admin-room-features">
                                                            <span className="admin-feature">
                                                                <i className="fas fa-bed"></i> {room.beds} cama{room.beds !== 1 ? 's' : ''}
                                                            </span>
                                                            <span className="admin-feature">
                                                                <i className="fas fa-users"></i> {room.capacity} pers.
                                                            </span>
                                                            {room.size && (
                                                                <span className="admin-feature">
                                                                    <i className="fas fa-expand"></i> {room.size}m²
                                                                </span>
                                                            )}
                                                            {room.floor !== undefined && (
                                                                <span className="admin-feature">
                                                                    <i className="fas fa-layer-group"></i> Piso {room.floor}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Descripción corta */}
                                                        {room.description && (
                                                            <p className="admin-room-description">
                                                                {room.description.length > 80
                                                                    ? `${room.description.substring(0, 80)}...`
                                                                    : room.description}
                                                            </p>
                                                        )}

                                                        {/* Amenities principales (primeros 3) */}
                                                        {room.amenities && room.amenities.length > 0 && (
                                                            <div className="admin-room-amenities">
                                                                {room.amenities.slice(0, 3).map((amenity, index) => (
                                                                    <span key={index} className="admin-amenity-tag">
                                                                        {amenity}
                                                                    </span>
                                                                ))}
                                                                {room.amenities.length > 3 && (
                                                                    <span className="admin-amenity-more">+{room.amenities.length - 3}</span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                            </div>
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