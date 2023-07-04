import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import '../styles/index.css'
import '../styles/login.css';

export default function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch("http://localhost:3001/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error("Failed to login");
            } else {
              navigate(`/`);
            }
          })
          .catch(error => {
            console.error(error);
          });
      };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    return (
        <div className="login">
            <div>
                <img className="trello-logo" alt="Trello-logo" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg" />
            </div>
            <div className="login-inner">
                <div className="account-form">
                    <h1>Đăng nhập vào Trello</h1>
                    <form id="login-form" onSubmit={handleSubmit}>
                        <input placeholder="Nhập email" type="text" value={user.email}
                            onChange={handleChange} name="email" />
                        <input placeholder="Nhập mật khẩu" type="password" value={user.password} 
                            onChange={handleChange} name="password" />
                        <button className="btn btn-account" type="submit">Tiếp tục</button>
                    </form>
                    <div className="login-method-separator">HOẶC</div>
                    <Link to=''>
                        <div className="oauth-button">
                            <img alt="google-icon" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/8215f6659adc202403198fef903a447e/sign-in-with-google.svg" />
                            <span className="label">Tiếp tục với Google</span>
                        </div>
                    </Link>
                    <div className="bottom-form-link">
                        <ul>
                            <li style={{ 'listStyle': 'none' }}>Không thể đăng nhập?</li>
                            <li>Đăng ký tài khoản</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="background">
                <img className="background-img" alt="left" src={require('../images/left.png')} />
                <img className="background-img" alt="right" src={require('../images/right.png')} />
            </div>
        </div>
    )
}