import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Avatar from 'react-avatar';
import { Member } from '../interface';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import ReactDOM from 'react-dom';
import { useTheme } from '../theme/ThemeProvider';
import { URL_API } from "../api";

interface CardProps {
    close: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const ListMember: React.FC<CardProps> = ({ close }) => {
    const [members, setMembers] = useState<Member[]>();
    const user_redux = useSelector(selectUser).user;

    const { theme } = useTheme();

    useEffect(() => {
        getListUsers();
    }, [])

    const getListUsers = async () => {
        try {
            const response = await axios.get(`${URL_API}/users`);
            const { data: userList } = response;

            const filteredList = userList.filter((user: any) => user.id !== user_redux.id);

            const listMember: Member[] = [];
            filteredList.forEach((user: any) => {
                const mem = {
                    user_id: user.id,
                    email: user.user.email,
                };
                listMember.push(mem);
            });

            setMembers(listMember);
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    return ReactDOM.createPortal(
        <div className='overlay-list-member' id={theme}>
            <div className='card-box' style={{ width: '225px', maxHeight: '300px', overflowX: 'auto' }}>
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
                        <div className="avatar" style={{ height: '30px', width: '30px' }}>
                            <svg fill="#61ae74" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="796 796 200 200" enableBackground="new 796 796 200 200" stroke="#61ae74"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M896,796c-55.14,0-99.999,44.86-99.999,100c0,55.141,44.859,100,99.999,100c55.141,0,99.999-44.859,99.999-100 C995.999,840.86,951.141,796,896,796z M896.639,827.425c20.538,0,37.189,19.66,37.189,43.921c0,24.257-16.651,43.924-37.189,43.924 s-37.187-19.667-37.187-43.924C859.452,847.085,876.101,827.425,896.639,827.425z M896,983.86 c-24.692,0-47.038-10.239-63.016-26.695c-2.266-2.335-2.984-5.775-1.84-8.82c5.47-14.556,15.718-26.762,28.817-34.761 c2.828-1.728,6.449-1.393,8.91,0.828c7.706,6.958,17.316,11.114,27.767,11.114c10.249,0,19.69-4.001,27.318-10.719 c2.488-2.191,6.128-2.479,8.932-0.711c12.697,8.004,22.618,20.005,27.967,34.253c1.144,3.047,0.425,6.482-1.842,8.817 C943.037,973.621,920.691,983.86,896,983.86z"></path> </g></svg>
                        </div>
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