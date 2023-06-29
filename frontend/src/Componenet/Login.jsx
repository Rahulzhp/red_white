import React, { useState } from 'react';
import '../Styles/Login.css'; // import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Box, Image, useToast } from '@chakra-ui/react';
import Googlelogin from "./Googlelogin"
import axios from "axios"
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [invalid, setInvalid] = useState(false)
    const [disable, setdisable] = useState(false)
    const payload = {
        email,
        password
    }

    const onHendell = (e) => {
        if (email === '') {
            setEmailError(true);
        } else {
            setEmailError(false);
        }

        if (password === '') {
            setPasswordError(true);
        } else {
            setPasswordError(false);
            setdisable(true)
            axios.post("http://localhost:8080/users/login", payload)
                .then((res) => {
                    console.log(res)
                    if (res.data.token) {
                        localStorage.setItem("token", res.data.token);
                        toast({
                            title: 'Welcome Back',
                            description: "Successfully Logged In",
                            status: "success",
                            position: "top",
                            duration: 3000,
                            isClosable: true,
                        })
                        setTimeout(() => {
                            setInvalid(false)
                            navigate("/")
                            setdisable(false)
                        })


                    } else {
                        toast({
                            title: 'Invalid Credential',
                            description: "Not allow to home page",
                            status: 'error',
                            duration: 7000,
                            isClosable: true,
                        })
                        setInvalid(true)
                        setdisable(false)
                        setTimeout(() => {
                            setInvalid(false)
                        }, 1000)
                    }
                })
                .catch(err => setdisable(false))

        }
        e.preventDefault()


    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="container">
                <div className="logo-container">
                    <h4>Best Content App</h4>
                </div>
                <div className="form-container">
                    <form onSubmit={onHendell}>
                        <h3>Login to get started</h3>
                        <span style={{ color: emailError ? "red" : '' }}>Email</span>
                        <div className="Username-input-container">
                            <input
                                type="text"
                                placeholder="Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={emailError ? 'error' : ''}

                            />
                        </div>
                        {emailError && <span className="error-text">Email is required</span>}
                        <span style={{ color: passwordError ? "red" : '' }}>Password</span>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={passwordError ? 'error' : ''}

                            />
                            <span
                                className={`password-toggle ${showPassword ? 'visible' : ''}`}
                                onClick={toggleShowPassword}
                            >
                                {showPassword ? (
                                    <FontAwesomeIcon icon={faEye} />
                                ) : (
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                )}
                            </span>
                        </div>
                        {passwordError && <span className="error-text">Password is required</span>}
                        <div className="forgot-password">
                            <a href="gmail.com" className="red-link">
                                Forgot Password?
                            </a>
                        </div>
                        <div>
                            {
                                invalid ? <p style={{ textAlign: "start", color: "red" }}>Invalid Credential</p> : ""
                            }
                        </div>
                        <button className='btn' type="submit" disabled={disable} style={{ backgroundColor: disable ? "gray" : "rgb(4, 115, 215)" }}>Login</button>
                        <Googlelogin />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;