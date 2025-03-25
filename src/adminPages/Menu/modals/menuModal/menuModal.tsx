import { Button, Form, FormControl, FormGroup, Row, } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";
import ApiConsumer from "../../../../services/api_consumer";
import { useEffect } from "react";
import { MenuReducer } from "../../reducer/constants";
import FormModal from "../../../../components/FormModal/form-modal";
import menuActions from "../../reducer/actions";

interface CreateMenuItemModalProps {
    stateReducer: MenuReducer
    dispatch: React.Dispatch<{
        type: string;
        payload: any;
    }>
    changeModal: () => void
}

const Menu = new ApiConsumer({ url: 'menu/' })

const CreateMenuItemModal: React.FC<CreateMenuItemModalProps> = ({ stateReducer, dispatch, changeModal }) => {

    useEffect(() => {
        if (stateReducer.menuItemModal) {
            if (stateReducer.currentMenuItem) {
                getMenuData()
            }
        }
    }, [stateReducer.menuItemModal])

    const getMenuData = () => {
        const selectedMenuItem = stateReducer.menuItems.find(item => item.id === stateReducer.currentMenuItem?.id);
        dispatch({
            type: menuActions.CHANGE_ALL_VALUE_FORM,
            payload: selectedMenuItem
        })
    }

    const changeValueForm = (prop: string, data: any) => {
        dispatch({
            type: menuActions.CHANGE_VALUE_FORM,
            payload: {
                prop,
                data
            },
        });
    }

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files, value } = e.target

        if (name === 'images' && files && files.length > 0) {
            dispatch({
                type: menuActions.ADD_IMAGES,
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
            type: menuActions.RESET_FORM,
            payload: null
        })
        changeModal()
    }

    const reloadList = () => {
        dispatch({
            type: menuActions.RELOAD_LIST,
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
            type: menuActions.DELETE_IMAGE,
            payload: {
                data: index
            },
        });
    };

    const handleSave = async () => {
        const { name, price, description, is_available, images } = stateReducer.formData

        const formData = new FormData();

        if (stateReducer.currentMenuItem) {
            formData.append('id', String(stateReducer.currentMenuItem.id))
        }

        formData.append('name', name);
        formData.append('price', String(price));
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

        const { status } = stateReducer.currentMenuItem ? await Menu.update(formData, stateReducer.currentMenuItem.id) : await Menu.create(formData)

        if (status) {
            closeModal()
            reloadList()
        }
    };

    const onDelete = () => {
        dispatch({
            type: menuActions.CHANGE_VALUE,
            payload: {
                prop: 'deleteMenuItemModal',
                data: !stateReducer.deleteMenuItemModal
            }
        })
    }

    return (
        <>
            <FormModal
                modalTitle={stateReducer.currentMenuItem ? "Editar una habitacion" : 'Agregar una habitacion'}
                status={stateReducer.menuItemModal}
                btnText={stateReducer.currentMenuItem ? "Editar" : 'Agregar'}
                onSubmit={handleSave}
                size={'md'}
                onDelete={stateReducer.currentMenuItem ? onDelete : undefined}
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
                            <label>Selecciona las imágenes del platillo</label>
                        </Row>
                    </div>
                    <FormGroup className="mb-3">
                        <label>Nombre</label>
                        <div className="inputWithIcon">
                            <FormControl
                                type="text"
                                className="textInput"
                                placeholder="Ingresa el nombre del platillo"
                                value={stateReducer.formData.name}
                                name="name"
                                onChange={handleOnChangeInput}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <label>Precio</label>
                        <div className="inputWithIcon">
                            <FormControl
                                type="number"
                                className="textInput"
                                placeholder="Ingresa el precio del platillo"
                                value={stateReducer.formData.price}
                                name="price"
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

export default CreateMenuItemModal