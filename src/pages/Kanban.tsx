import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarUser from "../components/NavbarUser";
import Heading from "../components/Heading";
import Board from "../components/kanban/Board";
import Sidebar from "../components/Sidebar";

import "../styles/index.css";
import "../styles/kanban.css";

interface Column {
    id: string;
    items: Task[];
}

interface Task {
    id: string;
    task: string;
    Due_Date: string;
    status: string;
}

interface Data {
    columns: {
        [key: string]: Column;
    };
    tasks: Task[];
}

interface NewData {
    columns: {
        [key: string]: Column;
    }
}

export default function Kanban() {
    const [data, setData] = useState<NewData>({
        columns: {}
    });

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await axios.get('http://localhost:3001/boards?user_id=1');
            const newData = addTaskToColumns(response.data?.[0]);
            setData(newData);
            // console.log(newData)
        } catch (error) {
            console.error(error);
        }
    }

    function addTaskToColumns(data: Data): NewData {
        const newData: NewData = {
            columns: { ...data.columns },
        };

        for (const task of data.tasks) {
            const matchingColumnKey = Object.keys(newData.columns).find(
                (columnKey) => columnKey === task.status
            );
            if (matchingColumnKey) {
                const matchingColumn = newData.columns[matchingColumnKey];
                matchingColumn.items = matchingColumn.items || [];
                matchingColumn.items.push(task);
            }
        }

        // Add empty arrays to columns with no matching tasks
        Object.values(newData.columns).forEach((column) => {
            if (!column.items || column.items.length === 0) {
                column.items = [];
            }
        });
        return newData;
    }
    

    return (
        <div style={{ "background": "url(https://images.unsplash.com/photo-1688367785310-c8c013548288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80)" }}
        >
            <NavbarUser />
            <div className="flex">
                <Sidebar />
                <div className="kanban">
                    <Heading />
                    <Board data={data} refresh={fetchData}/>
                </div>
            </div>
        </div>
    )
}