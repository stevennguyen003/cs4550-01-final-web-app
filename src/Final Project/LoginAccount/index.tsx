import "./index.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginAccount() {
    return (
        <>
            <div className="login-account-body">
                <div className="login-screen-bar">
                    <h1 className="login-screen-header">welcome back</h1> <br />
                    <div className="login-account-form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="login-account-email"><b>EMAIL</b></label> <br />
                                <input type="email" className="form-control" id="login-account-email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="login-account-username"><b>USERNAME</b></label> <br />
                                <input type="username" className="form-control" id="login-account-username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="login-account-password"><b>PASSWORD</b></label> <br />
                                <input type="password" className="form-control" id="login-account-password" />
                            </div>
                            <br />
                            <button type="button" className="btn btn-primary"><b>continue</b></button>
                        </form>
                        <Link to="/CreateAccount">register an account</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginAccount;