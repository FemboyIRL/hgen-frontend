import "./loading-spinner.css"
import { Col, Row, Spinner } from "react-bootstrap"

const LoadingSpinnerContainer = () => {
    return (
        <Row>
            <Col className="loadingContainer">
                <Spinner className="customSpinner" animation="border" />
            </Col>
        </Row>
    )
}
export default LoadingSpinnerContainer;