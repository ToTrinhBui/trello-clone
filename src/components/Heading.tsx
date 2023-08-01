import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";

import AddMember from './AddMember';
import { Member } from '../interface';
interface HeadingProps{
    members: Member[],
    fetchData: Function;
    nameBoard: string;
    ownerBoard: string;
}

const Heading: React.FC<HeadingProps> = ({ members, fetchData, nameBoard, ownerBoard }) =>{
    const { boardID } = useParams<{ boardID?: string }>();
    const user_redux = useSelector(selectUser).user;

    const [name, setName] = useState<string>('Name board');
    const [owner, setOwner] = useState<string>(user_redux.id);
    const [memberFilter, setMemberFilter] = useState<Member[]>([]);


    useEffect(() => {
        setMemberFilter(members.filter((member: Member) => member.user_id !== user_redux.id.toString()));
        setName(nameBoard);
        setOwner(ownerBoard);
    }, [members]);

    return (
        <div className='heading'>
            <div className='left'>
                <h1>{name}</h1>
                <Link to={`/board/kanban/${boardID}`}>
                    <button className='change-mode'>
                        <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2 7V15C2 16.1046 2.89543 17 4 17H6C7.10457 17 8 16.1046 8 15V7C8 5.89543 7.10457 5 6 5H4C2.89543 5 2 5.89543 2 7ZM4 7V15H6V7L4 7Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M9 7V13C9 14.1046 9.89543 15 11 15H13C14.1046 15 15 14.1046 15 13V7C15 5.89543 14.1046 5 13 5H11C9.89543 5 9 5.89543 9 7ZM11 7V13H13V7L11 7Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M16 17V7C16 5.89543 16.8954 5 18 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H18C16.8954 19 16 18.1046 16 17ZM18 17V7L20 7V17H18Z"></path></svg>
                        <p>Kanban</p>
                    </button>
                </Link>
                <Link to={`/board/table/${boardID}`}>
                    <button className='change-mode'>
                        <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 14 10" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M1.66683 9.66665C0.93045 9.66665 0.333496 9.06969 0.333496 8.33331V1.66665C0.333496 0.930267 0.93045 0.333313 1.66683 0.333313H12.3335C13.0699 0.333313 13.6668 0.930267 13.6668 1.66665V8.33331C13.6668 9.06969 13.0699 9.66665 12.3335 9.66665H1.66683ZM12.3335 5.66665V4.33331H5.66683V5.66665H12.3335ZM12.3335 2.99998V1.66665H5.66683V2.99998H12.3335ZM12.3335 6.99998V8.33331H5.66683V6.99998H12.3335ZM1.66683 4.33331V5.66665H4.3335V4.33331H1.66683ZM1.66683 6.99998V8.33331H4.3335V6.99998H1.66683ZM1.66683 2.99998V1.66665H4.3335V2.99998H1.66683Z" ></path></svg>
                        <p>Table</p>
                    </button>
                </Link>
            </div>
            <div className='right'>
                <div className='share'>
                    <div className='members'>
                        {memberFilter.map((member, index) => (
                            <div key={index} className='member-outer'>
                                <p style={{color: '#fff'}}>{member.email.charAt(0).toUpperCase()}</p>
                                <div className='member' style={{ background: member.color }}></div>
                            </div>
                        ))}
                        <div className="owner">
                            <img alt='avatar' src='https://trello-members.s3.amazonaws.com/64a23b00afb58bcc432fbd06/6e51afadf71d3d08f7f2dc8577e9d848/30.png' />
                        </div>
                    </div>
                    <AddMember members={memberFilter} owner={owner} refresh={fetchData}/>
                </div>
            </div>
        </div >
    )
}

export default Heading;