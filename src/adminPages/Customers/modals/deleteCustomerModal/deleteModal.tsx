import CustomerActions from "../../reducer/actions";
import ApiConsumer from "../../../../services/api_consumer";
import { toast } from "react-toastify";
import '../../../delete-modal.css'
import CustomDeleteModal from "../../../../components/DeleteModal/delete_modal";
import { CustomerReducer } from "../../reducer/constants";

interface DeleteCustomerModalProps {
    stateReducer: CustomerReducer
    dispatch: React.Dispatch<{
        type: string;
        payload: any;
    }>;
    changeModal: () => void;
}

const Customer = new ApiConsumer({ url: 'clients/' })

const DeleteModal: React.FC<DeleteCustomerModalProps> = ({ stateReducer, dispatch, changeModal }) => {

    const reloadList = () => {
        dispatch({
            type: CustomerActions.RELOAD_LIST,
            payload: null,
        })
    }

    const closeModal = () => {
        changeValue("idSelectedDependency", null)
        changeModal();
    }

    const changeValue = (prop: string, data: any) => {
        dispatch({
            type: CustomerActions.CHANGE_VALUE,
            payload: {
                prop,
                data
            }
        })
    }

    const handleDeleteButton = async () => {
        console.log(stateReducer)
        if (stateReducer.currentCustomer) {
            const { status } = await Customer.delete(stateReducer.currentCustomer.user_id)
            if (status) {
                toast.success(`Cliente eliminado con éxito`)
                reloadList()
                closeModal();
            }
        }
    }
    return (
        <>
            {stateReducer.deleteCustomerModal &&
                <CustomDeleteModal
                    show={stateReducer.deleteCustomerModal}
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