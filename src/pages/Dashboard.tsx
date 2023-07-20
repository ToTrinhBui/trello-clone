// Dashbroad component
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarUser from "../components/NavbarUser";
import Sidebar from "../components/Sidebar";

import '../styles/index.css';
import '../styles/dashboard.css';
import Boards from "../components/dashboard/Boards";
import Title from "../components/dashboard/Title";

interface Board {
    id: string,
    name: string,
}

export default function Dashbroad() {
    const sidebarStyles: React.CSSProperties & { "--color": string } = {
        backgroundColor: "#fff",
        color: '#172B4D',
        "--color": "#626f86",
    };

    const navbarStyles: React.CSSProperties & { "--nav-color": string; "--filter-logo": string; "--svg-fill": string } = {
        backgroundColor: "#fff",
        "--nav-color": "#44546f",
        "--filter-logo": 'brightness(0) saturate(100%) invert(30%) sepia(53%) saturate(323%) hue-rotate(179deg) brightness(91%) contrast(88%)',
        "--svg-fill": '#626f86',
    };

    const [data, setData] = useState<Board[]>([]);
    const { id } = useParams<{ id?: string }>();

    useEffect(() => {
        fetchBoards();
    }, [])

    async function fetchBoards() {
        try {
            const response = await axios.get(`http://localhost:3001/boards?user_id=${id}`);
            console.log(response.data);
            setData(response.data);
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
                            <Title />
                            <Boards props={data} refresh={fetchBoards}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
