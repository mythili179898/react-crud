import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// import LogoutModal from "./LogoutModal";
const AddCart = () => {
    const navigate = useNavigate();
    const [saveCart, setSaveCart] = useState("")
    const location = useLocation();
    const getBookData = location.state && location.state.getBookData; // getBookData is from home.js using state
    console.log(getBookData, "getBookData")
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (getBookData) {
            const totalPrice = getBookData.reduce((total, item) => total + item.price, 0);
            setTotal(totalPrice);
        }
    }, [getBookData]);

    // const addItem = () => {
    //     e.preventDefault();
    //     let addItems = [...saveCart];
    //     addItems.push(getBookData);
    //     setSaveCart(addItems);
    //     navigate('/');
    // }
    const generatePDF = () => {
        const doc = new jsPDF();
        const columns = ["S.No", "Book Name", "Author", "Price"];
        const rows = getBookData.map((item, index) => [
            index + 1,
            item.title,
            item.author,
            item.price
        ]);
        doc.text(`Total Price: ${total}`, 150, 10);
        // doc.text('Order Description', 10, 10);
        doc.autoTable({ columns, body: rows });
        // Include total price in the PDF
        doc.save('Summary.pdf');
    };


    // const getBooks = location.state && location.state.getBooks;
    // console.log(getBookData, "[[[[[[[[[[")
    // const generatePDF = () => {
    //     const doc = new jsPDF();
    //     const columns = ["S.No", "Book Name", "Author", "Description"];
    //     const rows = getBookData.map((item, index) => [
    //         index + 1,
    //         item.title,
    //         item.author,
    //         item.description
    //     ]);
    //     doc.autoTable({ columns, body: rows });
    //     doc.save('myDocument.pdf');
    // };

    // const generatePDF = () => {
    //     const doc = new jsPDF();
    //     // doc.text('Hello World!', 10, 10);
    //     // doc.text('Order Description', 10, 10);
    //     doc.text(`Total Price: ${total}`, 10, 20);
    //     doc.save('myDocument.pdf');
    // };


    return (
        <>

            {getBookData.length ?
                <div className="table-cart m-4">
                    <div className="float-end d-flex align-items-center mb-3">
                        {/* <Link className="btn btn-primary mx-3" onClick={addItem}>Add Item</Link> */}
                        <Link className="btn btn-info" to={'/'}>Go Back</Link>

                        <button onClick={generatePDF} className="btn btn-info">Generate PDF</button>
                    </div>
                    <table className="table table-bordered" >
                        <thead>
                            <tr>
                                {/* <td><b>Action</b></td> */}
                                <td><b>S.No</b></td>
                                <td><b>Book Name</b></td>
                                <td><b>Author</b></td>
                                <td><b>Price</b></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getBookData && getBookData.map((item) => (
                                    <>
                                        <tr key={item.id}>
                                            {/* <td>
                                        <button className="btn btn-danger">Remove</button>
                                    </td> */}
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.author}</td>
                                            <td>{item.price}</td>

                                        </tr>
                                    </>
                                ))
                            }

                        </tbody>
                    </table>
                    <div className="float-end">
                        <p><b>Total Price : </b> {total}</p>
                    </div>
                </div>

                : <>
                    <div className="cartEmpty">
                        <p>Your Cart is Empty</p>
                    </div>
                    <Link className="btn btn-info" to={'/'}>Go Back</Link>

                </>
            }


        </>

    );
};

export default AddCart;