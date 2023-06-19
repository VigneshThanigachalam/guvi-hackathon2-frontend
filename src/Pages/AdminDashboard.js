import React from 'react'
import { Container } from '../components/Container'
import { MetaData } from '../components/MetaData'
import { AiFillPlusCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
    const navigate = useNavigate();
    return (
        <>
            <MetaData title="Admin Dashboard" />
            <Container class1={"cart-wrapper home-wrapper-2 py-5"} class2={"d-flex flex-wrap product-container"}>
                <div className='row w-100'>
                    <div className='col-12 col-md-4 dash-image' onClick={()=> navigate("/add-product")}>
                        <div className='card'>
                            <div className="card-header">
                                <img
                                    className="img-fluid p-4 d-flex m-auto"
                                    src="images/addProduct.png"
                                    alt="Card image"
                                />
                            </div>
                            <div className='position-absolute add-icon'><h2 className='text-center'><AiFillPlusCircle /><br />Add</h2></div>
                        </div>
                    </div>
                    <div className='col-12 col-md-4 dash-image' onClick={()=> navigate("/manage-page")}>
                        <div className='card'>
                            <div className="card-header">
                                <img
                                    className="img-fluid p-4 d-flex m-auto"
                                    src="images/manageProduct.png"
                                    alt="Card image"
                                />
                            </div>
                            <div className='position-absolute add-icon'><h2 className='text-center'><AiFillPlusCircle /><br />Manage</h2></div>
                        </div>
                    </div>
                </div>
            </Container></>
    )
}
