import EmployeeActions from "../../reducer/actions";
import ApiConsumer from "../../../../services/api_consumer";
import { toast } from "react-toastify";
import '../../../delete-modal.css'
import CustomDeleteModal from "../../../../components/DeleteModal/delete_modal";
import { EmployeeReducer } from "../../reducer/constants";

interface DeleteEmployeeModalProps {
    stateReducer: EmployeeReducer
    dispatch: React.Dispatch<{
        type: string;
        payload: any;
    }>;
    changeModal: () => void;
}

const Employee = new ApiConsumer({ url: 'employees/' })

const DeleteEmployeeModal: React.FC<DeleteEmployeeModalProps> = ({ stateReducer, dispatch, changeModal }) => {

    const reloadList = () => {
        dispatch({
            type: EmployeeActions.RELOAD_LIST,
            payload: null,
        })
    }

    const closeModal = () => {
        changeValue("currentEmployee", null)
        changeModal();
    }

    const changeValue = (prop: string, data: any) => {
        dispatch({
            type: EmployeeActions.CHANGE_VALUE,
            payload: {
                prop,
                data
            }
        })
    }

    const handleDeleteButton = async () => {
        if (stateReducer.currentEmployee) {
            const { status } = await Employee.delete(stateReducer.currentEmployee.user_id)
            if (status) {
                toast.success(`Empleado eliminado con éxito`)
                reloadList()
                closeModal();
            }
        }
    }

    return (
        <>
            {stateReducer.deleteEmployeeModal &&
                <CustomDeleteModal
                    show={stateReducer.deleteEmployeeModal}
                    onHide={closeModal}
                    title={"Eliminar empleado"}
                    typeDelete={'empleado'}
                    secondBtnClick={() => handleDeleteButton()}
                    firstBtnClick={closeModal}
                >
                </CustomDeleteModal>
            }
        </>
    )
}

export default DeleteEmployeeModal;