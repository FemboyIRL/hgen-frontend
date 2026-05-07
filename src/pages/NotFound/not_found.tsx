// pages/NotFound.tsx
import { Link } from 'react-router-dom';
import { HouseDoor, ArrowLeft } from 'react-bootstrap-icons';
import { Button, Container, Row, Col } from 'react-bootstrap';

const NotFound = () => {
    return (
        <Container className="min-vh-100 d-flex align-items-center">
            <Row className="w-100">
                <Col md={8} lg={6} className="mx-auto text-center">
                    {/* Animación/Icono */}
                    <div className="mb-4">
                        <div className="display-1">
                            <span role="img" aria-label="confused" className="me-2">🔍</span>
                            <span role="img" aria-label="sad">😕</span>
                        </div>
                    </div>

                    {/* Código de error */}
                    <h1 className="display-1 fw-bold text-primary">404</h1>

                    {/* Mensaje */}
                    <h2 className="h3 mb-3">¡Ups! Página no encontrada</h2>
                    <p className="text-muted mb-4">
                        La página que buscas no existe, fue eliminada o cambió de dirección.
                    </p>

                    {/* Botones de acción */}
                    <div className="d-flex gap-2 justify-content-center">
                        <Link to="/admin/home">
                            <Button variant="primary">
                                <HouseDoor className="me-2" />
                                Ir al inicio
                            </Button>
                        </Link>
                        <Button
                            variant="outline-secondary"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft className="me-2" />
                            Volver atrás
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;