import React, { ReactNode } from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <Navbar />
            <main className="main-content">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;