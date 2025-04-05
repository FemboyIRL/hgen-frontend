import React, { ReactNode } from "react";
// import Footer from "./footer/footer";
import Navbar from "./navbar/navbar";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <Navbar />
            <main className="main-content">{children}</main>
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;