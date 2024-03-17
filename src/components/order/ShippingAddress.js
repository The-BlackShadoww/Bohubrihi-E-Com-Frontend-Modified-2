import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { Link, Navigate, useParams } from "react-router-dom";
import { Button, Card, Typography } from "@mui/material";
import { getProfile, updateProfile } from "../../api/apiOrder";
import { userInfo } from "../../utils/auth";

const ShippingAddress = () => {
    const { discount } = useParams();
    const [values, setValues] = useState({
        phone: "",
        address1: "",
        address2: "",
        city: "",
        postcode: "",
        country: "",
    });
    const [disabled, setDisabled] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const { phone, address1, address2, city, postcode, country } = values;
    console.log(values);

    useEffect(() => {
        getProfile(userInfo().token)
            .then((response) => setValues(response.data))
            .catch((err) => console.log(err.message));
    }, []);

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabled(true);
        //loading

        updateProfile(userInfo().token, values)
            .then((res) => {
                if (res.status === 200) {
                    setRedirect(true);
                }
            })
            .catch((err) => setDisabled(false));
    };

    const profileForm = () => (
        <form onSubmit={handleSubmit}>
            <label className="text-muted font-semibold">Phone</label>
            <input
                name="phone"
                value={phone}
                required
                className="w-full border p-3 my-2"
                onChange={handleChange}
            />
            <label className="text-muted font-semibold">Address 1</label>
            <input
                name="address1"
                value={address1}
                required
                className="w-full border p-3 my-2"
                onChange={handleChange}
            />
            <label className="text-muted font-semibold">Address 2</label>
            <input
                name="address2"
                value={address2}
                className="w-full border p-3 my-2"
                onChange={handleChange}
            />
            <div className="row">
                <div className="col-4">
                    <label className="text-muted font-semibold">City</label>
                    <input
                        name="city"
                        value={city}
                        required
                        className="w-full border p-3 my-2"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-4">
                    <label className="text-muted font-semibold">
                        Post Code:{" "}
                    </label>
                    <input
                        name="postcode"
                        value={postcode}
                        type="number"
                        required
                        className="w-full border p-3 my-2"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-4">
                    <label className="text-muted font-semibold">Country</label>
                    <input
                        name="country"
                        value={country}
                        required
                        className="w-full border p-3 my-2"
                        onChange={handleChange}
                    />
                    <br />

                    <div className="mt-5">
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                fontWeight: "600",
                                backgroundColor: "#d2dfdd",
                                color: "#000",
                            }}
                            className="btn btn-primary btn-sm float-right"
                            disabled={disabled}
                        >
                            Save and Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );

    return (
        <>
            <Layout
                title="Checkout"
                description="Complete your order!"
                className="container"
            >
                {redirect ? <Navigate to={`/checkout/${discount}`} /> : ""}
                <nav>
                    <ol className="flex">
                        <li>
                            <Link to="/">
                                <Button variant="text">Order</Button>/
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart">
                                <Button variant="text">Cart</Button>/
                            </Link>
                        </li>
                        <li>
                            <Link to="/shipping">
                                <Button variant="text">Shipping Address</Button>
                            </Link>
                        </li>
                    </ol>
                </nav>
                <div className="max-w-[760px] w-full mx-auto my-15 ">
                    <Card
                        sx={{
                            height: "auto",
                            padding: 5,
                            borderRadius: "1.5rem",
                        }}
                    >
                        <div
                            className="w-full border p-3 font-bold text-center text-black mb-8"
                            style={{ backgroundColor: "#d2dfdd" }}
                        >
                            Shipping Address
                        </div>
                        <div className="card-body">{profileForm()}</div>
                    </Card>
                </div>
            </Layout>
        </>
    );
};

export default ShippingAddress;
