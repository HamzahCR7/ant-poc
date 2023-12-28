import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
// import './home.css';
const Header = () => {  
    const navigate = useNavigate();
    useEffect(() => {
        if (!sessionStorage?.getItem('useremail')) {
            navigate("/login");
        };
    })

    const findInitials = (useremail: string | null) => {
        const pos = useremail?.indexOf('@');
        const username = useremail?.split('').splice(0,pos).join('');
        return username?.toUpperCase();
      };
    
      const username = sessionStorage.getItem("useremail")
      ? findInitials(sessionStorage.getItem("useremail"))
      : null;
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">
                    Home
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/my-profile">Careers</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/employee-details">Employee Details</Link>
                        </li>
                    </ul>
           
                </div>
                <ul className="navbar-nav ml-auto">
            <li className="nav-item">
            {username &&  <p className="nav-link">
                Hi {username}
              </p>
}
            </li>
          </ul>
            </nav>
        </>
    );
};

export default Header;
