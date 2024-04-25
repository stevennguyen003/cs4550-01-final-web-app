import { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
function CreateAccount() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dob, setDob] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e : any) => {
            e.preventDefault();
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            try {
                navigate('/Profile/create', { state: { username, password, email, dob } }); // Passing initial login data to CreateProfile
            } catch (error: any) {
                console.error('Signup failed:', error.response.data);
                alert("Signup failed: " + error.response.data.message);
            }
        };

    return (
        <>
        <div className="login-screen-bar">
          <div>
            <h1 className="login-screen-header text-gradient">Create an Account &#127769;</h1>
            <br />
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label htmlFor="login-account-email"><b>EMAIL <span className="asterick">*</span></b></label>
                <br />
                <input type="email" className="form-control" id="login-account-email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="login-account-username"><b>USERNAME <span className="asterick">*</span></b></label>
                <br />
                <input type="text" className="form-control" id="login-account-username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="login-account-password"><b>PASSWORD <span className="asterick">*</span></b></label>
                <br />
                <input type="password" className="form-control" id="login-account-password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="login-account-confirm-password"><b>RE-ENTER PASSWORD <span className="asterick">*</span></b></label>
                <br />
                <input type="password" className="form-control" id="login-account-confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="login-account-dob"><b>DATE OF BIRTH <span className="asterick">*</span></b></label>
                <br />
                <input type="date" className="form-control" id="login-account-dob" value={dob} onChange={(e) => setDob(e.target.value)} />
              </div>
              <br />
              <button type="submit" className="btn btn-primary post-button"><b>SIGN UP</b></button>
              <br />
              <Link to="/">Already have an account?</Link>
            </form>
          </div>
        </div>
      </>
    );
  }
  
  export default CreateAccount;