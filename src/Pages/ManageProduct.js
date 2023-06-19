import React, { useEffect, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { AiFillDelete } from "react-icons/ai"
import { AiOutlineEdit } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container } from '../components/Container';
import { useCookies } from "react-cookie";
import { MetaData } from '../components/MetaData';



export const ManageProduct = () => {
    let [loading, setLoading] = useState(true);
    const [book, setbook] = useState([]);
    const navigate = useNavigate();
    const [change, setChange] = useState();
    const [deleteId, setdeleteId] = useState("");
    const [cookie, setCookie] = useCookies(["authToken"]);
    useEffect(() => {

        fetch(`${process.env.REACT_APP_BASE_URI}/product/null`).then(res => res.json()).then(data => {
            setLoading(false);
            setbook(data);
        });
    }, [change])
    const handleDelete = () => {
        toast.loading("Please wait", {
            progressClassName: "success-progress-bar",
            toastId: 2,
        });
        fetch(
            `${process.env.REACT_APP_BASE_URI}/product/${deleteId}`,
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    token: cookie.authToken,
                  },
            }
        )
            .then((res) => {
                if (res.statusText == "OK") {
                    toast.update(2, {
                        render: "successfully Deleted",
                        type: "success",
                        hideProgressBar: false,
                        autoClose: 1000,
                        isLoading: false,
                    });
                    setChange(deleteId);
                }
                else {
                    toast.update(2, {
                        render: "Failed to Delete",
                        type: "warning",
                        hideProgressBar: false,
                        autoClose: 5000,
                        isLoading: false,
                    });
                }
            });

    };
    return (
        <>
        <MetaData title="Manage Page" />
            <Container>
                {loading ? (
                    <div className='d-grid justify-content-center align-content-center'>
                        <ClipLoader
                            color={"orange"}
                            loading={loading}
                            size={50}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                ) : (
                    <div className='card p-5 m-5'>
                        <div className="table-responsive">
                            <table className="table table-info my-0 text-center">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Category</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {book == "" ? (<tr><td className='bg-light text-dark' colSpan={5}>No Book found</td></tr>) : book.map((ele, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{ele.title}</td>
                                                <td>{ele.description}</td>
                                                <td>{ele.category}</td>
                                                <td>{ele.quantity}</td>
                                                <td>$ {ele.price}</td>
                                                <td><Link to={`/update-book/${ele._id}`} className='text-light'><h5 className='update-icon text-dark'><AiOutlineEdit /></h5></Link></td>
                                                <td><h5 className='delete-icon' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setdeleteId(ele._id)}><AiFillDelete /></h5></td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Alert !</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        Are you sure?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" onClick={handleDelete} className="btn btn-danger" data-bs-dismiss="modal">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            </Container>
        </>
    )
}