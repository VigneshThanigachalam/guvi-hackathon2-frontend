import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useContext } from "react";
import { userContext } from "../App";
export const Layout = () => {
    const [state, dispatch] = useContext(userContext);
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};
