import React from "react";
import { MetaData } from "../components/MetaData";
import { BreadCrum } from "../components/BreadCrum";
import ReactStars from "react-rating-stars-component";
import Product from "../components/Product";
import { useState } from "react";
import ReactImageZoom from "react-image-zoom";
import { Link } from "react-router-dom";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { Container } from "../components/Container";
export const SingleProduct = () => {
    const copyToClipboard = (text) => {
        console.log('text', text)
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
      }
    const props = {
        width: 500,
        height: 500,
        zoomWidth: 600,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
    };
    const [orderProduct, setorderProduct] = useState(true);
    return (
        <>
            <MetaData title="Reser-Password" />
            {/* <BreadCrum title="Reser-Password" /> */}
            <Container class1={"main-product-wrapper py-5 home-wrapper-2"}>
                    <div className="row">
                        <div className="col-6">
                            <div className="main-product-image">
                                <div>
                                    <ReactImageZoom {...props} />
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="main-product-details">
                                <div className="border-bottom">
                                    <h3 className="title">
                                        Kids name of the product
                                    </h3>
                                </div>
                                <div className="border-bottom py-3">
                                    <h5 className="price"><s className="me-4">$ 100</s>$90</h5>
                                    <div className="d-flex align-items-center gap-10">
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            activeColor="#ffd700"
                                            edit={false}
                                            value={3}
                                        />
                                        <p className="mb-0 t-review">
                                            ( 2 reviews )
                                        </p>
                                    </div>
                                    <a href="#review" className="review-btn">
                                        Write a Review
                                    </a>
                                </div>
                                <div className="py-3">
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">
                                            Type:
                                        </h3>
                                        <p className="product-data">Watch</p>
                                    </div>
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">
                                            Brand:
                                        </h3>
                                        <p className="product-data">Havells</p>
                                    </div>
                                    <div className="d-flex gap-10 align-items-center my-2">
                                        <h3 className="product-heading">
                                            Categories:
                                        </h3>
                                        <p className="product-data">Watch</p>
                                    </div>
                                    <div className="d-flex gap-10 align-items-cente my-2">
                                        <h3 className="product-heading">
                                            Tags:
                                        </h3>
                                        <p className="product-data">Watch</p>
                                    </div>
                                    <div className="d-flex gap-10 flex-row my-2">
                                        <h3 className="product-heading">
                                            Availability:
                                        </h3>
                                        <p className="product-data">In Stock</p>
                                    </div>
                                    <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                                        <h3 className="product-heading">
                                            Quantity:
                                        </h3>
                                        <div className="">
                                            <input
                                                type="number"
                                                name=""
                                                className="form-control"
                                                style={{ width: "70px" }}
                                                min={1}
                                                max={10}
                                                id=""
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-30">
                                            <button
                                                className="button border-0"
                                                type="submit"
                                            >
                                                Add to Cart{" "}
                                            </button>
                                            <button
                                                to="/sign-up"
                                                className="button signup"
                                            >
                                                Buy Now
                                            </button>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </Container>
        </>
    );
};