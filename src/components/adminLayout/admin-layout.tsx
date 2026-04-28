import { Outlet } from "react-router-dom";
import { SideBarAdmin } from "../layout/sidebar/sidebar-admin";
import { NavBarAdmin } from "./navbarAdmin/navbar-admin";
import { FooterOnModule } from "./footerOnModule/footer-module";
import './admin-layout.css'


const AdminLayout = () => {
    return (
        <>
            <NavBarAdmin />
            <div className="admin-layout">
                <div className="sidebar d-none d-lg-block">
                    <SideBarAdmin />
                </div>
                <div className="content d-flex flex-column h-100">
                    <div className="flex-grow-1 overflow-auto">
                        <Outlet />
                    </div>
                    <div className="footer mt-auto">
                        <FooterOnModule />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminLayout