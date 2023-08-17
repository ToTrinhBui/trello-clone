import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin, { RenderProps } from 'react-facebook-login/dist/facebook-login-render-props';
import { useForm } from "react-hook-form";
import axios from "axios";

import '../styles/index.css';
import '../styles/login.css';

type FormValues = {
    user: {
        email: string,
        password: string,
    }
}
export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    console.log(errors)

    const navigate = useNavigate();

    const [error, setError] = useState<string>();

    const onSubmit = async (data: FormValues) => {
        try {
            await axios.post('http://localhost:3001/users',
                {
                    user: data.user,
                    accessToken: ""
                }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            navigate(`/login`);
        } catch (error) {
            console.error('Error during register:', error);
            setError('Failed to register')
        }
    };

    const responseFacebook = (response: any) => {
        // Handle the response here
        console.log(response);
    };

    const loginGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                if (tokenResponse.access_token) {
                    const userInfoResponse = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.access_token}`,
                            Accept: 'application/json'
                        }
                    });
                    if (userInfoResponse.ok) {
                        const userData = await userInfoResponse.json();
                        console.log(userData);
                        // Handle the retrieved user information as needed
                        navigate('/');
                    } else {
                        console.log('Error retrieving user info:', userInfoResponse.statusText);
                    }
                }
            } catch (error) {
                console.log('Error:', error);
            }
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    return (
        <div className="login">
            <div>
                <img className="trello-logo" alt="Trello-logo" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg" />
            </div>
            <div className="login-inner">
                <div className="account-form">
                    <h1>Đăng ký vào Trello</h1>
                    <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
                        <input required placeholder="Nhập email" type="text" {...register("user.email")} />
                        <input required placeholder="Nhập mật khẩu" type="password" {...register("user.password")} />
                        <button className="btn btn-account" type="submit">Tiếp tục</button>
                    </form>
                    {error && <div className="error">{error}</div>}
                    <div className="login-method-separator">HOẶC</div>

                    <div className="oauth-button btn" onClick={() => loginGoogle()}>
                        <img alt="google-icon" src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/8215f6659adc202403198fef903a447e/sign-in-with-google.svg" />
                        <span className="label">Tiếp tục với Google</span>
                    </div>
                    <FacebookLogin
                        appId="1279814009407610"
                        fields="name,email,picture"
                        // autoLoad
                        callback={responseFacebook}
                        render={(renderProps: RenderProps) => (
                            <div className="oauth-button btn" onClick={renderProps.onClick}>
                                <svg style={{ "color": "#0052cc" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" fill="blue"></path>
                                </svg>
                                <span className="label">Tiếp tục với Facebook</span>
                            </div>
                        )}
                    />
                    <div className="bottom-form-link">
                        <ul>
                            <li style={{ 'listStyle': 'none' }}>Không thể đăng ký?</li>
                            <Link to='/login'><li>Đăng nhập tài khoản</li></Link>
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