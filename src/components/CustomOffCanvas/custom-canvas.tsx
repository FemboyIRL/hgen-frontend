import "./custom-canvas.css";
import { Button, Offcanvas } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import React from "react";

// Definimos las props del componente
interface CustomOffcanvasProps {
    show: boolean; // Indica si el Offcanvas está visible
    onHide: () => void; // Función para ocultar el Offcanvas
    title: string; // Título del Offcanvas
    children: React.ReactNode; // Contenido del Offcanvas
}

const CustomOffcanvas: React.FC<CustomOffcanvasProps> = ({
    show,
    onHide,
    title,
    children,
}) => {
    return (
        <Offcanvas show={show} onHide={onHide}>
            <Offcanvas.Header>
                <Offcanvas.Title>{title}</Offcanvas.Title>
                <Button onClick={onHide} className="closeBtn">
                    <X className="icons" />
                </Button>
            </Offcanvas.Header>
            <Offcanvas.Body>{children}</Offcanvas.Body>
        </Offcanvas>
    );
};

export default CustomOffcanvas;