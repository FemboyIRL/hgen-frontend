import { Modal, Button, Row, Col, Badge } from "react-bootstrap";
import {
    PersonFill,
    EnvelopeFill,
    TelephoneFill,
    GeoAltFill,
    CreditCardFill,
    CalendarCheck,
    CalendarX,
    CashStack,
    BuildingFill,
    PersonBadgeFill,
    Receipt,
    Hash,
    DoorOpen,
    CalendarRange
} from "react-bootstrap-icons";
import { Reservation } from "../../../../types/reservation";

interface ViewReservationModalProps {
    show: boolean;
    onHide: () => void;
    reservation: Reservation | null;
}

const ViewReservationModal: React.FC<ViewReservationModalProps> = ({
    show,
    onHide,
    reservation
}) => {

    if (!reservation) return null;

    const getStatusBadge = (status: string) => {
        const statusConfig: { [key: string]: { color: string; text: string; variant: string; textColor: string } } = {
            pending: { color: "#ffc107", text: "Pendiente", variant: "warning", textColor: "#856404" },
            confirmed: { color: "#28a745", text: "Confirmada", variant: "success", textColor: "#ffffff" },
            cancelled: { color: "#dc3545", text: "Cancelada", variant: "danger", textColor: "#ffffff" },
            completed: { color: "#17a2b8", text: "Completada", variant: "info", textColor: "#ffffff" }
        };

        const config = statusConfig[status] || {
            color: "#6c757d",
            text: status,
            variant: "secondary",
            textColor: "#ffffff"
        };

        return (
            <Badge
                bg={config.variant}
                pill
                style={{
                    fontSize: "0.9rem",
                    padding: "8px 16px",
                    color: config.textColor,
                    fontWeight: "bold",
                    textShadow: status === "pending" ? "none" : "0 1px 1px rgba(0,0,0,0.2)",
                    letterSpacing: "0.5px"
                }}
            >
                {config.text}
            </Badge>
        );
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        }).format(amount);
    };

    const calculateNights = (checkIn: Date, checkOut: Date) => {
        const diffTime = Math.abs(new Date(checkOut).getTime() - new Date(checkIn).getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            scrollable
            dialogClassName="view-reservation-modal"
        >
            <Modal.Header
                closeButton
                style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    borderBottom: "none"
                }}
            >
                <Modal.Title className="d-flex align-items-center">
                    <Receipt className="me-2" size={24} />
                    Detalles de la Reservación
                </Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ padding: "0", maxHeight: "70vh" }}>
                <div style={{
                    maxHeight: "calc(70vh - 100px)",
                    overflowY: "auto",
                    padding: "20px"
                }}>
                    {/* Header de la reservación */}
                    <div
                        className="text-center my-4 pb-3"
                        style={{
                            borderBottom: "2px solid #f0f0f0",
                            position: "sticky",
                            top: 0,
                            background: "white",
                            zIndex: 1
                        }}
                    >
                        <div className="d-flex justify-content-between align-items-center my-2">
                            <span style={{ fontSize: "0.9rem", color: "#666" }}>
                                <Hash size={14} className="me-1" />
                                ID de reservación
                            </span>
                            <span style={{ fontWeight: "bold", color: "#667eea" }}>
                                #{reservation.id}
                            </span>
                        </div>
                        <div>
                            {getStatusBadge(reservation.status)}
                        </div>
                    </div>

                    {/* Información del Cliente */}
                    <div className="my-4">
                        <h6 style={{
                            color: "#667eea",
                            marginBottom: "15px",
                            borderLeft: "4px solid #667eea",
                            paddingLeft: "12px"
                        }}>
                            <PersonFill className="me-2" /> Información del Cliente
                        </h6>
                        <div style={{
                            background: "#f8f9fa",
                            borderRadius: "12px",
                            padding: "16px",
                            marginBottom: "20px"
                        }}>
                            <Row>
                                <Col md={12}>
                                    <h5 className="my-2" style={{ color: "#333" }}>
                                        {reservation.customer.fullName}
                                    </h5>
                                    <div className="mt-3">
                                        <p className="my-2">
                                            <EnvelopeFill className="me-2" size={14} color="#667eea" />
                                            {reservation.customer.email}
                                        </p>
                                        <p className="my-2">
                                            <TelephoneFill className="me-2" size={14} color="#667eea" />
                                            {reservation.customer.phone}
                                        </p>
                                        <p className="my-0">
                                            <GeoAltFill className="me-2" size={14} color="#667eea" />
                                            {reservation.customer.address}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <Row>
                        {/* Información de la Habitación */}
                        <Col md={6} className="my-4">
                            <h6 style={{
                                color: "#667eea",
                                marginBottom: "15px",
                                borderLeft: "4px solid #667eea",
                                paddingLeft: "12px"
                            }}>
                                <BuildingFill className="me-2" /> Habitación
                            </h6>
                            <div style={{
                                background: "#f8f9fa",
                                borderRadius: "12px",
                                padding: "16px",
                                height: "100%"
                            }}>
                                <div className="text-center my-3">
                                    <DoorOpen size={40} color="#667eea" />
                                </div>
                                <h3 className="text-center my-3" style={{ color: "#667eea" }}>
                                    {reservation.room.room_number}
                                </h3>
                                <p className="my-2">
                                    <strong>Tipo:</strong> {reservation.room.type}
                                </p>
                                <p className="my-2">
                                    <strong>Capacidad:</strong> {reservation.room.capacity} personas
                                </p>
                                <p className="my-0">
                                    <strong>Camas:</strong> {reservation.room.beds} ({reservation.room.bed_type})
                                </p>
                            </div>
                        </Col>

                        {/* Fechas */}
                        <Col md={6} className="my-4">
                            <h6 style={{
                                color: "#667eea",
                                marginBottom: "15px",
                                borderLeft: "4px solid #667eea",
                                paddingLeft: "12px"
                            }}>
                                <CalendarRange className="me-2" /> Estancia
                            </h6>
                            <div style={{
                                background: "#f8f9fa",
                                borderRadius: "12px",
                                padding: "16px",
                                height: "100%"
                            }}>
                                <div className="my-3">
                                    <div style={{
                                        background: "#e3f2fd",
                                        borderRadius: "8px",
                                        padding: "12px",
                                        marginBottom: "12px"
                                    }}>
                                        <CalendarCheck className="me-2" color="#1976d2" />
                                        <strong>Check-in:</strong>
                                        <div className="mt-1">
                                            {formatDate(reservation.check_in_date)}
                                        </div>
                                    </div>
                                    <div style={{
                                        background: "#fff3e0",
                                        borderRadius: "8px",
                                        padding: "12px"
                                    }}>
                                        <CalendarX className="me-2" color="#f57c00" />
                                        <strong>Check-out:</strong>
                                        <div className="mt-1">
                                            {formatDate(reservation.check_out_date)}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-3 pt-2 border-top">
                                    <span className="text-muted">
                                        Total: {calculateNights(reservation.check_in_date, reservation.check_out_date)} noches
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        {/* Pago */}
                        <Col md={6} className="my-4">
                            <h6 style={{
                                color: "#667eea",
                                marginBottom: "15px",
                                borderLeft: "4px solid #667eea",
                                paddingLeft: "12px"
                            }}>
                                <CashStack className="me-2" /> Pago
                            </h6>
                            <div style={{
                                background: "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
                                borderRadius: "12px",
                                padding: "16px",
                                border: "1px solid #667eea30"
                            }}>
                                <div className="text-center my-3">
                                    <span style={{ fontSize: "0.9rem", color: "#666" }}>Total a pagar</span>
                                    <h2 style={{ color: "#667eea", fontWeight: "bold", margin: "10px 0" }}>
                                        {formatCurrency(reservation.total_price)}
                                    </h2>
                                </div>
                                <p className="mb-0">
                                    <strong>Método de pago:</strong><br />
                                    <CreditCardFill className="me-2" size={14} color="#667eea" />
                                    {reservation.payment_method === "credit_card" && "Tarjeta de crédito"}
                                    {reservation.payment_method === "debit_card" && "Tarjeta de débito"}
                                    {reservation.payment_method === "cash" && "Efectivo"}
                                    {reservation.payment_method === "bank_transfer" && "Transferencia bancaria"}
                                </p>
                            </div>
                        </Col>

                        {/* Empleado */}
                        <Col md={6} className="my-4">
                            <h6 style={{
                                color: "#667eea",
                                marginBottom: "15px",
                                borderLeft: "4px solid #667eea",
                                paddingLeft: "12px"
                            }}>
                                <PersonBadgeFill className="me-2" /> Registrado por
                            </h6>
                            <div style={{
                                background: "#f8f9fa",
                                borderRadius: "12px",
                                padding: "16px",
                                height: "100%"
                            }}>
                                <div className="text-center my-3">
                                    <div style={{
                                        width: "50px",
                                        height: "50px",
                                        background: "#667eea",
                                        borderRadius: "50%",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "white",
                                        fontSize: "20px"
                                    }}>
                                        {reservation.employee.fullName.charAt(0)}
                                    </div>
                                </div>
                                <p className="my-2 text-center">
                                    <strong>{reservation.employee.fullName}</strong>
                                </p>
                                <p className="my-1">
                                    <EnvelopeFill className="me-2" size={14} color="#667eea" />
                                    {reservation.employee.email}
                                </p>
                                <p className="my-0">
                                    <strong>Puesto:</strong> {reservation.employee.position}
                                </p>
                            </div>
                        </Col>
                    </Row>

                    {/* Dirección de Facturación */}
                    <div className="my-3">
                        <h6 style={{
                            color: "#667eea",
                            marginBottom: "15px",
                            borderLeft: "4px solid #667eea",
                            paddingLeft: "12px"
                        }}>
                            <GeoAltFill className="me-2" /> Dirección de Facturación
                        </h6>
                        <div style={{
                            background: "#f8f9fa",
                            borderRadius: "12px",
                            padding: "16px"
                        }}>
                            <p className="mb-0">
                                {reservation.billing_address || "No especificada"}
                            </p>
                        </div>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer style={{
                background: "#f8f9fa",
                borderTop: "1px solid #e0e0e0",
                padding: "15px 20px"
            }}>
                <Button
                    variant="light"
                    onClick={onHide}
                    style={{
                        borderRadius: "8px",
                        padding: "8px 24px",
                        fontWeight: 500,
                        backgroundColor: "white",
                        borderColor: "#dee2e6",
                        color: "#6c757d"
                    }}
                >
                    Cerrar
                </Button>
                <Button
                    variant="light"
                    onClick={() => window.print()}
                    style={{
                        borderRadius: "8px",
                        padding: "8px 24px",
                        fontWeight: 500,
                        backgroundColor: "white",
                        borderColor: "#667eea",
                        color: "#667eea"
                    }}
                >
                    Imprimir
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewReservationModal;