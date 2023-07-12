// Dashbroad component
import React from "react";
import NavbarUser from "../components/NavbarUser";
import Sidebar from "../components/Sidebar";

import '../styles/index.css';
import '../styles/dashbroad.css';

export default function Dashbroad() {
    const sidebarStyles: React.CSSProperties & { "--svg-color": string } = {
        backgroundColor: "#fff",
        color: '#172B4D',
        "--svg-color": "#172B4D",
    };

    const navbarStyles: React.CSSProperties & { "--nav-color": string; "--filter-logo": string; "--svg-fill": string } = {
        "--nav-color": "#44546f",
        "--filter-logo": 'brightness(0) saturate(100%) invert(30%) sepia(53%) saturate(323%) hue-rotate(179deg) brightness(91%) contrast(88%)',
        "--svg-fill": '#626f86',
    };

    return (
        <>
            <div>
                <NavbarUser style={navbarStyles} />
                <div className="flex">
                    <Sidebar style={sidebarStyles} />
                    <div className="broads"></div>
                </div>
            </div>
        </>
    );
}
