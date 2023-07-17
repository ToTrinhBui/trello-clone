import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Dialog from "@mui/material/Dialog";

interface AddTaskProps {
    statusID: string,
    refresh: Function
}

const AddTask : React.FC<AddTaskProps> = ({ statusID, refresh }) => {
    const { boardID } = useParams<{ boardID?: string }>();
    const [Task, setTask] = useState<string>('');
    const [Due_Date, setDue_Date] = useState<string>('');
    const [open, setOpen] = useState(false);

    const handleClickToOpen = () => {
        setOpen(true);
    };

    const handleToClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addNewTask(Task, Due_Date);
        setOpen(false);
        refresh();
    };

    const addNewTask = async (taskName: string, DueDate: string) => {
        try {
            const response = await axios.post(`http://localhost:3001/task/add`, {
                board_id: boardID,
                Task: taskName,
                Due_Date: DueDate,
                status: statusID,
            });
            const updatedTask = response.data;
            console.log('Task updated successfully:', updatedTask);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    return (
        <div className='add-task btn' onClick={handleClickToOpen} >
            <div className='add-task-inner'>
                <span>+</span>
                <p>Thêm thẻ</p>
            </div>
            <Dialog onClose={handleToClose} open={open} className='dialog'>
                <div className='dialog-container'>
                    <h4>Thêm thẻ</h4>
                    <form onSubmit={handleSubmit}>
                        <div className='input-part'>
                            <label>Tên thẻ:</label>
                            <input
                                placeholder='Nhập tiêu đề cho thẻ này'
                                value={Task}
                                onChange={(e) => setTask(e.target.value)}
                            />
                        </div>
                        <div className='input-part'>
                            <label>Ngày đến hạn:</label>
                            <input
                                type="date"
                                value={Due_Date}
                                onChange={(e) => setDue_Date(e.target.value)}
                            />
                        </div>
                        <div className='submit'>
                            <button type='submit'>Thêm thẻ</button>
                            <div className='close btn' onClick={handleToClose}>
                                <svg
                                    height="20px"
                                    style={{ fill: 'rgb(105, 105, 105)' }}
                                    id="Layer_1"
                                    version="1.1"
                                    viewBox="0 0 512 512"
                                    xmlSpace="preserve"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                >
                                    <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                                </svg>
                            </div>
                        </div>
                    </form>
                </div>
            </Dialog >
        </div >

    )
}

export default AddTask;
