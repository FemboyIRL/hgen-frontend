import React from "react";
import { Room } from "../../../types/room";
import "./room_modal.css";
import { useNavigate } from "react-router-dom";

interface RoomModalProps {
    room: Room | null | undefined;
    mainImage: string;
    onClose: () => void;
    switchMainImage: (image_url: string) => void
}

const RoomModal: React.FC<RoomModalProps> = ({ room, mainImage, onClose, switchMainImage }) => {
    if (!room) return null;

    const navigate = useNavigate();

    const onBook = (room: Room) => {
        navigate("/reservation", {
            state: {
                selected_room: room,
            }
        });
    }

    return (
        <div className="room-modal-overlay" onClick={onClose}>
            <div className="room-modal-container premium" onClick={(e) => e.stopPropagation()}>

                {/* Header flotante */}
                <button className="room-modal-close" onClick={onClose}>
                    ✕
                </button>

                {/* Contenido */}
                <div className="room-modal-content">

                    {/* COLUMNA IZQUIERDA */}
                    <div className="room-modal-left">

                        {/* Imagen principal */}
                        <div className="room-modal-hero">
                            {mainImage && (
                                <img src={mainImage} alt={`Habitación ${room.room_number}`} />
                            )}
                        </div>

                        {/* Thumbnails */}
                        <div className="room-modal-thumbs">
                            {room.images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`thumb-${i}`}
                                    onClick={() => switchMainImage(img)}
                                    className={mainImage === img ? 'active' : ''}
                                />
                            ))}
                        </div>

                    </div>

                    {/* COLUMNA DERECHA */}
                    <div className="room-modal-right">

                        <div className="room-modal-header-block">
                            <h2>Habitación #{room.room_number}</h2>
                            <div className="room-badges">
                                <span className="room-type">{room.type}</span>
                                {room.floor && (
                                    <span className="room-floor">Piso {room.floor}</span>
                                )}
                            </div>
                        </div>

                        {/* Características principales */}
                        <div className="room-modal-features">
                            <div className="feature-item">
                                <span className="feature-label">Capacidad:</span>
                                <span className="feature-value">{room.capacity} personas</span>
                            </div>
                            <div className="feature-item">
                                <span className="feature-label">Camas:</span>
                                <span className="feature-value">{room.beds} {room.beds === 1 ? 'cama' : 'camas'}{room.bed_type && ` · ${room.bed_type}`}</span>
                            </div>
                            {room.size && (
                                <div className="feature-item">
                                    <span className="feature-label">Tamaño:</span>
                                    <span className="feature-value">{room.size} m²</span>
                                </div>
                            )}
                        </div>

                        {/* Descripción */}
                        <div className="room-modal-description">
                            <h4>Descripción</h4>
                            <p>{room.description}</p>
                        </div>

                        {/* Amenities */}
                        {room.amenities && room.amenities.length > 0 && (
                            <div className="room-modal-amenities">
                                <h4>Servicios y comodidades</h4>
                                <div className="amenities-list">
                                    {room.amenities.map((amenity, idx) => (
                                        <span key={idx} className="room-amenity-tag">{amenity}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Características especiales */}
                        {room.features && room.features.length > 0 && (
                            <div className="room-modal-features-list">
                                <h4>Características especiales</h4>
                                <ul className="features-list">
                                    {room.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="room-modal-cta">
                            <button
                                className="room-modal-book"
                                onClick={() => onBook(room)}
                            >
                                Reservar ahora
                            </button>
                            <div className="payment-info">
                                <span>✓ Pago seguro</span>
                                <span>✓ Sin cargos ocultos</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomModal;