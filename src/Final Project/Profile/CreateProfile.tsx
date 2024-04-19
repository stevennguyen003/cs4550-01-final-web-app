import { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import "@fontsource/poppins/700.css";

function CreateProfile() {
  const [showIntro, setShowIntro] = useState(true);
  const handleNextIntro = () => {
    setShowIntro(false); // Hide intro and show questions
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
          <form>
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
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-account-picture">
                <b>
                  PROFILE PICTURE <span className="asterick">*</span>
                </b>
              </label>
              <br />
              <input
                type="file"
                className="form-control"
                id="login-account-picture"
                accept="image/*"
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
              />
            </div>
            <br />
            <Link to="/Home" className="btn btn-primary">
              <b>CREATE PROFILE</b>
            </Link>
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
