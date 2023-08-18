import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from "react-redux";
import { logout, selectUser } from "../redux/userSlice";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTheme } from '../theme/ThemeProvider';

interface CardProps {
    trigger: boolean
}
const Logout: React.FC<CardProps> = ({ trigger }) => {
    const user_redux = useSelector(selectUser).user;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { theme } = useTheme();

    const handleLogout = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        dispatch(logout());
        navigate('/login');
    };

    if (trigger) {
        return ReactDOM.createPortal(
            <div className='overlay-logout' id={theme}>
                <div className='card-logout'>
                    <div className='title-card'>
                        <h5>TÀI KHOẢN</h5>
                        <div className='user'>
                            <div className="avatar"></div>
                            <div>{user_redux.email}</div>
                        </div>
                    </div>
                    <div className='logout btn' onClick={(event) => handleLogout(event)}>Đăng xuất</div>
                </div>
            </div>,
            document.getElementById('modal-root') as Element
        )
    };
    return <></>;
}

export default Logout;