import React from "react";
import { X } from "react-bootstrap-icons";
import { Room } from "../../../types/room";
import "./room_modal.css";

interface RoomModalProps {
    room: Room | null | undefined;
    mainImage: string;
    onClose: () => void;
    switchMainImage: (image_url: string) => void
}

const RoomModal: React.FC<RoomModalProps> = ({ room, mainImage, onClose, switchMainImage }) => {
    if (!room) return null;

    return (
        <div className="room-modal-overlay">
            <div className="room-modal-container premium">

                {/* Header flotante */}
                <button className="room-modal-close" onClick={onClose}>
                    <X size={26} />
                </button>

                {/* Contenido */}
                <div className="room-modal-content">

                    {/* COLUMNA IZQUIERDA */}
                    <div className="room-modal-left">

                        {/* Imagen principal */}
                        <div className="room-modal-hero">
                            {mainImage && (
                                <img src={mainImage} alt="room-main" />
                            )}
                        </div>

                        {/* Thumbnails */}
                        <div className="room-modal-thumbs">
                            {room.images.map((img, i) => (
                                <img key={i} src={img} alt={`thumb-${i}`} onClick={() => switchMainImage(img)}/>
                            ))}
                        </div>

                    </div>

                    {/* COLUMNA DERECHA */}
                    <div className="room-modal-right">

                        <div className="room-modal-header-block">
                            <h2>Habitación #{room.room_number}</h2>
                            <span className="room-type">{room.type}</span>
                        </div>

                        <div className="room-modal-description">
                            <h4>Descripción</h4>
                            <p>{room.description}</p>
                        </div>

                        <div className="room-modal-cta">
                            <button className="room-modal-book">
                                Reservar ahora
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomModal;