import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Board {
    id: string,
    name: string,
}
interface BoardsProps {
    props: Board[];
    refresh: Function
}

const Boards: React.FC<BoardsProps> = ({ props, refresh }) => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const [dataReceived, setDataReceived] = useState<Board[]>();

    useEffect(() => {
        setDataReceived(props);
    }, [props]);

    const handleCardClick = (item_id: string) => () => {
        navigate(`/user/${id}/kanban/${item_id}`);
    };

    const addNewBoard = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/boards`, {
                user_id: id,
                name: 'New board',
                columns: {},
                tasks: []
            });
            const updatedTask = response.data;
            console.log('Task updated successfully:', updatedTask);
            refresh();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    return (
        <div className="boards">
            <h2>Bảng</h2>
            <div className="list-cards">
                <div className="card btn add-board" onClick={addNewBoard}>
                    <p>Tạo bảng mới</p>
                </div>
                {dataReceived?.reverse().map((item: Board) => (
                    <div key={item.id} className="card btn" onClick={handleCardClick(item.id)}
                        style={{ "background": "url(https://images.unsplash.com/photo-1688367785310-c8c013548288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80)" }}>
                        <h4>{item.name}</h4>
                    </div>
                ))}

            </div>
        </div>
    )

}

export default Boards;