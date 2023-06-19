import React, { useEffect } from "react";
// import {BreadCrumb} from "../components/BreadCrumb";
import { MetaData } from "../components/MetaData";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Container } from "../components/Container";
import { useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

export const Cart = () => {
    let total = 0;
    const [cartItem, setcartItem] = useState();
    const [cookie, setCookie] = useCookies(["authToken"]);
    let [loading, setLoading] = useState(true);
    const [cartUpdate, setcartUpdate] = useState(0);
    const [subTotal, setsubTotal] = useState(0);
    const handleChange = (productId, element, value) => {
        toast.loading("Please wait", {
            progressClassName: "success-progress-bar",
            toastId: 2,
        });
        const url = `${process.env.REACT_APP_BASE_URI}/user/updateCartItem`;
        fetch(url, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                token: cookie.authToken,
            },
            body: JSON.stringify({
                productId: productId,
                element: element,
                value: value
            })
        }).then((res) => res.json()).then((data) => {
            if (data.message == "quantity is less") {
                toast.update(2, {
                    render: data.message,
                    type: "warning",
                    hideProgressBar: false,
                    autoClose: 1000,
                    isLoading: false,
                });
            }
            else {
                toast.update(2, {
                    render: data.message,
                    type: "success",
                    hideProgressBar: false,
                    autoClose: 1000,
                    isLoading: false,
                });
            }
        }).catch((err) => {
            toast.update(2, {
                render: "Failed to add",
                type: "error",
                hideProgressBar: false,
                autoClose: 5000,
                isLoading: false,
            });
        }).finally(() => {
            setcartUpdate((prev) => prev + 1);
        })
    }
    useEffect(() => {
        const url = `${process.env.REACT_APP_BASE_URI}/user/getCartItem`;
        fetch(url, {
            method: "GET",
            headers: {
                token: cookie.authToken
            }
        }).then((res) => res.json()).then((data) => { setcartItem(data.cart); setsubTotal(data.totalPrice); setLoading(false); console.log("cart updated") }).catch((err) => console.log(err));
    }, [cartUpdate])

    return (
        <>
            <MetaData title={"Cart"} />
            {/* <BreadCrumb title="Cart" /> */}
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                            <h4 className="cart-col-1 px-5">Product</h4>
                            <h4 className="cart-col-2 px-3">Price</h4>
                            <h4 className="cart-col-2 px-3">Quantity</h4>
                            <h4 className="cart-col-3 px-3">From Date</h4>
                            <h4 className="cart-col-2 px-3">From Time</h4>
                            <h4 className="cart-col-3 px-3">To Date</h4>
                            <h4 className="cart-col-2 px-3">To Time</h4>
                            <h4 className="cart-col-2 px-3">Total</h4>
                        </div>
                        {loading == false ? (
                            cartItem.map((item) => {
                                return <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                                    <div className="cart-col-1 gap-15 d-flex align-items-center">
                                        <div className="w-25">
                                            <img
                                                src={item.image}
                                                className="img-fluid"
                                                alt="product image"
                                            />
                                        </div>
                                        <div className="w-75">
                                            <p><b>Title</b>: {item.title}</p>
                                            <p><b>Description</b>: {item.description}</p>
                                        </div>
                                    </div>
                                    <div className="cart-col-2 px-3">
                                        <h5 className="price">$ {item.price}</h5>
                                    </div>
                                    <div className="cart-col-2 d-flex align-items-center gap-15 px-3">
                                        <div>                                            <select
                                            className="form-select"
                                            name="quantity"
                                            defaultValue={item.quantity}
                                            onChange={(e) => handleChange(item.id, e.target.name, e.target.value)}
                                        >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                        </div>
                                    </div>
                                    <div className="cart-col-3 d-flex align-items-center gap-15 px-3">
                                        <DatePicker
                                            selected={new Date(item.startDate)}
                                            onChange={(date) => handleChange(item.id, "startDate", new Date(date))}
                                            selectsStart
                                            startDate={new Date(item.startDate)}
                                            endDate={new Date(item.endDate)}
                                        />
                                    </div>
                                    <div className="cart-col-2 px-3">
                                        <input
                                            className="form-control"
                                            type="time"
                                            name="startTime"
                                            id=""
                                            defaultValue={item.startTime}
                                            onBlur={(e) => handleChange(item.id, "startTime", e.target.value)}
                                        />
                                    </div>{" "}
                                    <div className="cart-col-3 d-flex align-items-center gap-15 px-3">
                                        <DatePicker
                                            selected={new Date(item.endDate)}
                                            onChange={(date) => handleChange(item.id, "endDate", new Date(date))}
                                            selectsEnd
                                            startDate={new Date(item.startDate)}
                                            endDate={new Date(item.endDate)}
                                            minDate={new Date(item.startDate)}
                                        />
                                    </div>
                                    <div className="cart-col-2 px-3">
                                        <input
                                            className="form-control"
                                            type="time"
                                            name="endTime"
                                            id=""
                                            defaultValue={item.endTime}
                                            onBlur={(e) => handleChange(item.id, "endTime", e.target.value)}
                                        />
                                    </div>
                                    <div className="cart-col-2 px-3">
                                        <h5 className="price">$ {item.totalPrice}</h5>
                                    </div>
                                </div>
                            })
                        ) : ("hi")}
                    </div>
                    <div className="col-12 py-2 mt-4">
                        <div className="d-flex justify-content-between align-items-baseline">
                            <Link to="/" className="button">
                                Continue To Shopping
                            </Link>
                            <div className="d-flex flex-column align-items-end">
                                <h4>SubTotal: $ {subTotal}</h4>
                                <p>Taxes and shipping calculated at checkout</p>
                                <Link to="/checkout" className="button">
                                    Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};
