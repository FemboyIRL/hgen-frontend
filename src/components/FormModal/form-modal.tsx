import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import './form-modal.css'
import { TrashFill } from "react-bootstrap-icons";

type FormModalProps = {
    modalTitle: string
    children: React.ReactNode
    status: boolean
    changeModal?: () => void
    onSubmit: () => void
    size?: "sm" | "md" | "lg" | "xl" | ""
    btnDisable?: boolean
    btnText?: string
    secondBtn?: boolean
    secondBtnText?: string
    secondBtnSubmit?: () => void
    totalSteps?: number
    currentStep?: number
    onDelete?: () => void
    onGoBack?: () => void
}

const FormModal: React.FC<FormModalProps> = ({ modalTitle, children, status, changeModal, onSubmit, size, btnDisable, btnText,
    secondBtn, secondBtnText, secondBtnSubmit, totalSteps, currentStep, onGoBack, onDelete }) => {
    const [primaryColor, setPrimaryColor] = useState("");

    const COLORS = {
        dark_grey: "#4F4F4F",
        black: "#000",
        red: "#FF0000"
    }

    if (!currentStep < !totalSteps) btnText = 'Siguiente'

    useEffect(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        const primary = rootStyles.getPropertyValue('--primary-color').trim();
        setPrimaryColor(primary);
    }, []);
    return (
        <Modal
            centered
            show={status}
            scrollable
            onHide={changeModal}
            size={size ? size : "sm"}
        >
            <Modal.Header closeButton closeVariant="white" style={primaryColor == COLORS.dark_grey ? { backgroundColor: COLORS.black } : undefined}>
                <Modal.Title>{modalTitle}</Modal.Title>
                {onDelete ? (
                    <>
                        <div className='delete-icon d-flex justify-content-center align-items-center' onClick={onDelete} style={{ color: "#ffffff", borderRadius: '50%', width: '30px', height: '30px', border: '3px solid black', backgroundColor: 'red' }}><TrashFill /></div>
                    </>)
                    :
                    (<></>)}
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body >
            <Modal.Footer>
                <div className="step-indicator">
                    {totalSteps && Array.from({ length: totalSteps }, (_, index) => (
                        <div
                            key={index}
                            className={`dot ${currentStep === index + 1 ? "active" : ""}`}
                        ></div>
                    ))}
                </div>
                {currentStep && currentStep === totalSteps ? <>
                    <Button onClick={onGoBack} disabled={btnDisable} className="btn-back">
                        Atras
                    </Button>
                </> : ''}
                <Button onClick={onSubmit} disabled={btnDisable}>
                    {btnText ? btnText : "Registrar"}
                </Button>
                {secondBtn ?
                    <Button className="secondBtn" style={secondBtnText === "Eliminar" ? { backgroundColor: COLORS.red } : undefined} onClick={secondBtnSubmit} disabled={btnDisable}>
                        {secondBtnText ? secondBtnText : "Cancelar"}
                    </Button>
                    : ''}
            </Modal.Footer>
        </Modal >
    )
}

export default FormModal;