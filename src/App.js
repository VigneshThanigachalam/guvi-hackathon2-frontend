import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Layout } from "./components/Layout";
import { Contact } from "./Pages/Contact";
import { LogIn } from "./Pages/LogIn";
import { ForgetPassword } from "./Pages/ForgetPassword";
import { Signup } from "./Pages/Signup";
import { ResetPassword } from "./Pages/ResetPassword";
import { Cart } from "./Pages/Cart";
import { SingleProduct } from "./Pages/SingleProduct";
import { Checkout } from "./Pages/Checkout";
import { ProtectAdminRoute, ProtectUserRoute } from "./components/ProtectRoute";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { createContext } from "react";
import { useState } from "react";
import { useReducer } from "react";
import { AdminDashboard } from "./Pages/AdminDashboard";
import { AddProduct } from "./Pages/AddProduct";
import { ManageProduct } from "./Pages/ManageProduct";
import { UpdateProduct } from "./Pages/UpdateProduct";

export const userContext = createContext();

function App() {
    // const [isLogged, setisLogged] = useState(false);
    // const [cart, setcart] = useState();
    const [cookie, setCookie] = useCookies("authToken");
    // const [products, setproducts] = useState();
    // const [filterValue, setfilterValue] = useState(null)

    const initialValues = {
        isLogged: false,
        cart: undefined,
        products: undefined,
        filterValue: null,
        cartUpdate: undefined,
        searchQuery:"",
        role:"",
    }

    const reducer = (state, action) => {

        switch (action.type) {
            case "isLogged":
                return { ...state, isLogged: action.payload };
            case "cart":
                return { ...state, cart: action.payload };
            case "products":
                return { ...state, products: action.payload };
            case "filterValue":
                return { ...state, filterValue: action.payload };
            case "cartUpdate":
                return { ...state, cartUpdate: action.payload };
            case "searchQuery":
                return { ...state, searchQuery: action.payload };
            case "role":
                return { ...state, role: action.payload };

            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, initialValues);
    useEffect(() => {
        if (state.isLogged) {
            const url = `${process.env.REACT_APP_BASE_URI}/user/getCart`;
            fetch(url, {
                method: "GET",
                headers: {
                    token: cookie.authToken
                }
            }).then((res) => res.json()).then((data) => { dispatch({ type: "cart", payload: data.cart }) }).catch((err) => console.log(err))
        }
    }, [state.isLogged, state.cartUpdate]);
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<userContext.Provider value={[state, dispatch]}><Layout /></userContext.Provider>}>
                        <Route index element={<ProtectUserRoute><Home /></ProtectUserRoute>}></Route>
                        <Route path="product/:id" element={<ProtectUserRoute><SingleProduct /></ProtectUserRoute>} />
                        <Route path="contact" element={<ProtectUserRoute><Contact /></ProtectUserRoute>} />
                        <Route path="checkout" element={<ProtectUserRoute><Checkout /></ProtectUserRoute>} />
                        <Route path="cart" element={<ProtectUserRoute><Cart /></ProtectUserRoute>} />
                        <Route path="log-in" element={<LogIn />} />
                        <Route path="forget-password" element={<ForgetPassword />} />
                        <Route path="sign-up" element={<Signup />} />
                        <Route path="reset-password" element={<ResetPassword />} />
                        <Route path="admin-dashboard" element={<ProtectAdminRoute><AdminDashboard /></ProtectAdminRoute>} />
                        <Route path="add-product" element={<ProtectAdminRoute><AddProduct /></ProtectAdminRoute>} />
                        <Route path="manage-page" element={<ProtectAdminRoute><ManageProduct /></ProtectAdminRoute>} />
                        <Route path="update-product/:id" element={<ProtectAdminRoute><UpdateProduct /></ProtectAdminRoute>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
