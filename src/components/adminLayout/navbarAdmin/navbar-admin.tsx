import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { List } from "react-bootstrap-icons";
import { SideBarAdmin } from "../../layout/sidebar/sidebar-admin";
import "./navbar-admin.css";
import CustomOffcanvas from "../../CustomOffCanvas/custom-canvas";

export const NavBarAdmin = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar expand="lg" className="body-tertiary navBarAdmin">
                <div className="nav-container">
                    <Button
                        className="d-lg-none custom-button"
                        onClick={handleShow}
                    >
                        <List className="icon" />
                    </Button>
                    <Navbar.Brand className="logo">
                        <img src="/assets/images/logo.jpeg" alt=""></img>
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link className="texto">Contacto</Nav.Link>
                    </Nav>
                </div>
            </Navbar>
            <CustomOffcanvas
                show={show}
                onHide={handleClose}
                title={"Menu"}
            >
                <SideBarAdmin />
            </CustomOffcanvas>
        </>
    );
};