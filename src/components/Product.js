import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";


export const Product = (props) => {
    return (
        <>
            <div className="card product-card">
                <div className="card-header">
                    <img
                        className="card-img-top"
                        src={props.img}
                        alt="Card image"
                    />
                </div>
                <div className="d-flex justify-content-between card-footer">
                    <div>
                        <h6 className="card-title">{props.title}</h6>
                        <p className="my-auto">
                            <span className="me-3">1 Hour</span>${props.price}
                        </p>
                    </div>
                    <div onClick={props.addCart} className="btn btn-dark">
                        <AiOutlineShoppingCart />
                    </div>
                </div>
            </div>
        </>
    );
};