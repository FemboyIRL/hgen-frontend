import { toast } from "react-toastify";
import ApiConsumer from "../../../../services/api_consumer";
import roomsActions from "../../reducer/actions";
import { RoomReducer } from "../../reducer/constants";
import '../../../delete-modal.css'
import CustomDeleteModal from "../../../../components/DeleteModal/delete_modal";

interface deleteRoomModalProps {
    stateReducer: RoomReducer
    dispatch: React.Dispatch<{
        type: string;
        payload: any;
    }>;
    changeModal: () => void;
}

const Room = new ApiConsumer({ url: 'rooms/' })

const DeleteModal: React.FC<deleteRoomModalProps> = ({ stateReducer, dispatch, changeModal }) => {

    const reloadList = () => {
        dispatch({
            type: roomsActions.RELOAD_LIST,
            payload: null,
        })
    }

    const closeModal = () => {
        changeValue("currentRoom", null)
        changeModal();
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

    const handleDeleteButton = async () => {
        console.log(stateReducer)
        if (stateReducer.currentRoom) {
            const { status } = await Room.delete(stateReducer.currentRoom.room_number)
            if (status) {
                toast.success(`Habitación eliminada con éxito`)
                reloadList()
                closeModal();
            }
        }
    }
    return (
        <>
            {stateReducer.deleteRoomModal &&
                <CustomDeleteModal
                    show={stateReducer.deleteRoomModal}
                    onHide={closeModal}
                    title={"Eliminar dependencia"}
                    typeDelete={'cliente'}
                    secondBtnClick={() => handleDeleteButton()}
                    firstBtnClick={closeModal}
                >
                </CustomDeleteModal>
            }
        </>
    )
}
export default DeleteModal;