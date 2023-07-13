import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarUser from "../components/NavbarUser";
import Heading from "../components/Heading";
import Sidebar from "../components/Sidebar";

import "../styles/index.css";
import "../styles/table.css";

// import { data } from "../components/kanban/KanbanData";

export default function Table() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        try {
            const response = await axios.get('http://localhost:3001/boards?user_id=1');
            setData(response.data?.[0].tasks);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={{ "background": "url(https://images.unsplash.com/photo-1688367785310-c8c013548288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80)" }}
        >
            <NavbarUser />
            <div className="flex">
                <Sidebar />
                <div className="table">
                    <Heading />
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Task</th>
                                <th>Due to</th>
                                <th>Task</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.task}</td>
                                    <td>
                                        {new Date(item.Due_Date).toLocaleDateString('en-us', {
                                            month: 'short',
                                            day: '2-digit',
                                        })}
                                    </td>
                                    <td>{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}