import React, { useState, useEffect } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import "@fontsource/poppins/700.css";
import { fetchUserProfile, signOutUser, User } from '../User/client'; 

function ProfilePage() {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profileData = await fetchUserProfile();
        setUserProfile(profileData);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        navigate("/login");
      }
    };

    loadUserProfile();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/login"); 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!userProfile) {
    return <div>Loading...</div>; 
  }

  const { username, firstName, lastName, bio, profilePicture } = userProfile;
  const displayNameToShow = username || `${firstName} ${lastName}`;
  const bioToShow = bio || "This user has not yet set up a bio.";
  const profilePictureToShow = profilePicture || "defaultProfilePic.png";

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
        <Link to="/editProfile" className="btn btn-primary">Edit Profile</Link>
        <button onClick={handleSignOut} className="btn btn-warning">Sign Out</button>
      </div>
    </div>
  );
}

export default ProfilePage;
