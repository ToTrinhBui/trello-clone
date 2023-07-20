import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import NavbarUser from "../components/NavbarUser";
import Heading from "../components/Heading";
import Sidebar from "../components/Sidebar";
import "../styles/index.css";
import "../styles/table.css";
import BoardTable from "../components/table/BoardTable";

interface Task {
    id: string;
    Task: string;
    Due_Date: string;
    status: string;
}

interface Data {
    columns: Columns;
    tasks: Task[];
}

interface Columns {
    [key: string]: {
        title: string;
    };
}

export default function Table() {
    const [data, setData] = useState<Data>({
        columns: {},
        tasks: [],
    });
    const { boardID } = useParams();
    const [nameBoard, setNameBoard ]= useState<string>('Name board');

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await axios.get(`http://localhost:3001/boards?id=${boardID}`);
            const data_db: Data = {
                columns: { ...response.data?.[0].columns },
                tasks: [...response.data?.[0].tasks],
            };
            const newData = replaceStatusIdByStatusName(data_db);
            setData(newData);
            setNameBoard(response.data?.[0].name); 
        } catch (error) {
            console.error(error);
        }
    }

    function replaceStatusIdByStatusName(data: Data): Data {
        const newData: Data = {
            columns: { ...data.columns },
            tasks: data.tasks.map((task) => ({
                ...task,
                status: data.columns[task.status]?.title || task.status,
            })),
        };
        return newData;
    }

    return (
        <div style={{ background: "#9933ff" }}>
            <NavbarUser />
            <div className="flex">
                <Sidebar />
                <div className="table">
                    <Heading title={nameBoard}/>
                    <BoardTable data={data} refresh={fetchData}/>
                </div>
            </div>
        </div>
    );
}
