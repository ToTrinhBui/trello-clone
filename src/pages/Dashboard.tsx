// Dashbroad component
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarUser from "../components/NavbarUser";
import Sidebar from "../components/Sidebar";

import '../styles/index.css';
import '../styles/dashboard.css';
import Boards from "../components/dashboard/Boards";

export default function Dashbroad() {
    const sidebarStyles: React.CSSProperties & { "--color": string } = {
        backgroundColor: "#fff",
        color: '#172B4D',
        "--color": "#172B4D",
    };

    const navbarStyles: React.CSSProperties & { "--nav-color": string; "--filter-logo": string; "--svg-fill": string } = {
        backgroundColor: "#fff",
        "--nav-color": "#44546f",
        "--filter-logo": 'brightness(0) saturate(100%) invert(30%) sepia(53%) saturate(323%) hue-rotate(179deg) brightness(91%) contrast(88%)',
        "--svg-fill": '#626f86',
    };

    const [boards, setBoards] = useState('');

    async function fetchBoards() {
        try {
            const response = await axios.get('http://localhost:3001/boards?user_id=1');
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <div>
                <NavbarUser style={navbarStyles} />
                <div className="flex">
                    <Sidebar style={sidebarStyles} />
                    <div className="dashboard">
                        <div className="dashboard-inner">
                            <Boards />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
