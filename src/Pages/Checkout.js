import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import { Container } from "../components/Container";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
// import Razorpay from "razorpay";
import axios from "axios";

export const Checkout = () => {
  const base_url = process.env.REACT_APP_BASE_URI;
  let [loading, setLoading] = useState(true);
  const [cookies, setCookie] = useCookies(["authToken"]);
  const [user, setuser] = useState();
  const navigate = useNavigate();
  const signupSchema = Yup.object().shape({
    flat: Yup.string().required("Please fill the name"),
    street: Yup.string().required("Please fill the street"),
    city: Yup.string().required("Please fill the city"),
    pincode: Yup.number()
      .typeError('price must be a number')
      .required("Please fill the price"),
  });
  const initPayment = (data) => {
    console.log(data.id)
    const options = {
      key: process.env.SECRET_KEY,
      amount: data.amount,
      currency: data.currency,
      name: "Payment",
      order_id: data.id,
      handler: async (res) => {
        try {
          const verifyUrl = `${base_url}/payment/verify`;
          const { data } = await axios.post(verifyUrl, res, {
            headers: {
              token: cookies.authToken,
              Accept: "application/json",
              "Content-Type": "application/json",
            }
          });
          if (data.message == "payment verified successfully") {
            toast.success("Payment Done !", {
              progressClassName: "success-progress-bar",
            });
            navigate("/");
          }
          else {
            toast.success(data.message, {
              progressClassName: "warning-progress-bar",
            });
          }
        } catch (error) {
          console.log(error)
        }
      },
      theme: {
        color: "#3399cc"
      }
    }
    const razorWindow = new window.Razorpay(options);
    razorWindow.open();
  }
  const handlepayment = async () => {
    const orderUrl = `${base_url}/payment/product-order`;
    const { data } = await axios.post(orderUrl,{},
      {
        headers: {
          token: cookies.authToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      });
      console.log(data)
    initPayment(data.data);
  }

  useEffect(() => {
    const getURL = `${base_url}/user/getUserDetails`;
    fetch(getURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: cookies.authToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setuser(data);
        setLoading(false);
      })
  }, [])

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        {loading ? (<Container><ClipLoader
          color={"orange"}
          loading={loading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        </Container>) : (<div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                <b>Name:</b>{` ${user.name}`}<br />
                <b>Mobile:</b>{` ${user.mobile}`}
              </p>

            </div>
          </div>
          <div className="col-5">
            <h4 className="mb-3">Shipping Address</h4>
            <Formik
              initialValues={{
                flat: user.address.flat,
                street: user.address.street,
                city: user.address.city,
                pincode: user.address.pincode,
              }}
              validationSchema={signupSchema}
              onSubmit={(values, { resetForm }) => {
                handlepayment();
                toast.loading("Please wait", {
                  progressClassName: "success-progress-bar",
                  toastId: 2,
                });
                const postURL = `${base_url}/user/updateAddress`;
                fetch(postURL, {
                  method: "PUT",
                  headers: {
                    token: cookies.authToken,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    // We should keep the fields consistent for managing this data later
                    flat: values.flat,
                    street: values.street,
                    city: values.city,
                    pincode: values.pincode,
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    toast.dismiss(2);
                    handlepayment();
                  })
                  .catch((err) => {
                    toast.update(2, {
                      render: "Failed to fetch",
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
                    name="flat"
                    placeholder="flat no"
                    className="form-control"
                  />
                  {touched.flat && errors.flat ? (
                    <div className="text-danger pt-1 position-relative">
                      <i class="bi bi-info-circle"></i>
                      {` ${errors.flat}`}
                    </div>
                  ) : null}
                  <Field
                    type="text"
                    name="street"
                    placeholder="street"
                    className="form-control"
                  />
                  {touched.street && errors.street ? (
                    <div className="text-danger pt-1 position-relative">
                      <i class="bi bi-info-circle"></i>
                      {` ${errors.street}`}
                    </div>
                  ) : null}
                  <Field
                    type="text"
                    name="city"
                    placeholder="city"
                    className="form-control"
                  />
                  {touched.city && errors.city ? (
                    <div className="text-danger pt-1 position-relative">
                      <i class="bi bi-info-circle"></i>
                      {` ${errors.city}`}
                    </div>
                  ) : null}
                  <Field
                    type="text"
                    name="pincode"
                    placeholder="pincode"
                    className="form-control"
                  />
                  {touched.pincode && errors.pincode ? (
                    <div className="text-danger pt-1 position-relative">
                      <i class="bi bi-info-circle"></i>
                      {` ${errors.pincode}`}
                    </div>
                  ) : null}
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/cart" className="text-dark">
                        <BiArrowBack className="me-2" />
                        Return to Cart
                      </Link>
                      <button type="submit" className="btn button">
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>)}
      </Container>
    </>
  );
};