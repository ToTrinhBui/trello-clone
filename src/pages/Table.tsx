import React from "react";
import NavbarUser from "../components/NavbarUser";
import Heading from "../components/kanban/Heading";
import Kanban from "../components/kanban/Kanban";
import Sidebar from "../components/Sidebar";

import "../styles/index.css";
import "../styles/table.css";

export default function Table() {
    return (
        <div style={{ "background": "url(https://images.unsplash.com/photo-1688367785310-c8c013548288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80)" }}
        >
            <NavbarUser />
            <div className="flex">
                <Sidebar />
                <div className="table">
                    <Heading />
                    <Kanban />
                </div>
            </div>
        </div>
    )
}