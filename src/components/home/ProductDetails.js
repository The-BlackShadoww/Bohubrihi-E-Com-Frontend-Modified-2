import { Fragment, useEffect, useState } from "react";
import Layout from "../Layout";
import { API } from "../../utils/config";
import { Link, useParams } from "react-router-dom";
import { showSuccess, showError } from "../../utils/messages";
import { Breadcrumbs, Button, Card, Typography } from "@mui/material";
import { getProductDetails } from "../../api/apiProduct";
import { addToCart, postComment, getComment } from "../../api/apiOrder";
import { isAuthenticated, userInfo } from "../../utils/auth";

const ProductDetails = (props) => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [comment, setComment] = useState("");
    const [userComments, setUserComment] = useState([]);
    console.log(userComments);

    useEffect(() => {
        //!!! wrong -->> const id = props.match.params.id; !!!!!
        getProductDetails(id)
            .then((response) => setProduct(response.data))
            .catch((err) => setError("Failed to load products"));

        getComment()
            .then((res) => setUserComment(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    const handleAddToCart = (product) => () => {
        if (isAuthenticated()) {
            setError(false);
            setSuccess(false);
            const user = userInfo();
            const cartItem = {
                user: user._id,
                product: product._id,
                price: product.price,
            };
            addToCart(user.token, cartItem)
                .then((reponse) => setSuccess(true))
                .catch((err) => {
                    //! ?????--------problem-------?????????
                    console.log(err.response);
                    if (err.response) setError(err.response.data);
                    else setError("Adding to cart failed!");
                });
        } else {
            setSuccess(false);
            setError("Please Login First!");
        }
    };

    const handleComment = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            comment: comment,
            product: id,
        };

        postComment(userInfo().token, data)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));

        getComment()
            .then((res) => setUserComment(res.data))
            .catch((err) => console.log(err));

        setComment("");
    };

    return (
        <Layout title="Product Page">
            <Breadcrumbs aria-label="breadcrumb">
                <Link to="/" underline="hover" color="inherit">
                    Home
                </Link>
                <Link to="#" underline="hover" color="inherit">
                    Product
                </Link>
                <Typography color="text.primary">
                    Home Page Navigation
                </Typography>
            </Breadcrumbs>
            <div>
                {showSuccess(success, "Item Added to Cart!")}
                {showError(error, error)}
            </div>
            {/* content */}
            <div className="flex md:flex-row flex-col gap-10 p-5">
                <div className="basis-[35%] rounded-2xl">
                    <img
                        src={`${API}/product/photo/${product._id}`}
                        alt={product.name}
                        width="100%"
                        className="rounded-xl"
                    />
                </div>
                <div className="px-5 basis-2/4">
                    <div className="flex items-center justify-between">
                        <div className="flex">
                            <div>
                                <Typography variant="h5">
                                    {product.name}
                                </Typography>
                                <Typography variant="body1">
                                    <span className="font-semibold">
                                        &#2547;{product.price}
                                    </span>
                                </Typography>
                            </div>
                            <div>
                                <p className=" ml-4">
                                    {product.quantity ? (
                                        <span
                                            style={{
                                                padding: 5,
                                                backgroundColor: "green",
                                                borderRadius: 5,
                                                color: "white",
                                            }}
                                        >
                                            In Stock
                                        </span>
                                    ) : (
                                        <span
                                            style={{
                                                padding: 5,
                                                backgroundColor: "red",
                                                borderRadius: 5,
                                            }}
                                        >
                                            Out of Stock
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {product.quantity ? (
                                <>
                                    <Button
                                        sx={{
                                            marginTop: 3,
                                            backgroundColor: "#d2dfdd",
                                            color: "#000",
                                            fontWeight: "600",
                                        }}
                                        variant="contained"
                                        onClick={handleAddToCart(product)}
                                    >
                                        Add to Cart
                                    </Button>
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>

                    {/* ------------- Comments ------------ */}
                    <div className="my-4">
                        <Typography variant="h5">Give your feedback</Typography>
                        <form
                            onSubmit={handleSubmit}
                            className="flex items-center"
                        >
                            <input
                                className="w-full border rounded-md p-3 my-4"
                                type="text"
                                placeholder="comment"
                                onChange={handleComment}
                                required
                            ></input>
                            {/* <Button variant="contained" type="submit">
                                Post
                            </Button> */}
                            <button className="bg-[#d2dfdd] p-3 rounded-lg ml-2">
                                Post
                            </button>
                        </form>
                        <div className="mt-10">
                            <Typography variant="h6">Comments:</Typography>
                            {userComments &&
                                userComments
                                    .filter((c) => c.product === id)
                                    .map((c) => (
                                        <Fragment key={c.id}>
                                            <p className="p-2 my-3 bg-[#f5f5f5] rounded-xl">
                                                {c.comment}
                                            </p>
                                        </Fragment>
                                    ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="mt-10">
                <Typography variant="h4">Comments:</Typography>
                {userComments &&
                    userComments
                        .filter((c) => c.product === id)
                        .map((c) => (
                            <Fragment key={c.id}>
                                <p className="p-2 my-3 bg-[#f5f5f5] rounded-xl">
                                    {c.comment}
                                </p>
                            </Fragment>
                        ))}
            </div> */}
            {/* {JSON.stringify(userComments)} */}
        </Layout>
    );
};

export default ProductDetails;
