import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import data from './data.json';
import { Icon } from '@iconify/react';
import LogoutModal from "./LogoutModal";

const Home = (props) => {
    console.log(props, "qqqqqqqqqqq")
    const [count, setCount] = useState(0);
    const [getBookData, setGetBookData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [disable, setdisable] = useState([]);
    console.log(data.products, "data")
    let getBooks = data.products;
    const navigate = useNavigate();
    useEffect(() => {
        // this is for redirect the login page if the user is not valid 
        let username = sessionStorage.getItem('username')
        if (username === null || username === '') {
            navigate('/login')
        };
    }, []);
    const addCart = (items) => {
        console.log(items, "items")
        toast.success('Your Book Added Successfully')
        setCount(count + 1);
        let newData = [...getBookData]
        newData.push(items);
        setGetBookData(newData);
        // setdisable([...disable, items.id]);

    }

    const AddCountFunc = (items) => {
        setCount(count + 1, items.id)
    }
    const removeItem = (items) => {
        setCount(count - 1, items.id)
    }

    const cartItems = (e) => {
        e.preventDefault();
        navigate('/addCart', { state: { getBookData } })

    }
    const goToLogin = () => {
        setShowModal(true)
    }
    const onClose = () => {
        setShowModal(false)
    };
    return (
        <div>
            <div className="header">

                <Link to={'/'}>Home</Link>
                <div className="d-flex">
                    <div onClick={(e) => { cartItems(e) }} style={{ cursor: "pointer" }} className="mx-2">
                        <Icon icon="bi:cart" />
                        <span className="setBadge">{count}</span>

                    </div>
                    <button className="btn btn-primary" onClick={goToLogin} >Logout</button>
                    <br />

                </div>



            </div>
            <div className="col-md-12" style={{ position: 'relative', top: 80 }}>
                <h2>Welcome to Books Shop</h2>

                <LogoutModal show={showModal} closeBtn={onClose} />

                <div className="d-flex flex-wrap gap-3" style={{
                    width: '80%',
                    margin: '0 auto'
                }}>
                    {
                        getBooks.map((item) => (
                            <div className="card" key={item.id} style={{ width: '32.4%' }}>
                                <div className="card-body items">
                                    <div style={{ textAlign: "initial" }} >
                                        <div className="img-wrapper"><img src={item.image} alt="img" className="imgCls" /></div>
                                        <div><b>Book Name :</b> {item.title}</div>
                                        <div><b>Description : </b> {item.description}</div>

                                        <div><b>Author:</b> {item.author}</div>
                                        <div><b>Price:</b> {item.price}</div>
                                        <br />
                                        <div><b>Added Items Count :</b>{count}</div>
                                    </div>
                                </div>
                                <div className="card-footer" style={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
                                    <button className="btn btn-danger" onClick={() => { removeItem(item) }}>-</button>

                                    <button className="btn add-btn" style={{ whiteSpace: "nowrap" }} onClick={() => { addCart(item) }}>Add Cart
                                    </button>
                                    <button className="btn btn-success" onClick={() => { AddCountFunc(item) }}>+</button>


                                </div>
                                {/* <div className="card-footer">
                                    <button className="btn add-btn" onClick={() => { addCart(item) }}
                                        disabled={disable.includes(item.id)}
                                    >
                                        {disable.includes(item.id) ? "Added to Cart" : "Add Cart"}
                                    </button>
                                </div> */}
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* <div className="Table-Data"> */}
            {/* <div className="float-end mb-3 mr-5">
                    <Link className="btn btn-primary" to={'/register'}>Add User</Link>
                </div> */}
            {/* <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Address</td>
                            <td>Country</td>
                            <td>Gender</td>
                            <td>Phone</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            responseVal && responseVal.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>{item.country}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.phone}</td>
                                    <td className="d-flex align-items-center justify-content-center">
                                        <button className="btn btn-info mx-3" >Edit</button>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table> */}
            {/* </div> */}
        </div>
    );
}

export default Home;