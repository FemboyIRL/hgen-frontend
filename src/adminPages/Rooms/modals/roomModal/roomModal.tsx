import { Button, Form, FormControl, FormGroup, Row, } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";
import ApiConsumer from "../../../../services/api_consumer";
import roomsActions from "../../reducer/actions";
import { useEffect } from "react";
import { RoomReducer } from "../../reducer/constants";
import FormModal from "../../../../components/FormModal/form-modal";
import { toast } from "react-toastify";

interface CreateRoomModalProps {
    stateReducer: RoomReducer
    dispatch: React.Dispatch<{
        type: string;
        payload: any;
    }>
    changeModal: () => void
}

const Rooms = new ApiConsumer({ url: 'rooms/' })

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({ stateReducer, dispatch, changeModal }) => {

    useEffect(() => {
        if (stateReducer.roomModal) {
            if (stateReducer.currentRoom) {
                getRoomsData()
            }
        }
    }, [stateReducer.roomModal])

    const getRoomsData = () => {
        const selectedRooms = stateReducer.rooms.find(room => room.room_number === stateReducer.currentRoom?.room_number);
        dispatch({
            type: roomsActions.CHANGE_ALL_VALUE_FORM,
            payload: selectedRooms
        })
    }

    const changeValueForm = (prop: string, data: any) => {
        dispatch({
            type: roomsActions.CHANGE_VALUE_FORM,
            payload: {
                prop,
                data
            },
        });
    }

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files, value } = e.target

        if (name === 'room_number') {
            if (!/^\d*$/.test(value)) {
                toast.error('El número de habitación solo puede contener números');
                return;
            }
        }

        if (name === 'images' && files && files.length > 0) {
            dispatch({
                type: roomsActions.ADD_IMAGES,
                payload: {
                    data: Array.from(files)
                }
            })
        } else if (name !== 'images') {
            console.log('niers')
            changeValueForm(name, value)
        }
    }


    const closeModal = () => {
        dispatch({
            type: roomsActions.RESET_FORM,
            payload: null
        })
        changeModal()
    }

    const reloadList = () => {
        dispatch({
            type: roomsActions.RELOAD_LIST,
            payload: null,
        })
    }

    const onDeleteImage = (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        const imgSrc: any = stateReducer.formData.images[index];
        if (imgSrc instanceof File) {
            URL.revokeObjectURL(URL.createObjectURL(imgSrc));
        }

        dispatch({
            type: roomsActions.DELETE_IMAGE,
            payload: {
                data: index
            },
        });
    };

    const handleSave = async () => {
        const { room_number, type, description, is_available, images } = stateReducer.formData

        const formData = new FormData();

        formData.append('room_number', room_number);
        formData.append('type', type);
        formData.append('description', description);
        formData.append("is_available", is_available ? "1" : "0")

        if (images && images.length > 0) {
            images.forEach((file: any) => {
                if (file instanceof File) {
                    formData.append('new_images', file);
                } else {
                    formData.append('images', file)
                }
            });
        }

        const { status } = stateReducer.currentRoom ? await Rooms.update(formData, stateReducer.currentRoom.room_number) : await Rooms.create(formData)

        if (status) {
            closeModal()
            reloadList()
        }
    };

    const onDelete = async () => {
        try {
            const { status } = await Rooms.delete(Number(stateReducer.currentRoom?.room_number))

            if (status) {
                toast.success('Habitacion eliminada de forma exitosa')
                closeModal()
                reloadList()
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <FormModal
                modalTitle={stateReducer.currentRoom ? "Editar una habitacion" : 'Agregar una habitacion'}
                status={stateReducer.roomModal}
                btnText={stateReducer.currentRoom ? "Editar" : 'Agregar'}
                onSubmit={handleSave}
                size={'md'}
                onDelete={stateReducer.currentRoom ? onDelete : undefined}
                changeModal={() => closeModal()}
            >
                <Form>
                    <div className="innerContainer">
                        <Row className="topRow">
                            <Button className="imgButton" style={{ backgroundColor: '#f2f2f2' }}>
                                <label htmlFor="images" className="d-flex flex-row justify-content-center flex-wrap" style={{ order: '5px solid green' }}>
                                    {stateReducer.formData.images.length > 0 ? (
                                        stateReducer.formData.images.map((imgSrc: any, index) => (
                                            <div className="img-container m-3">
                                                <div className='delete-icon d-flex justify-content-center align-items-center' onClick={onDeleteImage(index)} style={{ position: "absolute", color: "#ffffff", borderRadius: '50%', width: '30px', height: '30px', border: '3px solid black', backgroundColor: 'red' }}><TrashFill /></div>
                                                <img
                                                    key={index}
                                                    src={imgSrc instanceof File ? URL.createObjectURL(imgSrc) : imgSrc}
                                                    alt="imagen subida"
                                                    width={100}
                                                />                                            </div>
                                        ))
                                    ) : (
                                        <img src="/assets/icons/image-square.svg" alt="..." width={50} />
                                    )}
                                </label>
                                <input
                                    id="images"
                                    name="images"
                                    type="file"
                                    multiple
                                    style={{ display: "none" }}
                                    onChange={handleOnChangeInput}
                                />
                            </Button>
                            <label>Selecciona las imágenes de la habitación</label>
                        </Row>
                    </div>
                    <FormGroup className="mb-3">
                        <label>Numero de habitación</label>
                        <div className="inputWithIcon">
                            <FormControl
                                type="text"
                                className="textInput"
                                placeholder="Ingresa el numero de habitacion"
                                value={stateReducer.formData.room_number}
                                name="room_number"
                                onChange={handleOnChangeInput}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <label>Tipo</label>
                        <div className="inputWithIcon">
                            <FormControl
                                type="text"
                                className="textInput"
                                placeholder="Ingresa el tipo de habitación"
                                value={stateReducer.formData.type}
                                name="type"
                                onChange={handleOnChangeInput}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <label>Descripción</label>
                        <div className="inputWithIcon">
                            <FormControl
                                type="textarea"
                                size="lg"
                                className="textInput"
                                placeholder="Ingresa la descripción"
                                value={stateReducer.formData.description}
                                name="description"
                                onChange={handleOnChangeInput}
                            />
                        </div>
                    </FormGroup>
                </Form>
            </FormModal>
        </>
    )
}

export default CreateRoomModal