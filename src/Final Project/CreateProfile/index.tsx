import './index.css';
import { Link } from "react-router-dom";
function CreateProfile() {
    return (
        <>
            <div className="create-account-body">
                <div className="create-account-box">
                    <h1 className="create-account-header">create your profile &#127769;</h1> <br />
                    <h3 className="create-account-header">let's create a profile for you!</h3><br />
                    <form>
                        <div className="form-group">
                            <label htmlFor="login-account-first-name"><b>FIRST NAME*</b></label> <br />
                            <input type="text" className="form-control" id="login-account-first-name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-account-last-name"><b>LAST NAME*</b></label> <br />
                            <input type="text" className="form-control" id="login-account-last-name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-account-display-name"><b>DISPLAY NAME*</b></label> <br />
                            <input type="text" className="form-control" id="login-account-display-name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-account-picture"><b>PROFILE PICTURE*</b></label> <br />
                            <input type="image" className="form-control" id="login-account-picture" alt="Profile Picture" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-account-description"><b>PROFILE DESCRIPTION*</b></label> <br />
                            <input type="text" className="form-control" id="login-account-description" />
                        </div>  
                        <div className="form-group">
                            <label htmlFor="login-account-level"><b>YEARS OF EXPERIENCE IN THE GYM*</b></label> <br />
                            <input type="number" className="form-control" id="login-account-level" />
                        </div> 
                        <br />
                        <Link to="/Home" className="btn btn-primary"><b>CREATE PROFILE</b></Link>
                        <Link to="/">Already have an account?</Link>
                        <br /><br /><br />
                    </form>
                </div>
            </div>
        </>
    )
}
export default CreateProfile;