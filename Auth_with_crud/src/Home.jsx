import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import data from './data.json';
import { Icon } from '@iconify/react';

const Home = () => {
    const [count, setCount] = useState(0);
    const [getBookData, setGetBookData] = useState([])
    // let [bookVal, setBookVal] = useState("")
    console.log(data.products, "data")
    let getBooks = data.products;
    // setBookVal(getBooks)
    // const [responseVal, loginResponse] = useState("")
    const navigate = useNavigate();
    // const location = useLocation();
    useEffect(() => {
        // this is for redirect the login page if the user is not valid 
        let username = sessionStorage.getItem('username')
        if (username === null || username === '') {
            navigate('/login')
        };
    }, []);

    // const loginResponse = location.state && location.state.loginResponse;
    // console.log(loginResponse, "login_resssssss")
    const addCart = (items) => {
        console.log(items, "items")
        toast.success('Your Book Added Successfully')
        setCount(count + 1);
        let newData = [...getBookData]
        newData.push(items);
        setGetBookData(newData)
        // console.log(getBookData);

    }
    const cartItems = () => {
        navigate('/addCart', { state: { getBookData } })

    }
    return (
        <div>
            <div className="header">
                <Link to={'/'}>Home</Link>
                <Link to={'/login'}>Logout</Link>
                <div onClick={cartItems}>
                    <Icon icon="bi:cart" />
                    <span className="setBadge">{count}</span>
                </div>


            </div>
            <h2>Welcome to Books Shop</h2>
            <div className="col-md-12">
                <div className="d-flex flex-wrap gap-3" style={{
                    width: '80%',
                    margin: '0 auto'
                }}>
                    {
                        getBooks.map((item) => (
                            <div className="card" key={item.id} style={{ width: '32.4%' }}>
                                <div className="card-body items">
                                    <div style={{ textAlign: "initial" }}>
                                        <img src={item.image} alt="img" className="imgCls" />
                                        <div><b>Book Name :</b> {item.title}</div>
                                        <div><b>Description : </b> {item.description}</div>

                                        <div><b>Author:</b> {item.author}</div>
                                        <div><b>Price:</b> {item.price}</div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button className="btn add-btn" onClick={() => { addCart(item) }} >Add Cart</button>
                                </div>
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