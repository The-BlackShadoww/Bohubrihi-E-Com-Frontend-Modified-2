import { useState, useEffect } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import {
    getCartItems,
    updateCartItems,
    deleteCartItem,
} from "../../api/apiOrder";
import { userInfo } from "../../utils/auth";
import CartItem from "./CartItem";
import { Button, Typography } from "@mui/material";
import { getCoupon } from "../../api/apiAdmin";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [code, setCode] = useState("");
    const [coupon, setCoupon] = useState([]);
    const [discount, setDiscount] = useState(0);

    const loadCart = () => {
        getCartItems(userInfo().token)
            .then((response) => setCartItems(response.data))
            .catch((err) => console.log(err.response));
    };
    useEffect(() => {
        loadCart();
        //! Discount
        coupon.forEach((d) => {
            setDiscount(d.amount);
        });
    }, [coupon]);

    //! Increase item
    const increaseItem = (item) => () => {
        if (item.count === 5) return;
        const cartItem = {
            ...item,
            count: item.count + 1,
        };

        updateCartItems(userInfo().token, cartItem)
            .then((response) => loadCart())
            .catch((error) => console.log(error.response));
    };

    //! Decrease item
    const decreaseItem = (item) => () => {
        if (item.count === 1) return;
        const cartItem = {
            ...item,
            count: item.count - 1,
        };

        updateCartItems(userInfo().token, cartItem)
            .then((response) => loadCart())
            .catch((error) => console.log(error.response));
    };

    //! Get Total
    //* -------- original ---------
    // const getCartTotal = () => {
    //     const arr = cartItems.map((item) => item.price * item.count);
    //     const sum = arr.reduce((a, b) => a + b, 0);
    //     return sum;
    // };
    // * --------------- Modified ----------
    const getCartTotal = () => {
        let arr = [];
        if (discount === 0) {
            arr = cartItems.map((item) => item.price * item.count);
        } else {
            arr = cartItems.map(
                (item) =>
                    item.price * item.count -
                    (item.price * item.count * discount) / 100
            );
        }

        const sum = arr.reduce((a, b) => a + b, 0);
        return sum;
    };

    //! Remove item
    const removeItem = (item) => () => {
        if (!window.confirm("Delete Item?")) return;
        deleteCartItem(userInfo().token, item)
            .then((response) => {
                loadCart();
            })
            .catch((err) => console.log(err.message));
    };

    //! Coupon
    const handleChange = (e) => {
        setCode(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        getCoupon(code)
            .then((res) => setCoupon(res.data))
            .catch((err) => console.log(err));

        setCode("");
    };

    return (
        <Layout
            title="Your Cart"
            description="Hurry up! Place your order!"
            className="container"
        >
            <nav aria-label="breadcrumb">
                <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
            </nav>
            <div className="w-full">
                <table className="border w-full text-center">
                    <thead className="border p-2">
                        <tr className="border">
                            <th scope="col" width="15%" className="p-2">
                                #
                            </th>
                            <th className="border">Image</th>
                            <th className="border">Product Name</th>
                            <th className="border">Quantity</th>
                            <th className="border">Price</th>
                            <th scop="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, idx) => (
                            <CartItem
                                key={item._id}
                                item={item}
                                serial={idx + 1}
                                increaseItem={increaseItem(item)}
                                decreaseItem={decreaseItem(item)}
                                removeItem={removeItem(item)}
                                discount={discount}
                            />
                        ))}
                        <tr className="border">
                            <th className="border" scope="row" />
                            <td className="border" colSpan={2}>
                                Total
                            </td>
                            <td>
                                <span>
                                    {" "}
                                    ৳{" "}
                                    <span className="font-semibold text-[#445955]">
                                        {getCartTotal()}
                                    </span>
                                </span>
                                {coupon.length !== 0 ? (
                                    <span
                                        className="ml-2"
                                        style={{
                                            color: "red",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Discounted
                                    </span>
                                ) : null}
                            </td>
                            <td />
                        </tr>
                        {/* ------------- Modifications ---------------- */}
                        <tr className="border font-semibold">
                            <td colSpan={2} className="border">
                                <p>Use a coupon</p>
                            </td>
                            <td colSpan={2}>
                                <form
                                    onSubmit={handleSubmit}
                                    className="w-full justify-between flex p-2"
                                >
                                    <input
                                        type="text"
                                        placeholder="coupon code"
                                        onChange={handleChange}
                                        required
                                        className="border border-black/50 rounded-lg w-3/4 p-2"
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        // size="small"
                                        color="info"
                                    >
                                        Check
                                    </Button>
                                </form>
                            </td>
                            <td colSpan={2} className="border">
                                <div className="flex">
                                    <p className="mr-2">Coupon name: </p>
                                    {coupon &&
                                        coupon.map((c) => (
                                            <Typography variant="2">
                                                {c.name}
                                            </Typography>
                                        ))}
                                </div>
                            </td>
                        </tr>
                        {/* ---------------------------------- */}
                        <tr>
                            <th scope="row" />
                            <td colSpan={6} className="p-4">
                                <Link to="/" className="mr-4">
                                    <Button
                                        variant="contained"
                                        sx={{
                                            background: "#d2dfdd",
                                            color: "#000",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Continue Shopping
                                    </Button>
                                </Link>
                                <Link to={`/shipping/${discount}`}>
                                    {/* <Button
                                        variant="outlined"
                                        sx={{
                                            // background: "#445955",
                                            border: "#445955",
                                            color: "#000",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Proceed To Checkout
                                    </Button> */}
                                    <button className="text-[#000] border border-[#445955] font-semibold px-6 py-[6px] rounded-md">
                                        Proceed To Checkout
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Cart;

//! original code
// import { useState, useEffect } from "react";
// import Layout from "../Layout";
// import { Link } from "react-router-dom";
// import {
//     getCartItems,
//     updateCartItems,
//     deleteCartItem,
// } from "../../api/apiOrder";
// import { userInfo } from "../../utils/auth";
// import CartItem from "./CartItem";
// import { Button, Typography } from "@mui/material";
// import { getCoupon } from "../../api/apiAdmin";

// const Cart = () => {
//     const [cartItems, setCartItems] = useState([]);
//     const [code, setCode] = useState("");
//     const [coupon, setCoupon] = useState([]);
//     const [discount, setDiscount] = useState(0);

//     const loadCart = () => {
//         getCartItems(userInfo().token)
//             .then((response) => setCartItems(response.data))
//             .catch((err) => console.log(err.response));
//     };
//     useEffect(() => {
//         loadCart();
//         //! Discount
//         coupon.forEach((d) => {
//             setDiscount(d.amount);
//         });
//     }, [coupon]);

//     //! Increase item
//     const increaseItem = (item) => () => {
//         if (item.count === 5) return;
//         const cartItem = {
//             ...item,
//             count: item.count + 1,
//         };

//         updateCartItems(userInfo().token, cartItem)
//             .then((response) => loadCart())
//             .catch((error) => console.log(error.response));
//     };

//     //! Decrease item
//     const decreaseItem = (item) => () => {
//         if (item.count === 1) return;
//         const cartItem = {
//             ...item,
//             count: item.count - 1,
//         };

//         updateCartItems(userInfo().token, cartItem)
//             .then((response) => loadCart())
//             .catch((error) => console.log(error.response));
//     };

//     //! Get Total
//     //* -------- original ---------
//     // const getCartTotal = () => {
//     //     const arr = cartItems.map((item) => item.price * item.count);
//     //     const sum = arr.reduce((a, b) => a + b, 0);
//     //     return sum;
//     // };
//     // * --------------- Modified ----------
//     const getCartTotal = () => {
//         let arr = [];
//         if (discount === 0) {
//             arr = cartItems.map((item) => item.price * item.count);
//         } else {
//             arr = cartItems.map(
//                 (item) =>
//                     item.price * item.count -
//                     (item.price * item.count * discount) / 100
//             );
//         }

//         const sum = arr.reduce((a, b) => a + b, 0);
//         return sum;
//     };

//     //! Remove item
//     const removeItem = (item) => () => {
//         if (!window.confirm("Delete Item?")) return;
//         deleteCartItem(userInfo().token, item)
//             .then((response) => {
//                 loadCart();
//             })
//             .catch((err) => console.log(err.message));
//     };

//     //! Coupon
//     const handleChange = (e) => {
//         setCode(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         getCoupon(code)
//             .then((res) => setCoupon(res.data))
//             .catch((err) => console.log(err));

//         setCode("");
//     };

//     return (
//         <Layout
//             title="Your Cart"
//             description="Hurry up! Place your order!"
//             className="container"
//         >
//             <nav aria-label="breadcrumb">
//                 <ol>
//                     <li>
//                         <a href="#">Order</a>
//                     </li>
//                     <li>Cart</li>
//                 </ol>
//             </nav>
//             <div className="w-full">
//                 <table className="border w-full text-center">
//                     <thead className="border">
//                         <tr className="border">
//                             <th scope="col" width="15%">
//                                 #
//                             </th>
//                             <th className="border">Image</th>
//                             <th className="border">Product Name</th>
//                             <th className="border">Quantity</th>
//                             <th className="border">Price</th>
//                             <th scop="col">Remove</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {cartItems.map((item, idx) => (
//                             <CartItem
//                                 key={item._id}
//                                 item={item}
//                                 serial={idx + 1}
//                                 increaseItem={increaseItem(item)}
//                                 decreaseItem={decreaseItem(item)}
//                                 removeItem={removeItem(item)}
//                                 discount={discount}
//                             />
//                         ))}
//                         <tr className="border">
//                             <th className="border" scope="row" />
//                             <td className="border" colSpan={2}>
//                                 Total
//                             </td>
//                             <td>
//                                 ৳{getCartTotal()}
//                                 {coupon.length !== 0 ? (
//                                     <span
//                                         className="ml-2"
//                                         style={{
//                                             color: "red",
//                                             fontWeight: "bold",
//                                         }}
//                                     >
//                                         Discounted
//                                     </span>
//                                 ) : null}
//                             </td>
//                             <td />
//                         </tr>
//                         {/* ------------- Modifications ---------------- */}
//                         <tr className="border">
//                             <td colSpan={2} className="border">
//                                 <Typography variant="body1">
//                                     Use a coupon
//                                 </Typography>
//                             </td>
//                             <td colSpan={2}>
//                                 <form
//                                     onSubmit={handleSubmit}
//                                     className="w-full justify-between flex p-2"
//                                 >
//                                     <input
//                                         type="text"
//                                         placeholder="coupon code"
//                                         onChange={handleChange}
//                                         required
//                                         className="border border-black w-3/4 p-2"
//                                     />
//                                     <Button
//                                         type="submit"
//                                         variant="contained"
//                                         // size="small"
//                                         color="info"
//                                     >
//                                         Check
//                                     </Button>
//                                 </form>
//                             </td>
//                             <td colSpan={2} className="border">
//                                 <div className="flex">
//                                     <p className="mr-2">Coupon name: </p>
//                                     {coupon &&
//                                         coupon.map((c) => (
//                                             <Typography variant="2">
//                                                 {c.name}
//                                             </Typography>
//                                         ))}
//                                 </div>
//                             </td>
//                         </tr>
//                         {/* ---------------------------------- */}
//                         <tr>
//                             <th scope="row" />
//                             <td colSpan={6} className="p-4">
//                                 <Link to="/" className="mr-4">
//                                     <Button variant="contained">
//                                         Continue Shopping
//                                     </Button>
//                                 </Link>
//                                 <Link to={`/shipping/${discount}`}>
//                                     <Button variant="contained" color="success">
//                                         Proceed To Checkout
//                                     </Button>
//                                 </Link>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </Layout>
//     );
// };

// export default Cart;
