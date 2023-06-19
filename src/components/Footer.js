import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsYoutube, BsInstagram, BsGithub } from "react-icons/bs";
export const Footer = () => {
    return (
        <>
            <footer className="py-4">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-5">
                            <div className="div footer-top-data d-flex gap-30 align-items-center justify-content-center justify-content-lg-start">
                                <img
                                    src="/images/newsletter.png"
                                    alt="newsletter"
                                />
                                <h2 className="mb-0 text-white">
                                    Sign up for Newslatter
                                </h2>
                            </div>
                        </div>
                        <div className="col-12 col-lg-7 my-4">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control py-1"
                                    placeholder="Your Email Address"
                                    aria-label="Your Email Address"
                                    aria-describedby="basic-addon2"
                                />
                                <span
                                    className="input-group-text p-2"
                                    id="basic-addon2"
                                >
                                    Subscribe
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className="py-3">
                <div className="py-4">
                    <div className="container">
                        <div className="row">
                            <div
                                className="accordion accordion-flush d-md-block d-lg-none px-0"
                                id="accordionFlushExample"
                            >
                                <div className="accordion-item bg-transparent text-light">
                                    <h2
                                        className="accordion-header"
                                        id="flush-headingOne"
                                    >
                                        <button
                                            className="accordion-button collapsed bg-transparent"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseOne"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseOne"
                                        >
                                            Contact us
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseOne"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="flush-headingOne"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="mt-1 ms-4 mb-4">
                                            <h6>Demo store</h6>
                                            <address className="text-white fs-6">
                                                home: 4/183,kadambathur,
                                                <br />
                                                Thirubvallur
                                                <br />
                                                Pincode:631203
                                            </address>
                                            <a
                                                href="tel:+91 9952671261"
                                                className="mt-3 d-block mb-1 text-white"
                                            >
                                                +91 9952671261
                                            </a>
                                            <a
                                                href="mailto:vignesh@gmail.com"
                                                className="mt-2 d-block mb-3 text-white"
                                            >
                                                vignesh@gmail.com
                                            </a>
                                            <div className="social_icons d-flex align-items-center gap-30 mt-4">
                                                <a
                                                    className="text-white"
                                                    href="/"
                                                >
                                                    <BsInstagram className="fs-4" />
                                                </a>
                                                <a
                                                    className="text-white"
                                                    href="/"
                                                >
                                                    <BsGithub className="fs-4" />
                                                </a>
                                                <a
                                                    className="text-white"
                                                    href="/"
                                                >
                                                    <BsYoutube className="fs-4" />
                                                </a>
                                                <a
                                                    className="text-white"
                                                    href="/"
                                                >
                                                    <BsLinkedin className="fs-4" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 d-none d-lg-block">
                                <h4 className="text-white mb-4">Contact Us</h4>
                                <div>
                                    <address className="text-white fs-6">
                                        home: 4/183,kadambathur,
                                        <br />
                                        Thirubvallur
                                        <br />
                                        Pincode:631203
                                    </address>
                                    <a
                                        href="tel:+91 9952671261"
                                        className="mt-3 d-block mb-1 text-white"
                                    >
                                        +91 9952671261
                                    </a>
                                    <a
                                        href="mailto:vignesh@gmail.com"
                                        className="mt-2 d-block mb-3 text-white"
                                    >
                                        vignesh@gmail.com
                                    </a>
                                    <div className="social_icons d-flex align-items-center gap-30 mt-4">
                                        <a className="text-white" href="/">
                                            <BsInstagram className="fs-4" />
                                        </a>
                                        <a className="text-white" href="/">
                                            <BsGithub className="fs-4" />
                                        </a>
                                        <a className="text-white" href="/">
                                            <BsYoutube className="fs-4" />
                                        </a>
                                        <a className="text-white" href="/">
                                            <BsLinkedin className="fs-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="accordion accordion-flush d-md-block d-lg-none px-0"
                                id="accordionFlushExample"
                            >
                                <div className="accordion-item bg-transparent text-light">
                                    <h2
                                        className="accordion-header"
                                        id="flush-headingTwo"
                                    >
                                        <button
                                            className="accordion-button collapsed bg-transparent"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseTwo"
                                        >
                                            Information
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseTwo"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="flush-headingTwo"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="mt-1 ms-4 mb-4">
                                            <div className="footer-links d-flex flex-column">
                                                <Link
                                                    to="/privacy-policy"
                                                    className="text-white py-2 mb-1"
                                                >
                                                    Privacy Policy
                                                </Link>
                                                <Link
                                                    to="/refund-policy"
                                                    className="text-white py-2 mb-1"
                                                >
                                                    Refund Policy
                                                </Link>
                                                <Link
                                                    to="/shiping-policy"
                                                    className="text-white py-2 mb-1"
                                                >
                                                    Shiping Policy
                                                </Link>
                                                <Link
                                                    to="/terms-conditions"
                                                    className="text-white py-2 mb-1"
                                                >
                                                    Terms & Conditions
                                                </Link>
                                                <Link
                                                    to="/"
                                                    className="text-white py-2 mb-1"
                                                >
                                                    Blogs
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 d-none d-lg-block">
                                <h4 className="text-white mb-4">Information</h4>
                                <div className="footer-links d-flex flex-column">
                                    <Link
                                        to="/privacy-policy"
                                        className="text-white py-2 mb-1"
                                    >
                                        Privacy Policy
                                    </Link>
                                    <Link
                                        to="/refund-policy"
                                        className="text-white py-2 mb-1"
                                    >
                                        Refund Policy
                                    </Link>
                                    <Link
                                        to="/shiping-policy"
                                        className="text-white py-2 mb-1"
                                    >
                                        Shiping Policy
                                    </Link>
                                    <Link
                                        to="/terms-conditions"
                                        className="text-white py-2 mb-1"
                                    >
                                        Terms & Conditions
                                    </Link>
                                    <Link
                                        to="/"
                                        className="text-white py-2 mb-1"
                                    >
                                        Blogs
                                    </Link>
                                </div>
                            </div>
                            <div
                                className="accordion accordion-flush d-md-block d-lg-none px-0"
                                id="accordionFlushExample"
                            >
                                <div className="accordion-item bg-transparent text-light">
                                    <h2
                                        className="accordion-header"
                                        id="flush-headingOne"
                                    >
                                        <button
                                            className="accordion-button collapsed bg-transparent"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseThree"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseThree"
                                        >
                                            Account
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseThree"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="flush-headingThree"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="mt-1 ms-4 mb-4">
                                            <div className="footer-links d-flex flex-column">
                                                <Link
                                                    to="/"
                                                    className="text-white py-2 mb-1"
                                                >
                                                    About Us
                                                </Link>
                                                <Link
                                                    to="/"
                                                    className="text-white py-2 mb-1"
                                                >
                                                    Faq
                                                </Link>
                                                <Link
                                                    to="/"
                                                    className="text-white py-2 mb-1"
                                                >
                                                    Contact
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 d-none d-lg-block">
                                <h4 className="text-white mb-4">Account</h4>
                                <div className="footer-links d-flex flex-column">
                                    <Link
                                        to="/"
                                        className="text-white py-2 mb-1"
                                    >
                                        About Us
                                    </Link>
                                    <Link
                                        to="/"
                                        className="text-white py-2 mb-1"
                                    >
                                        Faq
                                    </Link>
                                    <Link
                                        to="/"
                                        className="text-white py-2 mb-1"
                                    >
                                        Contact
                                    </Link>
                                </div>
                            </div>
                            <div
                                className="accordion accordion-flush d-md-block d-lg-none px-0"
                                id="accordionFlushExample"
                            >
                                <div className="accordion-item bg-transparent text-light">
                                    <h2
                                        className="accordion-header"
                                        id="flush-headingOne"
                                    >
                                        <button
                                            className="accordion-button collapsed bg-transparent"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#flush-collapseFour"
                                            aria-expanded="false"
                                            aria-controls="flush-collapseFour"
                                        >
                                            Quick links
                                        </button>
                                    </h2>
                                    <div
                                        id="flush-collapseFour"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="flush-headingFour"
                                        data-bs-parent="#accordionFlushExample"
                                    >
                                        <div className="mt-1 ms-4 mb-4">
                                            <div className="footer-links d-flex flex-column">
                                                <Link
                                                    to="/"
                                                    className="text-white py-2 mb-1"
                                                >
                                                    Laptops
                                                </Link>
                                                <Link
                                                    to="/"
                                                    className="text-white py-2 mb-1"
                                                >
                                                    Headphone
                                                </Link>
                                                <Link
                                                    to="/"
                                                    className="text-white py-2 mb-1"
                                                >
                                                    Watch
                                                </Link>
                                                <Link
                                                    to="/"
                                                    className="text-white py-2 mb-1"
                                                >
                                                    Tablets
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 d-none d-lg-block">
                                <h4 className="text-white mb-4">Quick links</h4>
                                <div className="footer-links d-flex flex-column">
                                    <Link
                                        to="/"
                                        className="text-white py-2 mb-1"
                                    >
                                        Laptops
                                    </Link>
                                    <Link
                                        to="/"
                                        className="text-white py-2 mb-1"
                                    >
                                        Headphone
                                    </Link>
                                    <Link
                                        to="/"
                                        className="text-white py-2 mb-1"
                                    >
                                        Watch
                                    </Link>
                                    <Link
                                        to="/"
                                        className="text-white py-2 mb-1"
                                    >
                                        Tablets
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <footer className="py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <p className="text-center mb-0 text-white">
                                &copy; {new Date().getFullYear()}; Powered by
                                vignesh
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};