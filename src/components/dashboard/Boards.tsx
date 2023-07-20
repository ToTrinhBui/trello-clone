import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Boards = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    
    const handleCardClick = () => {
        navigate(`/user/${id}/kanban/1`);
    };

    return (
        <div className="boards">
            <h2>Bảng</h2>
            <div className="list-cards">
                <div className="card btn add-board">
                    <p>Tạo bảng mới</p>
                </div>
                <div className="card btn" onClick={handleCardClick}
                    style={{ "background": "url(https://images.unsplash.com/photo-1688367785310-c8c013548288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80)" }}>
                    <h4>Name project</h4>
                </div>
            </div>
        </div>
    )

}

export default Boards;