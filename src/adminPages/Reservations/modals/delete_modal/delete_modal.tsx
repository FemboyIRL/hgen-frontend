import { toast } from "react-toastify";
import ApiConsumer from "../../../../services/api_consumer";
import reservationActions from "../../reducer/actions";
import '../../../delete-modal.css'
import CustomDeleteModal from "../../../../components/DeleteModal/delete_modal";
import { ReservationReducer } from "../../reducer/constants";

interface DeleteReservationModalProps {
    state: ReservationReducer
    dispatch: React.Dispatch<{
        type: string;
        payload: any;
    }>;
    changeModal: () => void;
}

const Reservation = new ApiConsumer({ url: 'reservations/' })

const DeleteReservationModal: React.FC<DeleteReservationModalProps> = ({ state, dispatch, changeModal }) => {

    const reloadList = () => {
        dispatch({
            type: reservationActions.RELOAD_LIST,
            payload: null,
        })
    }

    const closeModal = () => {
        changeValue("currentReservation", null)
        changeValue("reservationModal", false)
        changeValue("deleteReservationModal", false)
        changeModal();
    }

    const changeValue = (prop: string, data: any) => {
        dispatch({
            type: reservationActions.CHANGE_VALUE,
            payload: {
                prop,
                data
            }
        })
    }

    const handleDeleteButton = async () => {
        console.log(state)
        if (state.currentReservation) {
            const { status } = await Reservation.delete(state.currentReservation.id)
            if (status) {
                toast.success(`Reservación eliminada con éxito`)
                reloadList()
                closeModal()
            } else {
                toast.error(`Error al eliminar la reservación`)
            }
        }
    }

    return (
        <>
            {state.deleteReservationModal && (
                <CustomDeleteModal
                    show={state.deleteReservationModal}
                    onHide={closeModal}
                    title={"Eliminar reservación"}
                    typeDelete={'Reservación'}
                    secondBtnClick={() => handleDeleteButton()}
                    firstBtnClick={closeModal}
                >
                </CustomDeleteModal>
            )}
        </>
    )
}

export default DeleteReservationModal;