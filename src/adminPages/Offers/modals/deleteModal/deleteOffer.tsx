import { toast } from "react-toastify";
import ApiConsumer from "../../../../services/api_consumer";
import offerActions from "../../reducer/actions";
import '../../../delete-modal.css'
import CustomDeleteModal from "../../../../components/DeleteModal/delete_modal";
import { OfferReducer } from "../../reducer/constants";

interface DeleteOfferModalProps {
    stateReducer: OfferReducer
    dispatch: React.Dispatch<{
        type: string;
        payload: any;
    }>;
    changeModal: () => void;
}

const Offer = new ApiConsumer({ url: 'menu/' })

const DeleteOfferModal: React.FC<DeleteOfferModalProps> = ({ stateReducer, dispatch, changeModal }) => {

    const reloadList = () => {
        dispatch({
            type: offerActions.RELOAD_LIST,
            payload: null,
        })
    }

    const closeModal = () => {
        changeValue("currentOffer", null)
        changeValue("offerModal", !stateReducer.offerModal)
        changeModal();
    }

    const changeValue = (prop: string, data: any) => {
        dispatch({
            type: offerActions.CHANGE_VALUE,
            payload: {
                prop,
                data
            }
        })
    }

    const handleDeleteButton = async () => {
        console.log(stateReducer)
        if (stateReducer.currentOffer) {
            const { status } = await Offer.delete(stateReducer.currentOffer.id)
            if (status) {
                toast.success(`Oferta eliminada con éxito`)
                reloadList()
                closeModal();
            }
        }
    }
    return (
        <>
            {stateReducer.deleteOfferModal &&
                <CustomDeleteModal
                    show={stateReducer.deleteOfferModal}
                    onHide={closeModal}
                    title={"Eliminar oferta"}
                    typeDelete={'Oferta'}
                    secondBtnClick={() => handleDeleteButton()}
                    firstBtnClick={closeModal}
                >
                </CustomDeleteModal>
            }
        </>
    )
}
export default DeleteOfferModal;