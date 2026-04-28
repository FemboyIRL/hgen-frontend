import { Button, Col, Form, FormControl, FormGroup, Row, } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";
import ApiConsumer from "../../../../services/api_consumer";
import roomsActions from "../../reducer/actions";
import { useEffect } from "react";
import { RoomReducer } from "../../reducer/constants";
import FormModal from "../../../../components/FormModal/form-modal";
import { toast } from "react-toastify";
import TagsInput from "../../../../components/tags_input/tags_input";

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
    // const [amenitiesInput, setAmenitiesInput] = useState('');
    // const [featuresInput, setFeaturesInput] = useState('');

    // Sugerencias predefinidas (opcional)
    const amenitySuggestions = [
        'WiFi', 'TV', 'Aire acondicionado', 'Calefacción', 'Minibar',
        'Caja fuerte', 'Secador de pelo', 'Plancha', 'Microondas',
        'Cafetera', 'Nevera', 'Ventilador', 'Bañera', 'Jacuzzi'
    ];

    const featureSuggestions = [
        'Vista al mar', 'Balcón', 'Terraza', 'Jardín', 'Piscina',
        'Gimnasio', 'Spa', 'Estacionamiento', 'Desayuno incluido',
        'Acceso para sillas de ruedas', 'Habitación fumador', 'Mascotas permitidas'
    ];
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

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Para inputs de tipo file, necesitamos un manejo especial
        if (e.target instanceof HTMLInputElement && name === 'images' && e.target.files) {
            const { files } = e.target;

            if (files && files.length > 0) {
                // Validar tamaño y tipo de imágenes
                const validFiles = Array.from(files).filter(file => {
                    const isValidType = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type);
                    const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB

                    if (!isValidType) {
                        toast.error(`El archivo ${file.name} no es una imagen válida (solo JPG, PNG, WEBP)`);
                        return false;
                    }
                    if (!isValidSize) {
                        toast.error(`El archivo ${file.name} excede el tamaño máximo de 5MB`);
                        return false;
                    }
                    return true;
                });

                if (validFiles.length > 0) {
                    dispatch({
                        type: roomsActions.ADD_IMAGES,
                        payload: {
                            data: validFiles
                        }
                    });
                }
            }
            return;
        }

        // Validación para número de habitación (solo números)
        if (name === 'room_number') {
            if (!/^\d*$/.test(value)) {
                toast.error('El número de habitación solo puede contener números');
                return;
            }
        }

        // Validación para tipo (solo letras, números y espacios)
        if (name === 'type') {
            if (!/^[a-zA-ZáéíóúñÑü\s\d]*$/.test(value)) {
                toast.error('El tipo de habitación solo puede contener letras, números y espacios');
                return;
            }
        }

        // Validación para número de camas
        if (name === 'beds') {
            const numValue = parseInt(value);

            if (value !== '' && (isNaN(numValue) || numValue < 1)) {
                toast.error('El número de camas debe ser mayor o igual a 1');
                return;
            }
            if (value !== '' && numValue > 20) {
                toast.error('El número de camas no puede ser mayor a 20');
                return;
            }
        }

        // Validación para capacidad
        if (name === 'capacity') {
            const numValue = parseInt(value);
            if (value !== '' && (isNaN(numValue) || numValue < 1)) {
                toast.error('La capacidad debe ser mayor o igual a 1');
                return;
            }
            if (value !== '' && numValue > 50) {
                toast.error('La capacidad no puede ser mayor a 50 personas');
                return;
            }
        }

        // Validación para tamaño
        if (name === 'size') {
            const numValue = parseFloat(value);
            if (value !== '' && (isNaN(numValue) || numValue < 0)) {
                toast.error('El tamaño debe ser un número positivo');
                return;
            }
            if (value !== '' && numValue > 500) {
                toast.error('El tamaño no puede ser mayor a 500 m²');
                return;
            }
        }

        // Validación para piso
        if (name === 'floor') {
            const numValue = parseInt(value);
            if (value !== '' && (isNaN(numValue) || numValue < 0)) {
                toast.error('El piso debe ser un número positivo');
                return;
            }
            if (value !== '' && numValue > 100) {
                toast.error('El piso no puede ser mayor a 100');
                return;
            }
        }

        // Manejo de amenities (convierte string separado por comas a array)
        if (name === 'amenities') {
            const amenitiesArray = value.split(',').map(item => item.trim()).filter(item => item !== '');

            // Validar que no haya elementos duplicados
            const uniqueAmenities = [...new Set(amenitiesArray)];
            if (uniqueAmenities.length !== amenitiesArray.length) {
                toast.warning('Se eliminaron amenities duplicados');
            }

            // Validar longitud máxima de cada amenity
            const isValidLength = uniqueAmenities.every(amenity => amenity.length <= 50);
            if (!isValidLength) {
                toast.error('Cada amenity no puede tener más de 50 caracteres');
                return;
            }

            // Validar cantidad máxima de amenities
            if (uniqueAmenities.length > 20) {
                toast.error('No puedes agregar más de 20 amenities');
                return;
            }

            changeValueForm(name, uniqueAmenities);
            return;
        }

        // Manejo de features (convierte string separado por comas a array)
        if (name === 'features') {
            const featuresArray = value.split(',').map(item => item.trim()).filter(item => item !== '');

            // Validar que no haya elementos duplicados
            const uniqueFeatures = [...new Set(featuresArray)];
            if (uniqueFeatures.length !== featuresArray.length) {
                toast.warning('Se eliminaron características duplicadas');
            }

            // Validar longitud máxima de cada feature
            const isValidLength = uniqueFeatures.every(feature => feature.length <= 50);
            if (!isValidLength) {
                toast.error('Cada característica no puede tener más de 50 caracteres');
                return;
            }

            // Validar cantidad máxima de features
            if (uniqueFeatures.length > 15) {
                toast.error('No puedes agregar más de 15 características especiales');
                return;
            }

            changeValueForm(name, uniqueFeatures);
            return;
        }

        // Manejo de tipo de cama
        if (name === 'bed_type') {
            if (value.length > 50) {
                toast.error('El tipo de cama no puede tener más de 50 caracteres');
                return;
            }
            changeValueForm(name, value);
            return;
        }

        // Manejo de descripción
        if (name === 'description') {
            if (value.length > 500) {
                toast.error('La descripción no puede tener más de 500 caracteres');
                return;
            }
            changeValueForm(name, value);
            return;
        }

        // Para los demás campos
        if (name !== 'images') {
            changeValueForm(name, value);
        }
    };

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

    const handleAmenitiesChange = (newAmenities: string[]) => {
        changeValueForm('amenities', newAmenities);
    };

    const handleFeaturesChange = (newFeatures: string[]) => {
        changeValueForm('features', newFeatures);
    };

    const handleSave = async () => {
        const {
            room_number,
            type,
            description,
            images,
            beds,
            capacity,
            amenities,
            size,
            bed_type,
            floor,
            features
        } = stateReducer.formData

        const formData = new FormData();

        // Información básica
        formData.append('room_number', room_number);
        formData.append('type', type);
        formData.append('description', description);

        // Capacidad y comodidades
        formData.append('beds', beds.toString());
        formData.append('capacity', capacity.toString());
        formData.append('amenities', JSON.stringify(amenities));

        // Características adicionales (opcionales)
        if (size !== undefined && size !== null && size !== '') {
            formData.append('size', size.toString());
        }
        if (bed_type && bed_type.trim() !== '') {
            formData.append('bed_type', bed_type);
        }
        if (floor !== undefined && floor !== null && floor !== '') {
            formData.append('floor', floor.toString());
        }
        if (features && features.length > 0) {
            formData.append('features', JSON.stringify(features));
        }

        // Imágenes
        if (images && images.length > 0) {
            images.forEach((file: any) => {
                if (file instanceof File) {
                    formData.append('new_images', file);
                } else {
                    formData.append('images', file)
                }
            });
        }

        const { status } = stateReducer.currentRoom
            ? await Rooms.update(formData, stateReducer.currentRoom.room_number)
            : await Rooms.create(formData)

        if (status) {
            closeModal()
            reloadList()
        }
    };

    const onDelete = async () => {
        dispatch({
            type: roomsActions.CHANGE_VALUE,
            payload: {
                prop: 'deleteRoomModal',
                data: !stateReducer.deleteRoomModal
            }
        })
    }

    return (
        <>
            <FormModal
                modalTitle={stateReducer.currentRoom ? "Editar una habitacion" : 'Agregar una habitacion'}
                status={stateReducer.roomModal}
                btnText={stateReducer.currentRoom ? "Editar" : 'Agregar'}
                onSubmit={handleSave}
                size={'lg'}
                onDelete={stateReducer.currentRoom ? onDelete : undefined}
                changeModal={() => closeModal()}
            >
                <Form>
                    <div className="innerContainer">
                        {/* Sección de imágenes */}
                        <Row className="topRow">
                            <Button className="imgButton" style={{ backgroundColor: '#f2f2f2' }}>
                                <label htmlFor="images" className="d-flex flex-row justify-content-center flex-wrap" style={{ order: '5px solid green' }}>
                                    {stateReducer.formData.images.length > 0 ? (
                                        stateReducer.formData.images.map((imgSrc: any, index) => (
                                            <div className="img-container m-3" key={index}>
                                                <div className='delete-icon d-flex justify-content-center align-items-center' onClick={onDeleteImage(index)} style={{ position: "absolute", color: "#ffffff", borderRadius: '50%', width: '30px', height: '30px', border: '3px solid black', backgroundColor: 'red' }}><TrashFill /></div>
                                                <img
                                                    key={index}
                                                    src={imgSrc instanceof File ? URL.createObjectURL(imgSrc) : imgSrc}
                                                    alt="imagen subida"
                                                    width={100}
                                                />
                                            </div>
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

                        {/* Información básica */}
                        <FormGroup className="mb-3">
                            <label>Número de habitación *</label>
                            <div className="inputWithIcon">
                                <FormControl
                                    type="text"
                                    className="textInput"
                                    placeholder="Ej: 101"
                                    value={stateReducer.formData.room_number}
                                    name="room_number"
                                    onChange={handleOnChangeInput}
                                    required
                                />
                            </div>
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <label>Tipo *</label>
                            <div className="inputWithIcon">
                                <FormControl
                                    type="text"
                                    className="textInput"
                                    placeholder="Ej: Suite, Doble, Familiar"
                                    value={stateReducer.formData.type}
                                    name="type"
                                    onChange={handleOnChangeInput}
                                    required
                                />
                            </div>
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <label>Descripción</label>
                            <div className="inputWithIcon">
                                <FormControl
                                    as="textarea"
                                    rows={3}
                                    className="textInput"
                                    placeholder="Ingresa la descripción de la habitación"
                                    value={stateReducer.formData.description}
                                    name="description"
                                    onChange={handleOnChangeInput}
                                />
                            </div>
                        </FormGroup>

                        {/* Capacidad y comodidades */}
                        <Row>
                            <Col md={6}>
                                <FormGroup className="mb-3">
                                    <label>Número de camas *</label>
                                    <div className="inputWithIcon">
                                        <FormControl
                                            type="number"
                                            className="textInput"
                                            placeholder="Ej: 2"
                                            value={stateReducer.formData.beds}
                                            name="beds"
                                            onChange={handleOnChangeInput}
                                            min={1}
                                            required
                                        />
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup className="mb-3">
                                    <label>Capacidad máxima (personas) *</label>
                                    <div className="inputWithIcon">
                                        <FormControl
                                            type="number"
                                            className="textInput"
                                            placeholder="Ej: 4"
                                            value={stateReducer.formData.capacity}
                                            name="capacity"
                                            onChange={handleOnChangeInput}
                                            min={1}
                                            required
                                        />
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>

                        {/* Comodidades (Amenities) */}
                        <TagsInput
                            value={stateReducer.formData.amenities || []}
                            onChange={handleAmenitiesChange}
                            placeholder="Ej: WiFi, TV, Aire acondicionado"
                            label="Comodidades (Amenities)"
                            suggestions={amenitySuggestions}
                        />

                        {/* Características adicionales */}
                        <Row>
                            <Col md={6}>
                                <FormGroup className="mb-3">
                                    <label>Tamaño (m²)</label>
                                    <div className="inputWithIcon">
                                        <FormControl
                                            type="number"
                                            className="textInput"
                                            placeholder="Ej: 25"
                                            value={stateReducer.formData.size || ''}
                                            name="size"
                                            onChange={handleOnChangeInput}
                                            min={0}
                                            step={0.5}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup className="mb-3">
                                    <label>Tipo de cama</label>
                                    <div className="inputWithIcon">
                                        <FormControl
                                            type="text"
                                            className="textInput"
                                            placeholder="Ej: King size, Queen size"
                                            value={stateReducer.formData.bed_type || ''}
                                            name="bed_type"
                                            onChange={handleOnChangeInput}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <FormGroup className="mb-3">
                                    <label>Piso</label>
                                    <div className="inputWithIcon">
                                        <FormControl
                                            type="number"
                                            className="textInput"
                                            placeholder="Ej: 3"
                                            value={stateReducer.formData.floor || ''}
                                            name="floor"
                                            onChange={handleOnChangeInput}
                                            min={0}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup className="mb-3">
                                    <TagsInput
                                        value={stateReducer.formData.features || []}
                                        onChange={handleFeaturesChange}
                                        placeholder="Ej: Vista al mar, Balcón"
                                        label="Características especiales"
                                        suggestions={featureSuggestions}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </FormModal>
        </>
    )
}

export default CreateRoomModal