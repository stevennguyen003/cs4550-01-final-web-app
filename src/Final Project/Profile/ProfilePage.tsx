import React, { useState, useEffect } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import "@fontsource/poppins/700.css";
import { fetchUserProfile, User } from '../User/client'; 

function ProfilePage() {
  const [userProfile, setUserProfile] = useState<User | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userId = "exampleUserId"; // we need new instanve every time 
        const profileData = await fetchUserProfile(userId);
        setUserProfile(profileData);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    loadUserProfile();
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>; 
  }

  const displayNameToShow = userProfile.username || `${userProfile.firstName} ${userProfile.lastName}`;
  const bioToShow = userProfile.bio || "This user has not yet set up a bio.";
  const profilePictureToShow = userProfile.profilePicture || "defaultProfilePic.png";

  return (
    <div className="profile-page-container">
      <div className="profile-header text-gradient" style={{ fontFamily: "'Poppins'", padding: "20px", textAlign: "center" }}>
        <img
          src={profilePictureToShow} 
          alt="Profile"
          style={{ width: "150px", height: "150px", borderRadius: "50%", border: "4px solid white", marginBottom: "20px" }}
        />
        <h1>{displayNameToShow}</h1>
        <p>{bioToShow}</p>
      </div>
      <div className="profile-body" style={{ padding: "20px" }}>
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
