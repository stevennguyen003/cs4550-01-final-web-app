import React from "react";
import "./index.css"; 
import { Link } from "react-router-dom";
import "@fontsource/poppins/700.css"; 

const userProfile = {
  firstName: "Jane",
  lastName: "Doe",
  displayName: "JaneD",
  profilePicture: "path/to/image.jpg", 
  bio: "Fitness enthusiast, love to share my journey and inspire others.",
  yearsOfExperience: 5,
};

function ProfilePage() {
  const { firstName, lastName, displayName, profilePicture, bio, yearsOfExperience } = userProfile;

  return (
    <div className="profile-page-container">
      <div className="profile-header text-gradient" style={{ fontFamily: "'Poppins'", padding: "20px", textAlign: "center" }}>
        <img
          src={profilePicture || "defaultProfilePic.png"} 
          alt="Profile"
          style={{ width: "150px", height: "150px", borderRadius: "50%", border: "4px solid white", marginBottom: "20px" }}
        />
        <h1>{displayName || `${firstName} ${lastName}`}</h1> 
        <p>{bio || "This user has not yet set up a bio."}</p>
      </div>
      <div className="profile-body" style={{ padding: "20px" }}>
        <h2>Details</h2>
        <p><strong>Years of Experience in the Gym:</strong> {yearsOfExperience}</p>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/editProfile" className="btn btn-primary" style={{
            padding: "10px 20px",
            borderRadius: "9999px",
            border: "none",
            backgroundImage: "linear-gradient(to bottom right, #3b82f6, #a855f7, #db2777)",
            color: "white",
            textTransform: "uppercase",
            fontWeight: "700",
            cursor: "pointer",
        }}>Edit Profile</Link>
      </div>
    </div>
  );
}

export default ProfilePage;
