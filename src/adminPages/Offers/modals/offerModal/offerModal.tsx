import { Button, Form, FormControl, FormGroup, Row, } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";
import ApiConsumer from "../../../../services/api_consumer";
import { useEffect } from "react";
import { OfferReducer } from "../../reducer/constants";
import FormModal from "../../../../components/FormModal/form-modal";
import { toast } from "react-toastify";
import offerActions from "../../reducer/actions";

interface CreateOfferModalProps {
    stateReducer: OfferReducer
    dispatch: React.Dispatch<{
        type: string;
        payload: any;
    }>
    changeModal: () => void
}

const Menu = new ApiConsumer({ url: 'offers/' })

const CreateOfferModal: React.FC<CreateOfferModalProps> = ({ stateReducer, dispatch, changeModal }) => {

    useEffect(() => {
        if (stateReducer.offerModal) {
            console.log(stateReducer)
            if (stateReducer.currentOffer) {
                getMenuData()
            }
        }
    }, [stateReducer.offerModal])

    const getMenuData = () => {
        const selectedOffer = stateReducer.offers.find(offer => offer.id === stateReducer.currentOffer?.id);
        console.log(selectedOffer)
        dispatch({
            type: offerActions.CHANGE_ALL_VALUE_FORM,
            payload: selectedOffer
        })
    }

    const changeValueForm = (prop: string, data: any) => {
        dispatch({
            type: offerActions.CHANGE_VALUE_FORM,
            payload: {
                prop,
                data
            },
        });
    }

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files, value } = e.target

        console.log({ name, files, value })

        if (name === 'images' && files && files.length > 0) {
            console.log('papu')
            dispatch({
                type: offerActions.ADD_IMAGES,
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
            type: offerActions.RESET_FORM,
            payload: null
        })
        changeModal()
    }

    const reloadList = () => {
        dispatch({
            type: offerActions.RELOAD_LIST,
            payload: null,
        })
    }

    const onDeleteImage = (index: number) => (e: React.MouseEvent) => {
        e.stopPropagation();

        const imgSrc: any = stateReducer.formData.images[index];
        if (imgSrc instanceof File) {
            URL.revokeObjectURL(URL.createObjectURL(imgSrc));
        }

        dispatch({
            type: offerActions.DELETE_IMAGE,
            payload: {
                data: index
            },
        });
    };
    const handleSave = async () => {
        const { title, original_price, discount_price, description, images } = stateReducer.formData

        const formData = new FormData();

        if (stateReducer.currentOffer) {
            formData.append('id', String(stateReducer.currentOffer.id))
        }

        formData.append('title', title);
        formData.append('originalPrice', String(original_price));
        formData.append('discountPrice', String(discount_price));
        formData.append('description', description);


        if (images && images.length > 0) {
            images.forEach((file: any) => {
                if (file instanceof File) {
                    formData.append('new_images', file);
                } else {
                    formData.append('images', file)
                }
            });
        }

        const { status } = stateReducer.currentOffer ? await Menu.update(formData, stateReducer.currentOffer.id) : await Menu.create(formData)

        if (status) {
            closeModal()
            reloadList()
        }
    };

    const onDelete = async () => {
        try {
            const { status } = await Menu.delete(Number(stateReducer.currentOffer?.id))

            if (status) {
                toast.success('Oferta eliminada de forma exitosa')
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
                modalTitle={stateReducer.currentOffer ? "Editar una oferta" : 'Agregar una oferta'}
                status={stateReducer.offerModal}
                btnText={stateReducer.currentOffer ? "Editar" : 'Agregar'}
                onSubmit={handleSave}
                size={'md'}
                onDelete={stateReducer.currentOffer ? onDelete : undefined}
                changeModal={() => closeModal()}
            >
                <Form>
                    <div className="innerContainer">
                        <Row className="topRow">
                            <Button className="imgButton" style={{ backgroundColor: '#f2f2f2' }}>
                                <label htmlFor="image" className="d-flex flex-row justify-content-center flex-wrap" style={{ order: '5px solid green' }}>
                                    {stateReducer.formData.images.length > 0 ? (
                                        stateReducer.formData.images.map((imgSrc: any, index) => (
                                            <div className="img-container m-3">
                                                <div className='delete-icon d-flex justify-content-center align-items-center' onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDeleteImage(index)(e);
                                                }} style={{ position: "absolute", color: "#ffffff", borderRadius: '50%', width: '30px', height: '30px', border: '3px solid black', backgroundColor: 'red' }}><TrashFill /></div>
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
                                    id="image"
                                    name="images"
                                    type="file"
                                    multiple
                                    style={{ display: "none" }}
                                    onChange={handleOnChangeInput}
                                />
                            </Button>
                            <label>Selecciona las imagenes de la oferta</label>
                        </Row>
                    </div>
                    <FormGroup className="mb-3">
                        <label>Nombre</label>
                        <div className="inputWithIcon">
                            <FormControl
                                type="text"
                                className="textInput"
                                placeholder="Ingresa el nombre del platillo"
                                value={stateReducer.formData.title}
                                name="title"
                                onChange={handleOnChangeInput}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <label>Precio original</label>
                        <div className="inputWithIcon">
                            <FormControl
                                type="number"
                                className="textInput"
                                placeholder="Ingresa el precio original"
                                value={stateReducer.formData.original_price}
                                name="originalPrice"
                                onChange={handleOnChangeInput}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <label>Precio con descuento</label>
                        <div className="inputWithIcon">
                            <FormControl
                                type="number"
                                className="textInput"
                                placeholder="Ingresa el precio con descuento"
                                value={stateReducer.formData.discount_price}
                                name="discountPrice"
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

export default CreateOfferModal