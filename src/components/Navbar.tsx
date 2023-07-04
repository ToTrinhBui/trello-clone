import React from "react";
import { Link } from 'react-router-dom';

export default function Navbar() {
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
                <Link to='/login'><div className="link-to-login">Log in</div></Link>
                <div className="link-to-sign-up">Get Trello for free</div>
            </div>
        </div>
    )
}