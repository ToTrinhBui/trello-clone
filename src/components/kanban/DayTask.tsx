import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CardProps {
    trigger: boolean,
    close: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    due_date: string,
    refresh: Function;
}

const DayTask: React.FC<CardProps> = ({ trigger, close, due_date , refresh}) => {
    const [value, onChange] = useState<Value>(new Date(due_date));

    if (trigger) {
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
                    <div className='card-content'>
                        <Calendar onChange={onChange} value={value} />
                        <h5>Ngày đến hạn</h5>
                        <input
                            type='text'
                            value={value?.toLocaleString('en-GB', { dateStyle: 'short' })}
                            readOnly
                        />
                    </div>
                    <div className='card-add'>
                        <button>Thêm</button>
                    </div>
                </div>
            </div>
        )
    }
    return <></>;
}

export default DayTask;