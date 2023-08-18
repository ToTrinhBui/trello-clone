import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Task } from '../../interface';
import { URL_API } from '../../api';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CardProps {
    trigger: boolean,
    close: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    item: Task,
}

const DayTask: React.FC<CardProps> = ({ trigger, close, item }) => {
    const { boardID } = useParams<{ boardID?: string }>();
    const [value, onChange] = useState<Value>(item.Due_Date || new Date());
    const defaultDueDate = new Date(item.Due_Date).toLocaleDateString("en-GB");
    const [input, setInput] = useState<string>(defaultDueDate);
    const [isOpen, setIsOpen] = useState<boolean>(trigger);

    useEffect(() => {
        if (value) {
            if (value instanceof Date) {
                setInput(value.toLocaleDateString("en-GB"));
            }
        }
        setIsOpen(trigger);
    }, [value, trigger]);

    const editTask = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.put(`${URL_API}/task/edit`, {
                board_id: boardID,
                task: {
                    id: item.id,
                    Task: item.Task,
                    Due_Date: value,
                    status: item.status,
                    members_task: item.members_task,
                    jobs: item.jobs,
                    description: item.description,
                    labels: item.labels,
                }
            })
            const editedTask = response.data;
            console.log('Task updated successfully:', editedTask);
            setIsOpen(false);
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    if (isOpen) {
        return (
            <div className='overlay' style={{ top: '15%' }}>
                <div className='card-box'>
                    <div className='title-card'>
                        <h4 style={{ width: '90%', textAlign: 'center' }}>Ngày</h4>
                        <div className='close-card btn' onClick={(event) => close(event)}>
                            <svg
                                height="12px"
                                style={{ fill: '#868686' }}
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
                    <form onSubmit={editTask}>
                        <div className='card-content'>
                            <Calendar onChange={onChange} value={value} />
                            <h5>Ngày đến hạn</h5>
                            <input
                                type='text'
                                value={input}
                                readOnly
                            />
                        </div>
                        <div className='card-add'>
                            <button type='submit'>Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    return <></>;
}

export default DayTask;