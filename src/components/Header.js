import React from "react";
import { NavLink, Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useContext } from "react";
import { userContext } from "../App";
import { toast } from "react-toastify"
import { useCookies } from "react-cookie";
import { useState } from "react";
import { AiTwotoneHome } from "react-icons/ai";
import { useRef } from "react";
export const Header = () => {
    const [state, dispatch] = useContext(userContext);
    const { pathname } = useLocation();
    // const [cart, setcart] = useContext(userContext);
    const base_url = process.env.REACT_APP_BASE_URI;
    const [cookie, removeCookie] = useCookies(["authToken"]);
    const navigate = useNavigate();
    const searchRef = useRef();
    // const {filterValue, setfilterValue} = useContext(userContext);
    const handleCategory = (filter) => {
        navigate("/");
        dispatch({ type: "filterValue", payload: filter })
    }
    const handleSearch = () => {
        const query = searchRef.current.value;
        dispatch({ type: "searchQuery", payload: query })
    }
    const handleLogout = () => {
        if (state.isLogged) {
            toast.loading("Please wait", {
                progressClassName: "success-progress-bar",
                toastId: 2,
            });
            const postURL = `${base_url}/user/log-out`;
            fetch(postURL, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    token: cookie.authToken,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.message === "successfully log-out") {
                        removeCookie("authToken");
                        toast.update(2, {
                            render: "successfully log-out",
                            type: "success",
                            hideProgressBar: false,
                            autoClose: 1000,
                            isLoading: false,
                        });
                        dispatch({ type: "isLogged", payload: false })
                        navigate("/log-in");
                    }
                })
                .catch(() => {
                    toast.update(2, {
                        render: "something went wrong",
                        type: "error",
                        hideProgressBar: false,
                        autoClose: 1000,
                        isLoading: false,
                    });
                });
        } else {
            navigate("/log-in");
        }
    }
    return (
        <>
            <header className="header-top-strip py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-6 d-none d-lg-block">
                            <p className="text-white mb-0">
                                Free Shiping over 100 & Free Return
                            </p>
                        </div>
                        <div className="col-12 col-lg-6 text-center text-lg-end">
                            <p className="text-white mb-0">
                                Hotline:
                                <a
                                    className="text-white"
                                    href="tel:+91 9952671261"
                                >
                                    +91 9952671261
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </header>
            <header className="header-upper py-3">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-2">
                            <h2>
                                <Link to="/" className="text-white">
                                    E Rental
                                </Link>
                            </h2>
                        </div>
                        {(state.role == "user" && state.isLogged == true) && (
                            <div className="col-6 col-md-5 d-none d-lg-block">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control py-2"
                                        placeholder="Search Product Here..."
                                        aria-label="Search Product Here..."
                                        aria-describedby="basic-addon2"
                                        defaultValue=""
                                        ref={searchRef}
                                    />
                                    <div
                                        className="input-group-text p-3 btn"
                                        id="basic-addon2"
                                        onClick={handleSearch}
                                    >
                                        <BsSearch className="fs-6" />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="col-4 col-md-5 col-lg-4 col-xl-3">
                            {state.isLogged && (
                                <div className="header-upper-links d-flex align-items-center justify-content-between">
                                    {(state.role == "user" && state.isLogged == true) && (
                                        <div>
                                            <Link
                                                to="/cart"
                                                className="d-flex align-items-center gap-10 text-white"
                                            >
                                                <img
                                                    src="/images/cart.svg"
                                                    alt="cart"
                                                ></img>
                                                <div className="d-flex flex-column gap-10">
                                                    <span className="badge bg-white text-dark">
                                                        {state.cart}
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                    {(state.role == "admin" && state.isLogged == true) && (
                                        <div>
                                            <Link
                                                to="/admin-dashboard"
                                                className="d-flex align-items-center gap-10 text-white"
                                            >
                                                <h3 className={`my-auto home-icon ${(pathname == "/admin-dashboard")? "text-warning" : "text-light"}`}><AiTwotoneHome /></h3>
                                            </Link>
                                        </div>
                                    )}
                                    <NavLink>
                                        <div
                                            onClick={handleLogout}
                                            className="d-flex align-items-center gap-10 text-white"
                                        >
                                            <img
                                                src="/images/user.svg"
                                                alt="user"
                                            ></img>
                                            <p className="mb-0 d-md-block">
                                                Log out
                                                <br />
                                                My Account
                                            </p>
                                        </div>
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            {(state.role == "user" && state.isLogged == true) && (<header className="header-bottom py-3">
                <div className="container xxl">
                    <div className="row d-md-block d-lg-none">
                        <div className="col-12">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control py-2"
                                    placeholder="Search Product Here..."
                                    aria-label="Search Product Here..."
                                    aria-describedby="basic-addon2"
                                    defaultValue=""
                                    ref={searchRef}
                                />
                                <div
                                    className="input-group-text p-3 btn"
                                    id="basic-addon2"
                                    onClick={handleSearch}
                                >
                                    <BsSearch className="fs-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row my-2 d-lg-block">
                        <div className="col-12">
                            <div className="menu-bottom d-flex align-items-center gap-30 flex-wrap justify-content-sm-start justify-content-center">
                                <div>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <img
                                                src="/images/menu.svg"
                                                alt="menu"
                                            ></img>
                                            <span className="me-5 d-inline-block">
                                                shop categories
                                            </span>
                                        </button>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton1"
                                        >
                                            <li>
                                                <div
                                                    className="dropdown-item text-white"
                                                    onClick={(e) => handleCategory(null)}
                                                >
                                                    All
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    className="dropdown-item text-white"
                                                    onClick={(e) => handleCategory("device")}
                                                >
                                                    Device
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    className="dropdown-item text-white"
                                                    onClick={(e) => handleCategory("clothes")}
                                                >
                                                    Clothes
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="menu-links">
                                    <div className="d-flex align-items-center gap-15">
                                        <NavLink to="/">Home</NavLink>
                                        <NavLink to="/contact">Contact</NavLink>
                                    </div>
                                </div>
                                <div className="menu-links border-0 rounded bg-light">
                                    <div className="d-flex align-items-center gap-15">
                                        {(state.filterValue != null && pathname == "/") && <p className="m-auto">Filtered By : {state.filterValue} <span className="m-1 border bg-danger text-light p-1 btn" onClick={() => dispatch({ type: "filterValue", payload: null })}>x</span></p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            )}
        </>
    );
};
