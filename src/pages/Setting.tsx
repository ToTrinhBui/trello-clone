import React from 'react'
import NavbarUser from "../components/NavbarUser";
import Sidebar from "../components/Sidebar";
import Title from "../components/dashboard/Title";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import NotFound from "./NotFound";
import { useTheme } from "../theme/ThemeProvider";

import '../styles/index.css';
import '../styles/dashboard.css';
import '../styles/setting.css';

const Setting = () => {
    const { theme } = useTheme();

    const user_redux = useSelector(selectUser).user;

    if (user_redux) {
        return (
            <>
                <div id={theme}>
                    <NavbarUser />
                    <div className="flex">
                        <Sidebar />
                        <div className="dashboard">
                            <div className="dashboard-inner">
                                <Title />
                                <div className='setting'>
                                    <div className='setting-inner'>
                                        <h2>Các cài đặt không gian làm việc</h2>
                                        <h3>Khả năng hiển thị trong Không gian làm việc</h3>
                                        <div className='setting-content'>
                                            <div>
                                                <svg width="17" height="17" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M5 11C5 9.89543 5.89543 9 7 9H8H10H14H16H17C18.1046 9 19 9.89543 19 11V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V11ZM10 11H14H16H17V19H7V11H8H10ZM14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15Z" fill="#E34935"></path><path fillRule="evenodd" clipRule="evenodd" d="M10.3817 5.69846C10.0982 6.10344 10 6.63103 10 7V9H8V7C8 6.36897 8.15175 5.39656 8.74327 4.55154C9.37523 3.64874 10.4367 3 12 3C13.5633 3 14.6248 3.64874 15.2567 4.55154C15.8482 5.39656 16 6.36897 16 7V9H14V7C14 6.63103 13.9018 6.10344 13.6183 5.69846C13.3752 5.35126 12.9367 5 12 5C11.0633 5 10.6248 5.35126 10.3817 5.69846Z" fill="#E34935"></path></svg>
                                            </div>
                                            <p>Riêng tư - Đây là không gian làm việc riêng tư. Chỉ có những người trong Không gian làm việc có thể truy cập hoặc nhìn thấy Không gian làm việc.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return <NotFound />;
}

export default Setting