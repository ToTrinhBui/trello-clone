import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { selectUser } from "../redux/userSlice";

export default function Navbar() {
    const user = useSelector(selectUser).user;
    const login = useSelector(selectUser).isLoggedIn;
    const [user_redux, setUserRedux] = useState(user);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        setIsLoggedIn(login);
        setUserRedux(user);
    }, [user, login])

    return (
        <div className="navbar">
            <img className="logo" alt="Trello-logo" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg" />
            <ul>
                <li>Features</li>
                <li>Solutions</li>
                <li>Plans</li>
                <li>Pricing</li>
                <li>Resources</li>
            </ul>
            <div className="link-account">
                {isLoggedIn ? (
                    <>
                        <div className="link-to-login">Hello!</div>
                        <Link to={`/user/${user.id}/boards`} className="link-to-sign-up">Go to your Boards</Link>
                    </>
                )
                    : (
                        <>
                            <Link to='/login'><div className="link-to-login">Log in</div></Link>
                            <Link to='/register' className="link-to-sign-up">Get Trello for free</Link>
                        </>
                    )}
            </div>
        </div>
    )
}