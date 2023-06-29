import React from 'react';
import "../Styles/Googlelogin.css"
import { GoogleLogin } from 'react-google-login';

import { useNavigate } from 'react-router-dom';
const clientId = '562888064619-rmimiu4cssdkot3mhf6um9ajhgupuc1a.apps.googleusercontent.com';



const Googlelogin = () => {

    const navigate = useNavigate();

    const handleLoginSuccess = (response) => {
        // Handle successful login
        navigate.push('/')
        console.log("bhul", response);
        // Perform actions like storing user information or redirecting to authenticated pages
    };

    const handleLoginFailure = (error) => {
        // Handle login failure
        console.error(error);
    };



    return (
        <div>
            <div style={{ marginTop: "17px", fontWeight: "bold" }}>

                <GoogleLogin
                    clientId={clientId}
                    buttonText="Login with Google"
                    onSuccess={handleLoginSuccess}
                    onFailure={handleLoginFailure}
                    cookiePolicy="single_host_origin"
                />
            </div>
        </div>
    )
}

export default Googlelogin