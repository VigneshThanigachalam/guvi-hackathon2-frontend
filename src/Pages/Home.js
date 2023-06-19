import React, { useContext, useEffect, useState } from "react";
import { BreadCrum } from "../components/BreadCrum";
import { Container } from "../components/Container";
import { MetaData } from "../components/MetaData";
import { Product } from "../components/Product";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { userContext } from "../App";


export const Home = () => {
    const [state, dispatch] = useContext(userContext);
    let [loading, setLoading] = useState(true);
    const [cookie, setCookie] = useCookies(["authToken"]);
    const [cartUpdate, setcartUpdate] = useState("");
    // const [cart, setcart] = useContext(userContext);
    // const [isLogged, setisLogged] = useContext(userContext);
    // const [filterValue, setfilterValue] = useContext(userContext);



    const addCart = (productId) => {
        toast.loading("Please wait", {
            progressClassName: "success-progress-bar",
            toastId: 2,
        });
        fetch(`${process.env.REACT_APP_BASE_URI}/user/addCart`, {
            method: "POST",
            headers: {
                token: cookie.authToken,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // We should keep the fields consistent for managing this data later
                productId: productId
            })
        }).then(res => res.json()).
            then(data => {
                if (data.message == "Added Successfully") {
                    dispatch({ type: "cartUpdate", payload: productId })
                    toast.update(2, {
                        render: "successfully added",
                        type: "success",
                        hideProgressBar: false,
                        autoClose: 1000,
                        isLoading: false,
                    });
                }
                else {
                    toast.update(2, {
                        render: data.message,
                        type: "warning",
                        hideProgressBar: false,
                        autoClose: 1000,
                        isLoading: false,
                    });
                }
            }).
            catch((err) => {
                toast.update(2, {
                    render: "Failed to add",
                    type: "error",
                    hideProgressBar: false,
                    autoClose: 5000,
                    isLoading: false,
                });
            });
    }

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_BASE_URI}/product/${state.filterValue}`).then(res => res.json()).
            then(data => {
                const queryResult = data.filter((item) => {
                    return item.title.toLowerCase().includes(state.searchQuery.toLowerCase())
                })
                dispatch({ type: "products", payload: queryResult }); setLoading(false)
            })
            .catch(err => console.log(err))
    }, [state.filterValue, state.searchQuery]);

    return (
        <>
            <MetaData title="Home" />
            <Container class1={"cart-wrapper home-wrapper-2 py-5 gap-10"} class2={"d-flex flex-wrap product-container justify-content-center justify-content-lg-start"}>
                {loading ? (<Container><ClipLoader
                    color={"orange"}
                    loading={loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                </Container>) : (<>{
                    
                }
                    {state.products.length?(state.products.map((item) => {
                        return <>
                            <Product img={item.image.url} title={item.title} price={item.price} id={item._id} addCart={() => addCart(item._id)} />
                        </>
                    })):(<><Container><h5>{`No Products found for "${state.searchQuery}"`}</h5></Container></>)}</>)}
            </Container>
        </>
    );
};
