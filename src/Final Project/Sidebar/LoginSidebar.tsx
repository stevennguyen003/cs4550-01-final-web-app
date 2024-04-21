import "./index.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginSidebar() {
    return (
        <>
            <div className="login-screen-bar ">
                <h1 className="login-screen-header text-gradient">welcome back &#129415;</h1>
                <br />
                <div className="login-account-form">
                    <form>
                        <div className="form-group"> 
                            <label htmlFor="login-account-username"><b>USERNAME</b></label> <br />
                            <input type="username" className="form-control" id="login-account-username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-account-password"><b>PASSWORD</b></label> <br />
                            <input type="password" className="form-control" id="login-account-password" />
                        </div>
                        <br />
                        <Link to="/Home" className="btn btn-primary"><b>Sign in</b></Link>
                    </form>
                    <Link to="/Main/CreateAccount">Register an account</Link> <br />
                    <Link to="/Home">Just visiting?</Link>
                </div>
            </div>
        </>
    )
}
export default LoginSidebar;