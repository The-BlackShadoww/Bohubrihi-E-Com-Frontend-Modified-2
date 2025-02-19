import React, { useState } from "react";
import Layout from "../Layout";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { userInfo } from "../../utils/auth";
import { createCoupon } from "../../api/apiAdmin";

const CreateCoupon = () => {
    const [values, setValues] = useState({
        name: "",
        code: "",
        amount: 0,
    });

    const { name, code, amount } = values;

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        createCoupon(userInfo().token, values)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));

        setValues({
            ...values,
            name: "",
            code: "",
            amount: 0,
        });
    };

    const couponForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="">Coupon Name</label>
                    <input
                        name="name"
                        type="text"
                        onChange={handleChange}
                        value={name}
                        required
                        className="w-full border border-black p-4"
                    />
                    <label>Coupon Code</label>
                    <input
                        name="code"
                        type="text"
                        onChange={handleChange}
                        value={code}
                        required
                        className="w-full border border-black p-4"
                    />
                    <label>Amount</label>
                    <input
                        name="amount"
                        type="number"
                        onChange={handleChange}
                        value={amount}
                        required
                        className="w-full border border-black p-4"
                    />
                </div>
                <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    sx={{
                        background: "#445955",
                        color: "#fff",
                        fontWeight: "600",
                    }}
                >
                    {" "}
                    Create Coupon
                </Button>
            </form>
        );
    };
    const goBack = () => (
        <div className="">
            <Button
                variant="outlined"
                sx={{
                    marginBottom: "2rem",
                }}
            >
                <Link to="/admin/dashboard" className="">
                    Go to Dashboard
                </Link>
            </Button>
        </div>
    );
    return (
        <div className="max-w-[760px] w-full mx-auto my-15">
            <Layout title="create coupon">
                {goBack()}
                {couponForm()}
            </Layout>
        </div>
    );
};

export default CreateCoupon;
