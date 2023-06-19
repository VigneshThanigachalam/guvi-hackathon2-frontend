import React from 'react'
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import { useCookies } from "react-cookie";
import axios from 'axios';
import { Container } from '../components/Container';
import { MetaData } from '../components/MetaData';
import { useEffect } from 'react';
import { ClipLoader } from "react-spinners";
import { AiFillCloseCircle } from "react-icons/ai"


export const UpdateProduct = () => {
    let [loading, setLoading] = useState(true);
    const base_url = process.env.REACT_APP_BASE_URI;
    const { id } = useParams();
    const navigate = useNavigate();
    const [productImage, setproductImage] = useState();
    const categoryArr = ["clothes", "device", "add-on"];
    const [upload, setUpload] = useState();
    const [cookies, setCookie] = useCookies(["authToken"]);
    const [product, setproduct] = useState({})
    const signupSchema = Yup.object().shape({
        name: Yup.string().required("Please fill the name"),
        description: Yup.string().required("Please fill the description"),
        category: Yup.string()
            .required("Please fill the email"),
        category: Yup.string()
            .oneOf(categoryArr, "Please select the category")
            .required("Please select the category"),
        quantity: Yup.number()
            .typeError('quantity must be a number')
            .max(10, "maximum 10")
            .required("Please fill the valid number"),
        price: Yup.number()
            .typeError('price must be a number')
            .required("Please fill the price"),

        file: Yup.string().required("Please attach image"),
    });
    function getImageFileObject(imageFile) {
        setUpload(true);
        setproductImage(imageFile.file);
    }

    function runAfterImageDelete(file) {
        setUpload(false);
        setproductImage(null);
    }
    useEffect(() => {
        const getURL = `${base_url}/product/single/${id}`;
        console.log(getURL)
        fetch(getURL, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                token: cookies.authToken
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setproduct(data);
                setLoading(false);
            })
    }, [])

    return (
        <>
            <MetaData title="Update Product" />
            <Container class1={"cart-wrapper home-wrapper-2 py-5 gap-10"} class2={"d-flex flex-wrap product-container justify-content-center"}>
                {loading ? (<Container><ClipLoader
                    color={"orange"}
                    loading={loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                </Container>) : (
                    <div className='w-100 row justify-content-center'>
                        <div className='col-12 col-md-10'>
                            <Formik
                                initialValues={{
                                    name: product.title,
                                    description: product.description,
                                    quantity: product.quantity,
                                    price: product.price,
                                    category: product.category,
                                    file: product.image.url,
                                }}
                                validationSchema={signupSchema}
                                onSubmit={(values, { resetForm }) => {
                                    const postURL = `${base_url}/product/${id}`;
                                    const data = new FormData();
                                    data.append("title", values.name);
                                    data.append("description", values.description);
                                    data.append("category", values.category);
                                    data.append("quantity", values.quantity);
                                    data.append("price", values.price);
                                    (productImage !=undefined) && data.append("image", productImage);
                                    const a = axios.put(postURL, data, {
                                        headers: {
                                            token: cookies.authToken,
                                        },
                                    });
                                    toast.promise(a, {
                                        pending: {
                                            render() {
                                                return "Please wait";
                                            },
                                            icon: true,
                                        },
                                        success: {
                                            render() {
                                                navigate("/manage-page");
                                                return "successfully updated";
                                            },
                                            icon: true,
                                        },
                                        error: {
                                            render() {
                                                return "Failed to Add";
                                            },
                                        },
                                    });
                                }}>
                                {({ errors, touched, setFieldTouched, setFieldValue, isValid, initialStatus }) => (
                                    <Form className='card m-5 p-5'>
                                        <h1 className='text-center'> Update Product </h1>
                                        <div class="mb-3">
                                            <label for="formFile" class="form-label">Name</label>
                                            <Field
                                                type="text"
                                                name="name"
                                                placeholder="enter name"
                                                className="form-control"
                                            />
                                            {touched.name && errors.name ? (
                                                <div className="text-danger pt-1 position-relative">
                                                    <i class="bi bi-info-circle"></i>
                                                    {` ${errors.name}`}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div class="mb-3">
                                            <label for="formFileMultiple" class="form-label">Description</label>
                                            <Field
                                                type="text"
                                                name="description"
                                                placeholder="enter description"
                                                className="form-control"
                                            />
                                            {touched.description && errors.description ? (
                                                <div className="text-danger pt-1 position-relative">
                                                    <i class="bi bi-info-circle"></i>
                                                    {` ${errors.description}`}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div class="mb-3">
                                            <label for="formFileSm" class="form-label">Category</label>
                                            <Field
                                                as="select"
                                                name="category"
                                                placeholder="enter description"
                                                className="form-select"
                                            >
                                                <option value="">Select</option>
                                                <option value="device">device</option>
                                                <option value="clothes">Clothes</option>
                                                <option value="add-on">Add-on</option>
                                            </Field>
                                            {touched.category && errors.category ? (
                                                <div className="text-danger pt-1 position-relative">
                                                    <i class="bi bi-info-circle"></i>
                                                    {` ${errors.category}`}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div class="mb-3">
                                            <label for="formFileSm" class="form-label">Quantity</label>
                                            <Field
                                                name="quantity"
                                                placeholder="enter quantity"
                                                className="form-control"
                                            />
                                            {touched.quantity && errors.quantity ? (
                                                <div className="text-danger pt-1 position-relative">
                                                    <i class="bi bi-info-circle"></i>
                                                    {` ${errors.quantity}`}
                                                </div>
                                            ) : null}
                                        </div>
                                        <label for="formFileDisabled" class="form-label">Price (Per hour)</label>
                                        <div class="mb-3">
                                            <div className='input-group '>
                                                <span class="input-group-text" id="inputGroup-sizing-default"> $</span>
                                                <Field
                                                    name="price"
                                                    placeholder="enter price"
                                                    className="form-control"
                                                />
                                            </div>
                                            {touched.price && errors.price ? (
                                                <div className="text-danger pt-1 position-relative">
                                                    <i class="bi bi-info-circle"></i>
                                                    {` ${errors.price}`}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div class="mb-3">
                                            <label for="formFile" class="form-label">Image</label>
                                            <Field type="hidden" name="file" value=""></Field>
                                            {(product.image.url == "") && (
                                                <>
                                                    <ImageUploader
                                                        uploadIcon={upload == true && <></>}
                                                        style={{ height: 200, width: 200 }}
                                                        onFileAdded={(img) => {
                                                            getImageFileObject(img);
                                                            setFieldTouched("file");
                                                            setFieldValue("file", "true");
                                                        }}
                                                        onFileRemoved={(img) => runAfterImageDelete(img)}
                                                    />
                                                    {errors.file && upload != true && touched.file ? (
                                                        <div className="text-danger pt-1">
                                                            <i className="bi bi-info-circle"></i>
                                                            {` ${errors.file}`}
                                                        </div>
                                                    ) : null}
                                                </>
                                            )}
                                            {(product.image.url) && (<div className='w-25 card position-relative'>
                                                <img className='p-4' height={"250"} src={product.image.url} />
                                                <div className='position-absolute end-0'><div className='btn'><h3 onClick={() => {
                                                    setproduct((prev) => ({ ...prev, "image": { url: "" } }));
                                                }}><AiFillCloseCircle /></h3></div></div>
                                            </div>)}
                                        </div>
                                        <div className="row px-2 justify-content-between flex-wrap-reverse">
                                            <button
                                                className="btn btn-danger col-12"
                                                type="button"
                                                onClick={() => navigate(-1)}>
                                                Cancel
                                            </button>
                                            <button
                                                className="btn btn-success col-12 mb-3"
                                                type="submit">
                                                Update
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                )}
            </Container >
        </>
    )
}
