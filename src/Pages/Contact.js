import React from "react";
import { BreadCrum } from "../components/BreadCrum";
import { MetaData } from "../components/MetaData";
import { AiOutlineHome } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { BiInfoCircle } from "react-icons/bi";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Contact = () => {
    const base_url = process.env.REACT_APP_BASE_URI;
  const [cookie, setCookie] = useCookies(["authToken"]);
    const navigate = useNavigate();
    const signupSchema = Yup.object().shape({
        name: Yup.string().required("Please fill the name"),
        email: Yup.string()
          .email("must have a valid email")
          .required("Please fill the email"),
        mobile: Yup.number()
          .min(10, "must contan 10 digits")
          .required("Please fill the mobile number"),
          query: Yup.string()
          .required("Please fill the query")
      });
    return (
        <>
            <MetaData title="Contact Us" />
            {/* <BreadCrum title="Contact Us" /> */}
            <div className="contact-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d524.6373379818484!2d79.86120025943843!3d13.099902506627851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1675598345780!5m2!1sen!2sin"
                                width="600"
                                height="450"
                                className="border-0 w-100"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div className="col-12 mt-5">
                            <div className="contact-inner-wrapper d-flex justify-content-between row">
                                <div className="col-12 col-md-6 mb-sm-4 mb-md-0">
                                    <h3 className="contact-title mb-4">
                                        Contact
                                    </h3>
                                    <Formik
                initialValues={{
                  name: "",
                  email: "",
                  mobile: "",
                  query: "",
                }}
                validationSchema={signupSchema}
                onSubmit={(values, { resetForm }) => {
                  toast.loading("Please wait", {
                    progressClassName: "success-progress-bar",
                    toastId: 2,
                  });
                  const postURL = `${base_url}/user/queryMessage`;
                  fetch(postURL, {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                      token: cookie.authToken
                    },
                    body: JSON.stringify({
                      // We should keep the fields consistent for managing this data later
                      name: values.name,
                      email: values.email,
                      mobile: values.mobile,
                      query: values.query,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                        resetForm();
                        toast.update(2, {
                          render: "successfully sent",
                          type: "success",
                          hideProgressBar: false,
                          autoClose: 1000,
                          isLoading: false,
                        });
                        navigate("/");
                    })
                    .catch((err) => {
                      toast.update(2, {
                        render: "Failed to send",
                        type: "error",
                        hideProgressBar: false,
                        autoClose: 5000,
                        isLoading: false,
                      });
                    });
                }}>
                {({ errors, touched }) => (
                  <Form className="d-flex flex-column gap-15">
                    <Field
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="form-control"
                    />
                    {touched.name && errors.name ? (
                      <div className="text-danger pt-1 position-relative">
                        <i class="bi bi-info-circle"></i>
                        {` ${errors.name}`}
                      </div>
                    ) : null}
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                    />
                    {touched.email && errors.email ? (
                      <div className="text-danger pt-1 position-relative">
                        <i class="bi bi-info-circle"></i>
                        {` ${errors.email}`}
                      </div>
                    ) : null}
                    <Field
                      type="tel"
                      name="mobile"
                      placeholder="Mobile Number"
                      className="form-control"
                    />
                    {touched.mobile && errors.mobile ? (
                      <div className="text-danger pt-1 position-relative">
                        <i class="bi bi-info-circle"></i>
                        {` ${errors.mobile}`}
                      </div>
                    ) : null}
                    <Field
                      as="textarea"
                      name="query"
                      placeholder="Query..."
                      className="form-control"
                    />
                    {touched.query && errors.query ? (
                      <div className="text-danger pt-1 position-relative">
                        <i class="bi bi-info-circle"></i>
                        {` ${errors.query}`}
                      </div>
                    ) : null}
                    <div>
                      <div className="mt-3 d-flex gap-15 justify-content-center align-items-center">
                        <button className="button border-0" type="submit">
                          Send message
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
                                </div>
                                <div className="col-12 col-md-6">
                                    <h3 className="contact-title mb-4">
                                        Get in touch with us
                                    </h3>
                                    <div>
                                        <ul className="ps-0">
                                            <li className="mb-3 d-flex gap-15 align-items-center">
                                                <AiOutlineHome />
                                                <address className="mb-0">
                                                    Home:22, Near hospital,
                                                    Madurai,Thiruvallur
                                                </address>
                                            </li>
                                            <li className="mb-3 d-flex gap-15 align-items-center">
                                                <BiPhoneCall />
                                                <a href="tel:+91 9952671261">
                                                    +91 9952671261
                                                </a>
                                            </li>
                                            <li className="mb-3 d-flex gap-15 align-items-center">
                                                <AiOutlineMail />
                                                <a href="mailto:+91 9952671261">
                                                    mail@gmail.com
                                                </a>
                                            </li>
                                            <li className="mb-3 d-flex gap-15 align-items-center">
                                                <BiInfoCircle />
                                                <p className="mb-0">
                                                    Monday - Friday 10 AM - 8 PM
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
