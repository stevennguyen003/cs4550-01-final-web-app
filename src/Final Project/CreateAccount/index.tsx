import "./index.css";
import { Link } from "react-router-dom";
function CreateAccount() {
    return (
        <>
            <div className="create-account-body">
                <div className="create-account-box">
                    <h1 className="create-account-header">create an account &#127769;</h1> <br />
                    <form>
                        <div className="form-group">
                            <label htmlFor="login-account-email"><b>EMAIL <span className="asterick">*</span></b></label> <br />
                            <input type="email" className="form-control" id="login-account-email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-account-username"><b>USERNAME <span className="asterick">*</span></b></label> <br />
                            <input type="username" className="form-control" id="login-account-username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-account-password"><b>PASSWORD <span className="asterick">*</span></b></label> <br />
                            <input type="password" className="form-control" id="login-account-password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-account-password"><b>RE-ENTER PASSWORD <span className="asterick">*</span></b></label> <br />
                            <input type="password" className="form-control" id="login-account-password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-account-dob"><b>DATE OF BIRTH <span className="asterick">*</span></b></label>
                            <input type="date" className="form-control form-control-sm" id="login-account-dob"/>
                        </div>
                        <br />
                        <Link to="/CreateProfile" className="btn btn-primary"><b>SIGNUP</b></Link>
                        <Link to="/">Already have an account?</Link>
                    </form>
                </div>
            </div>
        </>
    )
}
export default CreateAccount;