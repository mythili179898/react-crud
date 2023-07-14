import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [username, usernameupdate] = useState("");
    const [password, passwordupdate] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
        sessionStorage.clear();
    }, [])
    const handleLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            fetch("http://localhost:3000/user/" + username).then((res) => { // here we need to call post method by sending username and also call get method 
                return res.json();
            }).then((resp) => {
                console.log(resp)
                // const loginResponse = resp;
                if (Object.keys(resp).length === 0) {
                    toast.warn("Please enter valid user")
                }
                else {
                    if (resp.password === password) { // the second password from usestate
                        toast.success("Success")
                        sessionStorage.setItem("username", username)
                        navigate('/')
                    } else {
                        toast.error("Please enter valid credentials")
                    }
                }
            }).catch((err) => {
                toast.error("login failed due to : " + err.message)
            })
        }
    }
    const validate = () => {
        let result = true;
        let errMsg = "Please enter the value in ";
        if (username === null || username === '') {
            result = false;
            errMsg += 'UserName '
        }
        if (password === null || password === '') {
            result = false;
            errMsg += 'Password '
        }
        if (!result) {
            toast.warn(errMsg)
        }
        return result
    }
    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form onSubmit={handleLogin} className="container">
                        <div className="card">
                            <div className="card-header">
                                <h2>Login</h2>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label className="form-label">User Name <span className="errmsg">*</span> </label>
                                    <input value={username} onChange={e => { usernameupdate(e.target.value) }} className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Password <span className="errmsg">*</span> </label>
                                    <input value={password} onChange={e => { passwordupdate(e.target.value) }} className="form-control"></input>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary mx-3">Login</button>
                                <Link className="btn btn-success" to={'/register'}>New user </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;