import React from 'react';
import FormModal from '../FormModal/form-modal';

interface CustomDeleteModalProps {
    show: boolean;
    onHide: () => void;
    title: string;
    typeDelete: string;
    firstBtnClick: () => void;
    secondBtnClick: () => void;
}

const CustomDeleteModal: React.FC<CustomDeleteModalProps> = ({
    show,
    onHide,
    title,
    typeDelete,
    firstBtnClick,
    secondBtnClick
}) => {
    return (
        <FormModal
            status={show}
            size='md'
            changeModal={onHide}
            modalTitle={title}
            onSubmit={firstBtnClick}
            btnText={"Cancelar"}
            secondBtn
            secondBtnSubmit={secondBtnClick}
            secondBtnText={"Eliminar"}
            currentStep={0}
        >
            <div className="textOnly withBorder">
                <label>¿Está seguro de que quiere eliminar este {typeDelete}?</label>
            </div>
            <div className="textOnly icon">
                <img src="/assets/icons/iconTrash.svg" alt="..." />
            </div>
            <div className="textOnly">
                <label>Todos los datos eliminados no podrán ser recuperados.</label>
            </div>
        </FormModal>
    );
};

export default CustomDeleteModal;