import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Avatar from 'react-avatar';
import { Member } from '../interface';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import ReactDOM from 'react-dom';

interface CardProps {
    close: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const ListMember: React.FC<CardProps> = ({ close }) => {
    const [members, setMembers] = useState<Member[]>();
    const user_redux = useSelector(selectUser).user;

    useEffect(() => {
        getListUsers();
    }, [])

    const getListUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users');
            const { data: userList } = response;

            const filteredList = userList.filter((user: any) => user.id !== user_redux.id);

            const listMember: Member[] = [];
            filteredList.forEach((user: any) => {
                const mem = {
                    user_id: user.id,
                    email: user.user.email,
                    color: user.user.color,
                };
                listMember.push(mem);
            });

            setMembers(listMember);
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    return ReactDOM.createPortal(
        <div className='overlay-list-member'>
            <div className='card-box' style={{width: '225px', maxHeight: '300px', overflowX: 'auto'}}>
                <div className='title-card'>
                    <h4 style={{ width: '90%', textAlign: 'center' }}>Thành viên của Trello</h4>
                    <div className='close-card btn' onClick={close}>
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
                    <div className='member-outer'>
                        <div className="avatar" style={{ height: '30px', width: '30px' }}></div>
                        <div>{user_redux.email}</div>
                    </div>
                    {members?.map((member, index) => (
                        <div className='members' key={index}>
                            <div className='member-outer'>
                                <Avatar name={member.email} size={'30'} round="40px" />
                                <p>{member.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>,
        document.getElementById('modal-root') as Element
    )
}

export default ListMember