import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [password, passwordchange] = useState("");
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [country, countrychange] = useState("india");
    const [address, addresschange] = useState("");
    const [gender, genderchange] = useState("male");

    const navigate = useNavigate();
    // for validation
    const IsValidate = () => {
        let isProceed = true;
        let errMsg = 'Please enter the value in ';
        if (id === null || id === '') {
            isProceed = false;
            errMsg += 'Username ';
        }
        if (password === null || password === '') {
            isProceed = false;
            errMsg += 'Password '
        }
        if (name === null || name === '') {
            isProceed = false;
            errMsg += 'FullName '
        }
        if (email === null || email === '') {
            isProceed = false;
            errMsg += 'Email '
        }
        if (phone === null || phone === '') {
            isProceed = false;
            errMsg += 'phone '
        }
        if (!isProceed) {
            toast.warn(errMsg)
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {

            } else {
                isProceed = false;
                toast.warn('Please enter valid email')
            }
        }
        return isProceed;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let regObj = { id, name, password, email, phone, country, address, gender }
        console.log(regObj, "regObj")
        if (IsValidate()) {
            fetch("http://localhost:3000/user", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regObj)
            }).then((res) => {
                // debugger
                // console.log(res)
                toast.success('Registered Successfully')
                navigate('/login')

            }).catch((err) => {
                // console.log(err.message)
                toast.error('Failed' + err.message)
            })
        }
    }
    return (
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h2>Register</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-label">User Name <span className="errmsg">*</span></label>
                                        <input className="form-control" value={id} onChange={e => idchange(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-label">Password <span className="errmsg">*</span></label>
                                        <input className="form-control" value={password} onChange={e => passwordchange(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-label">Full Name <span className="errmsg">*</span></label>
                                        <input className="form-control" value={name} onChange={e => namechange(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-label">Email <span className="errmsg">*</span></label>
                                        <input className="form-control" value={email} onChange={e => emailchange(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-label">Phone <span className="errmsg">*</span></label>
                                        <input className="form-control" value={phone} onChange={e => phonechange(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-label">Country</label>
                                        <select className="form-control" value={country} onChange={e => countrychange(e.target.value)}>
                                            <option value="india">India</option>
                                            <option value="usa">USA</option>
                                            <option value="singapore">Singapore</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label className="form-label">Address </label>
                                        <textarea className="form-control" value={address} onChange={e => addresschange(e.target.value)}></textarea>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-label">Gender</label>
                                        <input type="radio" checked={gender === 'male'} onChange={e => genderchange(e.target.value)} name="gender" value="male" className="app-check"></input>
                                        <label>Male</label>
                                        <input type="radio" checked={gender === 'female'} onChange={e => genderchange(e.target.value)} name="gender" value="female" className="app-check"></input>
                                        <label>Female</label>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="sumbit" className="btn btn-primary mx-3">Register</button>
                            <Link type="button" className="btn btn-danger " to={'/login'}>Login</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;