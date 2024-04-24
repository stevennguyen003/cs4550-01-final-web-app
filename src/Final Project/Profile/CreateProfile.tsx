import { useState } from "react";
import * as client from "./client";
import "./create.css";
import { Link } from "react-router-dom";
import "@fontsource/poppins/700.css";
import { useNavigate, useLocation } from "react-router-dom";

function CreateProfile() {
  const [showIntro, setShowIntro] = useState(true);
  const handleNextIntro = () => {
    setShowIntro(false); // Hide intro and show questions
  };

  const location = useLocation();
  const userLogin = location.state as {
    username: string;
    password: string;
    email: string;
    dob: Date;
  };
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleProfileSubmit = async (e: { preventDefault: () => void }) => {
    console.log("Submitted");
    e.preventDefault();
    try {
      const user = {
        username: userLogin.username,
        password: userLogin.password,
        email: userLogin.email,
        dob: userLogin.dob,
        firstName,
        lastName,
        displayName,
        bio,
        yearsOfExperience,
      };
      const response = await client.createUser(user); // Assume returns user with ID
      if (profilePicture) {
        await client.uploadProfilePicture(response._id, profilePicture);
      }
      navigate("/Home"); // Redirect to home on success
    } catch (error) {
      console.error("Failed to create profile:", error);
    }
  };

  if (showIntro) {
    // Intro screen
    return (
      <div className="intro-container">
        <h2
          className="mb-4 typewriter text-gradient"
          style={{ fontFamily: "'Poppins'" }}
        >
          Let's Build Your Profile
        </h2>

        <button
          onClick={handleNextIntro}
          style={{
            padding: "18px 24px",
            fontSize: "1.25rem",
            borderRadius: "9999px",
            border: "none",
            backgroundImage:
              "linear-gradient(to bottom right, #3b82f6, #a855f7, #db2777)",
            color: "white",
            textTransform: "uppercase",
            fontWeight: "700",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          className="btn btn-primary btn-next"
        >
          Next
        </button>
      </div>
    );
  } else {
    return (
      <div className="create-account-body">
        <div className="create-account-box">
          <h1 className="login-screen-header text-gradient">
            create your profile &#127769;
          </h1>{" "}
          <br />
          <h3 className="login-screen-header text-gradient">
            let's create a profile for you!
          </h3>
          <br />
          <form onSubmit={handleProfileSubmit}>
            <div className="form-group">
              <label htmlFor="login-account-first-name">
                <b>
                  FIRST NAME <span className="asterick">*</span>
                </b>
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="login-account-first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-account-last-name">
                <b>
                  LAST NAME <span className="asterick">*</span>
                </b>
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="login-account-last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-account-display-name">
                <b>
                  DISPLAY NAME <span className="asterick">*</span>
                </b>
              </label>
              <br />
              <input
                type="text"
                className="form-control"
                id="login-account-display-name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-account-picture">
                <b>PROFILE PICTURE</b>
              </label>
              <br />
              <input
                type="file"
                className="form-control"
                id="login-account-picture"
                accept="image/*"
                onChange={(e) => {
                  setProfilePicture(
                    e.target.files && e.target.files[0]
                      ? e.target.files[0]
                      : null
                  );
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-account-description">
                <b>BIO</b>
              </label>{" "}
              <br />
              <input
                type="text"
                className="form-control"
                id="login-account-description"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-account-level">
                <b>
                  YEARS OF EXPERIENCE IN THE GYM{" "}
                  <span className="asterick">*</span>
                </b>
              </label>
              <br />
              <input
                type="number"
                className="form-control"
                id="login-account-level"
                value={yearsOfExperience}
                defaultValue={0}
                onChange={(e) => setYearsOfExperience(Number(e.target.value))}
              />
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              <b>CREATE PROFILE</b>
            </button>
            <br />
            <Link to="/">Already have an account?</Link>
            <br />
            <br />
            <br />
          </form>
        </div>
      </div>
    );
  }
}
export default CreateProfile;
