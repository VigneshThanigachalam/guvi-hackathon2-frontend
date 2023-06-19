import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ClipLoader from "react-spinners/ClipLoader";
import { Container } from "./Container";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { useContext } from "react";


export const ProtectUserRoute = ({ children, setlog }) => {
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_BASE_URI;
  const [cookie, setCookie] = useCookies(["authToken"]);
  let [loading, setLoading] = useState(true);
  const [state, dispatch] = useContext(userContext);

  useEffect(() => {
    const postURL = `${base_url}/user/validateToken`;
    cookie.authToken && cookie.authToken != "undefined"
      ? fetch(postURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookie.authToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if ("verified" !== data.token) {
            navigate("/log-in");
          } else {
            dispatch({ type: "isLogged", payload: true });
            dispatch({ type: "role", payload: data.role });
            if(data.role == "admin"){
              navigate("admin-dashboard");
            }
            setLoading(false);
          }
        })
      : navigate("/log-in");
  }, []);
  return (
    <>
      {loading ? (
        <Container
          class1={
            "cart-wrapper home-wrapper-2 d-flex position-fixed top-50 start-50 translate-middle"
          }>
          <ClipLoader
            color={"orange"}
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Container>
      ) : (
        children
      )}
    </>
  );
};


export const ProtectAdminRoute = ({ children, setlog }) => {
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_BASE_URI;
  const [cookie, setCookie] = useCookies(["authToken"]);
  let [loading, setLoading] = useState(true);
  const [state, dispatch] = useContext(userContext);

  useEffect(() => {
    const postURL = `${base_url}/user/validateToken`;
    cookie.authToken && cookie.authToken != "undefined"
      ? fetch(postURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: cookie.authToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if ("verified" !== data.token) {
            navigate("/log-in");
          } else {
            dispatch({ type: "isLogged", payload: true });
            dispatch({ type: "role", payload: data.role });
            setLoading(false);
          }
        })
      : navigate("/log-in");
  }, []);
  return (
    <>
      {loading ? (
        <Container
          class1={
            "cart-wrapper home-wrapper-2 d-flex position-fixed top-50 start-50 translate-middle"
          }>
          <ClipLoader
            color={"orange"}
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Container>
      ) : (
        (state.role == "admin") ? children : (<Container><h4 className="text-center p-5">You are not an admin</h4></Container>)
      )}
    </>
  );
};
