import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarUser from "../components/NavbarUser";
import Sidebar from "../components/Sidebar";

import '../styles/index.css';
import '../styles/dashboard.css';
import Boards from "../components/dashboard/Boards";
import Title from "../components/dashboard/Title";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";

interface Board {
    id: string,
    name: string,
    background: string,
}
interface Background {
    [key: string]: string
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
    const [backgrounds, setBacgrounds] = useState<Background>({});
    const user_redux = useSelector(selectUser).user;

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        try {
            const response = await axios.get(`http://localhost:3001/boards?user_id=${user_redux.id}`);
            setData(response.data);
            const response2 = await axios.get(`http://localhost:3001/backgrounds`);
            setBacgrounds(response2.data);
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
                            <Boards props={data} backgrounds={backgrounds}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
