import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import * as client from "../Profile/client";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleSignout = async () => {
    await client.signout();
    navigate("/Main/Login");
  };

  const [profile, setProfile] = React.useState<client.User>();
  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await client.profile();
        setProfile(response);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <header className="header-container">
      <Link to="/Home/Community" className="header-logo">
        <h1 className="logo-text text-gradient">Senzu 🦇</h1>
      </Link>
      <Link to="/Home/Community" className="header-logo">
        <h2 className="text-gradient">Community</h2>
      </Link>
      <Link to="/Home/Exercises" className="header-logo">
        <h2 className="text-gradient">Exercises</h2>
      </Link>
      <div className="home-page-user">
        <Link className="text-gradient" to={`/Profile/${profile?._id}`}>
          Profile
        </Link>
        {profile?.role === "ADMIN" && (
          <Link
            className="text-gradient"
            style={{ marginLeft: "20px" }}
            to="/Home/Users"
          >
            Users
          </Link>
        )}
        {profile ? (
        <button
          onClick={handleSignout}
          className="post-button"
          style={{ marginLeft: "20px" }}
        >
          Signout
        </button>
        ) : (
        <button
          onClick={() => navigate("/Main/Login")}
          className="post-button"
          style={{ marginLeft: "20px" }}
        >
          Signin
        </button>
        )}
      </div>
      {/* we can add other nav links this section*/}
    </header>
  );
}

export default Header;
