import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { User } from "../Profile/client";
import * as client from "../Profile/client";


function LoginSidebar() {
const [credentials, setCredentials] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    displayName: "",
    role: "USER",
    email: "",
    dob: new Date(), // Fix: Change the type from string to Date
    profilePicture: "",
    bio: "",
    yearOfExperience: 0,
    sex: "",
});
// const toast = useToast();
const navigate = useNavigate();
const signin = async () => {
    try {
        const user = await client.signin(credentials);
        // toast({
        //     title: "Log in successfully!",
        //     description: `Welcome, ${user.displayName}`,
        //     status: "success",
        //     isClosable: true,
        //     duration: 3000,
        //     colorScheme: "#1DB954",
        //   });
        navigate("/Home/Community");
    } catch (error) {
        // toast({
        //     title: "Log in Failed!",
        //     description: `Try again with correct credentials`,
        //     status: "error",
        //     isClosable: true,
        //     duration: 3000,
        //   });
};};
  return (
    <>
      <div className="login-screen-bar ">
        <h1 className="login-screen-header text-gradient">
          welcome back &#129415;
        </h1>
        <br />
        <div className="login-account-form">
          <form>
            <div className="form-group">
              <label htmlFor="login-account-username">
                <b>USERNAME</b>
              </label>{" "}
              <br />
              <input
                type="username"
                className="form-control"
                id="login-account-username"
                value={credentials.username} onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })}/>
            </div>
            <div className="form-group">
              <label htmlFor="login-account-password">
                <b>PASSWORD</b>
              </label>{" "}
              <br />
              <input
                type="password"
                className="form-control"
                id="login-account-password"
                value={credentials.password} onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })}/>
            </div>
            <br />
            <button onClick={signin} className="btn btn-primary post-button">
              <b>Sign in</b>
            </button>
          </form>
          <Link to="/Main/CreateAccount">Register an account</Link> <br />
          <Link to="/Home/Community">Just visiting?</Link>
        </div>
      </div>
    </>
  );
}
export default LoginSidebar;
