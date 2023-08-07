import React from 'react'
import axios from 'axios';
import MoreOption from '../MoreOption';
import { useParams } from 'react-router-dom';
interface CardProps {
    columnId: string,
    title: string,
    refresh: Function
}
const EditColumn: React.FC<CardProps> = ({ columnId, refresh, title }) => {
    const { boardID } = useParams<{ boardID?: string }>();

    const deleteColumn = async () => {
        try {
            const response = await axios.delete(`http://localhost:3001/status/delete`, {
                data: {
                    board_id: boardID,
                    columnId: columnId,
                }
            });
            const responseData = response.data;
            console.log('deleted successfully:', responseData);
            refresh();
        } catch (error) {
            console.error('Error deleting:', error);
        }
    }    

    const renameColumn = async (name: string) => {
        try {
            const response = await axios.put(`http://localhost:3001/status/rename`, {
                board_id: boardID,
                columnId: columnId,
                name: name
            });
            refresh();
            const responseData = response.data;
            console.log('renamed successfully:', responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <MoreOption
                type={'Danh sách'}
                title={title}
                onDelete={deleteColumn}
                rename={renameColumn}
            />
        </div>
    )
}

export default EditColumn