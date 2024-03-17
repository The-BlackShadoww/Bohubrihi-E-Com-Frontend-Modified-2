import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import { signOut, isAuthenticated, userInfo } from "../utils/auth";
import { Typography } from "@mui/material";
import { IoCartOutline } from "react-icons/io5";

const Menu = () => {
    const navigate = useNavigate();

    let navLinks = null;
    if (isAuthenticated()) {
        navLinks = [
            { name: "Home", href: "/" },
            { name: "Dashboard", href: `/${userInfo().role}/dashboard` },
            { name: <IoCartOutline size={22} />, href: "/cart" },
        ];
    } else {
        navLinks = [
            { name: "Home", href: "/" },
            { name: "Login", href: "/login" },
            { name: "Register", href: "/register" },
        ];
    }

    const navBar = navLinks.map((link) => {
        const navlinks = (
            <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) => {
                    return isActive
                        ? "text-base text-[#445955] font-semibold mx-4"
                        : "text-base text-[#121212] font-semibold mx-4";
                }}
            >
                {link.name}
            </NavLink>
        );

        return navlinks;
    });

    let logoutBtn = null;
    if (isAuthenticated()) {
        logoutBtn = (
            <button
                className="bg-[#445955] text-white py-2 px-3 rounded-md"
                onClick={() => {
                    signOut(() => {
                        navigate("/login");
                    });
                }}
            >
                Logout
            </button>
        );
    } else {
        logoutBtn = null;
    }

    return (
        <div className="flex py-5 justify-between mb-4">
            <Link to={"/"}>
                <h1 className="text-xl text-[#121212] font-bold ">ShopHub</h1>
            </Link>
            <nav className="flex justify-end items-center flex-grow-[1] ">
                {navBar} <span>{logoutBtn}</span>
            </nav>
        </div>
    );
};

export default Menu;

//! original one
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";
// import "./Menu.css";
// import { signOut, isAuthenticated, userInfo } from "../utils/auth";
// import { Typography } from "@mui/material";

// const Menu = () => {
//     const navigate = useNavigate();

//     let navLinks = null;
//     if (isAuthenticated()) {
//         navLinks = [
//             { name: "Home", href: "/" },
//             { name: "Cart", href: "/cart" },
//             { name: "Dashboard", href: `/${userInfo().role}/dashboard` },
//         ];
//     } else {
//         navLinks = [
//             { name: "Home", href: "/" },
//             { name: "Login", href: "/login" },
//             { name: "Register", href: "/register" },
//         ];
//     }

//     const navBar = navLinks.map((link) => {
//         const navlinks = (
//             <NavLink
//                 key={link.name}
//                 to={link.href}
//                 className={({ isActive }) => {
//                     return isActive ? "activeBtn" : "btn";
//                 }}
//             >
//                 {link.name}
//             </NavLink>
//         );

//         return navlinks;
//     });

//     let logoutBtn = null;
//     if (isAuthenticated()) {
//         logoutBtn = (
//             <button
//                 className="btn cursor-pointer"
//                 onClick={() => {
//                     signOut(() => {
//                         navigate("/login");
//                     });
//                 }}
//             >
//                 Logout
//             </button>
//         );
//     } else {
//         logoutBtn = null;
//     }

//     return (
//         <div className="flex py-10 justify-between">
//             <Typography variant="h4">E-Com.com</Typography>
//             <nav className="">{navBar}</nav>
//             <span>{logoutBtn}</span>
//         </div>
//     );
// };

// export default Menu;
