import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { Button, Typography } from "@mui/material";
import { showError, showLoading } from "../../utils/messages";
import { login } from "../../api/apiAuth";
import { authenticate, isAuthenticated, userInfo } from "../../utils/auth";

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: false,
        loading: false,
        disabled: false,
        redirect: false,
    });
    const { email, password, loading, error, redirect, disabled } = values;

    const handleChange = (e) => {
        setValues({
            ...values,
            error: false,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // alert(JSON.stringify(values));
        setValues({
            ...values,
            error: false,
            loading: true,
            disabled: true,
        });
        login({ email, password })
            .then((res) => {
                authenticate(res.data.token, () => {
                    setValues({
                        // ...values,
                        email: "",
                        password: "",
                        success: true,
                        disabled: false,
                        loading: false,
                        redirect: true,
                    });
                });
            })
            .catch((err) => {
                let errMsg = "Something went wrong!";
                if (err.response) {
                    errMsg = err.response.data;
                } else {
                    errMsg = "Something went wrong!";
                }
                setValues({
                    ...values,
                    error: errMsg,
                    disabled: false,
                    loading: false,
                });
            });
    };

    const signInForm = () => {
        const form = (
            <form onSubmit={handleSubmit}>
                <label className="">Email:</label>
                <input
                    name="email"
                    type="email"
                    className="w-full p-4 border my-5"
                    value={email}
                    onChange={handleChange}
                    required
                />

                <label className="">Password:</label>
                <input
                    name="password"
                    type="password"
                    className="w-full p-4 border my-5"
                    value={password}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    className="w-full p-4 border my-5"
                    disabled={disabled}
                >
                    Login
                </button>
            </form>
        );
        return form;
    };

    //* How can I redirect the user to the home page after successful login?
    const showMsg = () => {
        if (redirect) {
            // navigate("/");
            navigate(`/${userInfo().role}/dashboard`);
        }
        //* The purpose of this function is that if the user is logged in he can not go to the login page again.
        // if (isAuthenticated()) {
        //     return <Navigate to="/" replace />;
        // }
    };

    return (
        <Layout title="Login">
            {showMsg()}
            {showLoading(loading)}
            {showError(error, error)}
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Login Here,
            </Typography>
            {signInForm()}
        </Layout>
    );
};

export default Login;
