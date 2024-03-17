import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../utils/config";
import { getOrders, getComment } from "../../api/apiOrder";
import { userInfo } from "../../utils/auth";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import "./card.css";

const ProductCard = ({ product, handleAddToCart }) => {
    const titleStyle = {
        display: "block",
        textOverflow: "ellipsis",
        wordWrap: "break-word",
        overflow: "hidden",
        maxHeight: "2em",
        lineHeight: "1em",
    };
    const [commentCount, setCommentCount] = useState([]);
    const [orders, setOrders] = useState([]);
    // console.log(commentCount);

    useEffect(() => {
        getOrders()
            .then((res) => setOrders(res.data))
            .catch((err) => console.log(err));

        getComment()
            .then((res) => setCommentCount(res.data))
            .catch((err) => console.log(err));
    }, []);

    const filterComment = commentCount.filter((c) => c.product === product._id);

    const soldArr = orders.map((p) => {
        let sold = null;
        if (p.productId === product._id) {
            sold = (
                <span>
                    <Typography
                        sx={{ fontWeight: "600", color: "#7c7f82" }}
                        variant="body2"
                    >
                        Sold: {p.count}
                    </Typography>
                </span>
            );
        }
        return sold;
    });

    return (
        <div className="mb-10">
            <Card sx={{ maxWidth: 340, maxHeight: 550, borderRadius: "1rem" }}>
                {/* {JSON.stringify(commentCount)} */}
                <img
                    src={`${API}/product/photo/${product._id}`}
                    alt={product.name}
                    className="cardImg"
                />
                {/* <CardMedia
                    sx={{ imgStyle }}
                    image={`${API}/product/photo/${product._id}`}
                    alt={product.name}
                /> */}
                <CardContent sx={{ padding: "1rem" }}>
                    <div style={{ minHeight: "3em" }}>
                        <Typography variant="h5" sx={{ titleStyle }}>
                            {product.name}
                        </Typography>
                    </div>
                    <div className="mb-2">
                        <Typography variant="body1">
                            <span>&#2547;</span>
                            <span className="font-semibold mr-2">
                                {product.price}
                            </span>
                            {product.quantity ? (
                                <span
                                    style={{
                                        padding: 2,
                                        backgroundColor: "orange",
                                        borderRadius: 5,
                                        fontWeight: "bold",
                                    }}
                                >
                                    In Stock
                                </span>
                            ) : (
                                <span>Out of Stock</span>
                            )}
                        </Typography>
                    </div>
                    {/* Show comments */}
                    <div className="mb-1">
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: "600", color: "#7c7f82" }}
                        >
                            Reviews: {filterComment.length}
                        </Typography>
                    </div>
                    <div className="mb-1">{soldArr}</div>
                </CardContent>
                <CardActions sx={{ padding: "1rem" }}>
                    {/* ---- Sending products id as query to the productDetails page --- */}
                    <Link to={`/product/${product._id}`}>
                        {/* <Button variant="contained" size="small">
                            View Product
                        </Button> */}
                        <button className="border border-[#445955] text-[#445955] font-semibold text-sm hover:bg-[#445955] hover:text-white duration-100 ease-in py-2 px-3 rounded-md mr-3">
                            View Product
                        </button>
                    </Link>
                    {product.quantity ? (
                        <>
                            &nbsp;
                            {/* <Button
                                variant="contained"
                                size="small"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </Button> */}
                            <button
                                className=" font-semibold text-sm bg-[#d2dfdd] text-black/80 duration-100 ease-in py-2 px-3 rounded-md"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                        </>
                    ) : (
                        ""
                    )}
                </CardActions>
            </Card>
        </div>
    );
};

export default ProductCard;
// import React from "react";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { API } from "../../utils/config";
// import { getOrders, getComment } from "../../api/apiOrder";
// import { userInfo } from "../../utils/auth";
// import {
//     Button,
//     Card,
//     CardActions,
//     CardContent,
//     CardMedia,
//     Typography,
// } from "@mui/material";
// import "./card.css";

// const ProductCard = ({ product, handleAddToCart }) => {
//     const titleStyle = {
//         display: "block",
//         textOverflow: "ellipsis",
//         wordWrap: "break-word",
//         overflow: "hidden",
//         maxHeight: "2em",
//         lineHeight: "1em",
//     };
//     const [commentCount, setCommentCount] = useState([]);
//     const [orders, setOrders] = useState([]);
//     // console.log(commentCount);

//     useEffect(() => {
//         getOrders()
//             .then((res) => setOrders(res.data))
//             .catch((err) => console.log(err));

//         getComment()
//             .then((res) => setCommentCount(res.data))
//             .catch((err) => console.log(err));
//     }, []);

//     const filterComment = commentCount.filter((c) => c.product === product._id);

//     const soldArr = orders.map((p) => {
//         let sold = null;
//         if (p.productId === product._id) {
//             sold = (
//                 <span>
//                     <Typography variant="body1">Sold:{p.count}</Typography>
//                 </span>
//             );
//         }
//         return sold;
//     });

//     return (
//         <div className="mb-10">
//             <Card sx={{ maxWidth: 340, maxHeight: 550 }}>
//                 {/* {JSON.stringify(commentCount)} */}
//                 <img
//                     src={`${API}/product/photo/${product._id}`}
//                     alt={product.name}
//                     className="cardImg"
//                 />
//                 {/* <CardMedia
//                     sx={{ imgStyle }}
//                     image={`${API}/product/photo/${product._id}`}
//                     alt={product.name}
//                 /> */}
//                 <CardContent>
//                     <div style={{ minHeight: "3em" }}>
//                         <Typography variant="h5" sx={{ titleStyle }}>
//                             {product.name}
//                         </Typography>
//                     </div>
//                     <div>
//                         <Typography variant="body2" color="text.secondary">
//                             <span>&#2547;</span>
//                             {product.price}
//                             {product.quantity ? (
//                                 <span
//                                     style={{
//                                         padding: 5,
//                                         backgroundColor: "orange",
//                                         borderRadius: 5,
//                                         fontWeight: "bold",
//                                     }}
//                                 >
//                                     In Stock
//                                 </span>
//                             ) : (
//                                 <span>Out of Stock</span>
//                             )}
//                         </Typography>
//                     </div>
//                     {/* Show comments */}
//                     <div>
//                         <Typography variant="body1">
//                             Reviews:{filterComment.length}
//                         </Typography>
//                     </div>
//                     <div>{soldArr}</div>
//                 </CardContent>
//                 <CardActions>
//                     {/* ---- Sending products id as query to the productDetails page --- */}
//                     <Link to={`/product/${product._id}`}>
//                         <Button variant="contained" size="small">
//                             View Product
//                         </Button>
//                     </Link>
//                     {product.quantity ? (
//                         <>
//                             &nbsp;
//                             <Button
//                                 variant="contained"
//                                 size="small"
//                                 onClick={handleAddToCart}
//                             >
//                                 Add to Cart
//                             </Button>
//                         </>
//                     ) : (
//                         ""
//                     )}
//                 </CardActions>
//             </Card>
//         </div>
//     );
// };

// export default ProductCard;
