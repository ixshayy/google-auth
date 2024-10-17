import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios"

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const API_GOOGLE_AUTH_URL = "http://localhost:3000/"


const Login: React.FC = () => {

    const [loginData, setLoginData] = useState(
        localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")!) : null
    );

    // const handelLogin = (googleData: string | undefined) => {
    //     if (!googleData) {
    //         console.error("Login failed: No credential received");
    //         return;
    //     }

    //     try {
    //         const userData = jwtDecode(googleData);
    //         console.log("userData====>", userData);
    //     } catch (error) {
    //         console.error("Error decoding JWT:", error);
    //     }
    // };

    const handleLogin = async (googleData: string | undefined) => {
        //const userData = jwtDecode(googleData);
        let userData = JSON.stringify({ token: googleData, });

        console.log("google data", googleData)
        try{
            const response =  await axios.post(API_GOOGLE_AUTH_URL, userData, {
                headers: { "Content-Type": "application/json" },
            });
            setLoginData(response.data);
            localStorage.setItem("loginData", JSON.stringify(response.data));

        }catch(err){
            console.log("error", err);
        }

    };

    console.log("client id", CLIENT_ID)
    return (<div>
        <button type="button"><GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    handleLogin(credentialResponse.credential);
                }}
                onError={() => {
                    console.log("Login Error")
                }}
            />
        </GoogleOAuthProvider></button>
    </div>)
}

export default Login;
