import { toast } from "react-toastify";
import ApiConsumer from "../../../../services/api_consumer";
import MenuItemsActions from "../../reducer/actions";
import '../../../delete-modal.css'
import CustomDeleteModal from "../../../../components/DeleteModal/delete_modal";
import { MenuReducer } from "../../reducer/constants";

interface deleteMenuItemModalProps {
    stateReducer: MenuReducer
    dispatch: React.Dispatch<{
        type: string;
        payload: any;
    }>;
    changeModal: () => void;
}

const MenuItem = new ApiConsumer({ url: 'menu/' })

const DeleteMenuItemModal: React.FC<deleteMenuItemModalProps> = ({ stateReducer, dispatch, changeModal }) => {

    const reloadList = () => {
        dispatch({
            type: MenuItemsActions.RELOAD_LIST,
            payload: null,
        })
    }

    const closeModal = () => {
        changeValue("currentMenuItem", null)
        changeValue("menuItemModal", !stateReducer.menuItemModal)
        changeModal();
    }

    const changeValue = (prop: string, data: any) => {
        dispatch({
            type: MenuItemsActions.CHANGE_VALUE,
            payload: {
                prop,
                data
            }
        })
    }

    const handleDeleteButton = async () => {
        console.log(stateReducer)
        if (stateReducer.currentMenuItem) {
            const { status } = await MenuItem.delete(stateReducer.currentMenuItem.id)
            if (status) {
                toast.success(`Item del menu eliminado con éxito`)
                reloadList()
                closeModal();
            }
        }
    }
    return (
        <>
            {stateReducer.deleteMenuItemModal &&
                <CustomDeleteModal
                    show={stateReducer.deleteMenuItemModal}
                    onHide={closeModal}
                    title={"Eliminar item del menu"}
                    typeDelete={'platillo'}
                    secondBtnClick={() => handleDeleteButton()}
                    firstBtnClick={closeModal}
                >
                </CustomDeleteModal>
            }
        </>
    )
}
export default DeleteMenuItemModal;