import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import Theme from "./Theme";

export default function NavbarUser({ style = {}, ...props }) {
    const user_redux = useSelector(selectUser).user;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [input, setInput] = useState<string>(window.location.search.slice(1));
    const [themeOpen, setThemeOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const toggle = () => {
        setIsOpen((prev) => !prev);
        setThemeOpen(false);
    };

    const toggleTheme = () => {
        setThemeOpen((prev) => !prev);
        setIsOpen(false);
    }

    const searchForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation()
        navigate(`/search?${input}`);
    }

    return (
        <div className="navbar-user" style={style} {...props}>
            <div className="left">
                <Link to={`/user/${user_redux.id}/boards`}>
                    <div className="logo-outer">
                        <div className="logo-user"></div>
                    </div>
                </Link>
                <div className="option">
                    <Link to={`/user/${user_redux.id}/boards`}>
                        <div className="space">
                            <span>Không gian làm việc</span>
                            <svg className="svg-icon" width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" fill="currentColor"></path></svg>
                        </div>
                    </Link>
                    <div className="recently">
                        <span>Gần đây</span>
                        <svg className="svg-icon" width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" fill="currentColor"></path></svg>
                    </div>
                    <div className="more">
                        <span>Thêm</span>
                        <svg className="svg-icon" width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" fill="currentColor"></path></svg>
                    </div>
                </div>
                <button>Tạo mới</button>
            </div>
            <div className="right">
                <form onSubmit={searchForm}>
                    <div className="search">
                        <div>
                            <svg className="search-icon" width="24" height="24" viewBox="0 0 24 24" role="presentation"><path fillRule="evenodd" clipRule="evenodd" d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"></path></svg>
                        </div>
                        <input placeholder="Tìm kiếm" value={input} onChange={(e) => setInput(e.target.value)} />
                    </div>
                </form>
                <div className="container">
                    <svg className="svg-icon" width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M6.586 17.829a2 2 0 002.829 0L6.585 15a2 2 0 000 2.829zm4.798-12.351A5.036 5.036 0 0114.954 4c.972 0 1.945.28 2.788.839.02-.026.043-.05.066-.074a1.01 1.01 0 111.354 1.494 5.048 5.048 0 01-.64 6.356l-.725.725c-.782.783-1.813 2.21-2.312 3.207l-1.509 3.016c-.249.5-.773.584-1.171.187l-8.556-8.555c-.397-.397-.308-.924.187-1.172l3.017-1.508c.989-.494 2.42-1.526 3.206-2.312l.725-.725zm2.739 9.63c.517-.975 1.568-2.396 2.354-3.182l.725-.726a3.048 3.048 0 00.387-3.835c-.19-.286-.718-.766-.859-.86A3.043 3.043 0 0015.047 6a3.04 3.04 0 00-2.156.892l-.95.951c-.784.785-2.219 1.82-3.201 2.311l-1.74.87 6.07 6.069 1.053-1.985z" ></path></svg>
                    <div className="circle"></div>
                </div>
                <div className="container">
                    <svg className="svg-icon" width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47667 6.47667 2 12 2C17.5233 2 22 6.47667 22 12C22 17.5233 17.5233 22 12 22C6.47667 22 2 17.5233 2 12ZM4 12C4 16.4188 7.58124 20 12 20C16.4188 20 20 16.4188 20 12C20 7.58124 16.4188 4 12 4C7.58124 4 4 7.58124 4 12ZM8 10C7.99999 7.48383 10.3214 5.51108 12.9389 6.10713C14.3829 6.43513 15.5569 7.60513 15.8899 9.04813C16.3809 11.1771 15.1719 13.0911 13.3589 13.7471C13.1549 13.8201 13.0099 14.0021 13.0099 14.2191V14.0001C13.0099 14.5521 12.5629 15.0001 12.0099 15.0001C11.4579 15.0001 11.0099 14.5521 11.0099 14.0001V12.9871C11.0179 12.4411 11.4599 12.0001 11.9999 12.0001C13.1029 12.0001 13.9999 11.1021 13.9999 10.0001C13.9999 8.89713 13.1029 8.00013 11.9999 8.00013C10.8959 8.00013 9.99935 8.92313 10.0004 10.0271C9.98522 10.5666 9.54291 11 9 11C8.47773 11 8.04856 10.599 8.00385 10.0882C8.00385 10.0882 8 10.0297 8 10ZM12 18C11.448 18 11 17.552 11 17C11 16.448 11.448 16 12 16C12.552 16 13 16.448 13 17C13 17.552 12.552 18 12 18Z" ></path></svg>
                    <div className="circle"></div>
                </div>
                <div className="container btn" onClick={toggleTheme}>
                    <svg className="svg-icon" width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 20V4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"></path></svg>
                    <div className="circle"></div>
                </div>
                <Theme trigger={themeOpen} />
                <div className="container btn" onClick={toggle}>
                    <div className="avatar"></div>
                    <div className="circle"></div>
                </div>
                <Logout trigger={isOpen} />
            </div>
        </div>
    )
}