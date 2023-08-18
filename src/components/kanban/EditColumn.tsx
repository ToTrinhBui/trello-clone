import React from 'react'
import axios from 'axios';
import MoreOption from '../MoreOption';
import { useParams } from 'react-router-dom';
import { URL_API } from '../../api';
interface CardProps {
    columnId: string,
    title: string
}
const EditColumn: React.FC<CardProps> = ({ columnId, title }) => {
    const { boardID } = useParams<{ boardID?: string }>();

    const deleteColumn = async () => {
        try {
            const response = await axios.delete(`${URL_API}/status/delete`, {
                data: {
                    board_id: boardID,
                    columnId: columnId,
                }
            });
            const responseData = response.data;
            console.log('deleted successfully:', responseData);
        } catch (error) {
            console.error('Error deleting:', error);
        }
    }

    const renameColumn = async (name: string) => {
        try {
            const response = await axios.put(`${URL_API}/status/rename`, {
                board_id: boardID,
                columnId: columnId,
                name: name
            });
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