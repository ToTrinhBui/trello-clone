import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarUser from "../components/NavbarUser";
import Sidebar from "../components/Sidebar";
import { URL_API } from "../api";
import '../styles/index.css';
import '../styles/dashboard.css';
import Boards from "../components/dashboard/Boards";
import Title from "../components/dashboard/Title";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import NotFound from "./NotFound";
import { useTheme } from "../theme/ThemeProvider";

interface Board {
    id: string,
    name: string,
    background: string,
}
interface Background {
    [key: string]: string
}
export default function Dashbroad() {
    const { theme } = useTheme();

    const [data, setData] = useState<Board[]>([]);
    const [backgrounds, setBacgrounds] = useState<Background>({});
    const user_redux = useSelector(selectUser).user;

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        try {
            const response = await axios.get(`${URL_API}/boards?user_id=${user_redux.id}`);
            setData(response.data);
            const response2 = await axios.get(`${URL_API}/backgrounds`);
            setBacgrounds(response2.data);
        } catch (error) {
            console.error(error);
        }
    }

    if (user_redux) {
        return (
            <>
                <div id={theme}>
                    <NavbarUser />
                    <div className="flex">
                        <Sidebar />
                        <div className="dashboard">
                            <div className="dashboard-inner">
                                <Title />
                                <Boards props={data} backgrounds={backgrounds} search={false} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return <NotFound />;
}
