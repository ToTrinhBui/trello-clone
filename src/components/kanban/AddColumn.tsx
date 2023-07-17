import React from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface AddColumnProps {
    refresh: Function
}
const AddColumn: React.FC<AddColumnProps> = ({ refresh }) => {
    const { boardID } = useParams<{ boardID?: string }>();

    const handleSubmit = (event: React.MouseEvent) => {
        event.preventDefault();
        addNewColumn();
        refresh();
    };

    const addNewColumn = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/status/add`, {
                board_id: boardID,
            });
            console.log('Column added successfully:', response.data);
        } catch (error) {
            console.error('Error adding column:', error);
        }
    }
    return (
        <div className="add-column btn" onClick={handleSubmit}>
            <div className="add-column-inner">
                <span>+</span>
                <p>Thêm danh sách khác</p>
            </div>
        </div>
    )
}

export default AddColumn;