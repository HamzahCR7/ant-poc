import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import MyProfile from "../my-profile/myProfile";
import './home.css';
const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!sessionStorage?.getItem('useremail')) {
            navigate("/login");
        };
    })


    return (
        <>
            <div className="sample-home">
                <h1>Welcome To Home Page</h1>
            </div>
        </>
    );
};

export default Home;
