import { Icon } from "@iconify/react"
import { Link, useNavigate } from "react-router-dom";

const LogoutModal = (props) => {
    console.log(props.closeBtn, "from home ")
    console.log(props.show, "from home ")
    const navigate = useNavigate()
    const closeBtns = () => {
        props.closeBtn()
    }


    return (
        <div>
            {!props.show ? null : (
                <div className="logoutModal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Do you want to logout?</h4>
                            <button className="close-button" onClick={closeBtns}>
                                <Icon icon="material-symbols:close" />
                            </button>
                        </div>
                        <div className="modal-footer">
                            <Link className="btn btn-primary" to={'/login'} >Yes</Link>
                            <Link className="btn btn-secondary" to={'/'} onClick={closeBtns}>No</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogoutModal;