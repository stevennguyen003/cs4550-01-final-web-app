import { useEffect, useState } from "react";
import "./index.css"; // Update to new CSS file for styling changes
import * as client from "./client";

function Profile(): JSX.Element {
  const [profile, setProfile] = useState({
    profilePicture: null,
    username: "",
    displayName: "",
    description: "",
    dob: "",
    experience: "",
    yearsOfExperience: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const defaultProfilePicUrl = "../images/default.jpeg";
  const [isFollowed, setIsFollowed] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  const handleIsFollowed = () => {
    setIsFollowed(!isFollowed);
    setFollowerCount(followerCount + (isFollowed ? -1 : 1));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await client.profile();
        console.log(response);
        const formattedDOB = response.dob
          ? new Date(response.dob).toISOString().slice(0, 10)
          : "";
        setProfile({
          ...response,
          dob: formattedDOB,
        });
        if (response.profilePicture) {
          const url = `${process.env.REACT_APP_BACKEND_URL}/${response.profilePicture}`;
          const correctedUrl = url.replace(/\\/g, '/');
          setProfilePic(correctedUrl);
          console.log("Profile Picture: ", correctedUrl);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-banner"></div>
      <div className="profile-banner"></div>
      <div className="profile-banner"></div>
      <div className="profile-picture">
        <img
          src={
            profilePic ? profilePic : defaultProfilePicUrl
          }
          alt="Profile"
          className="profile-image"
        />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            // onChange={(e) => e.target.files && setProfilePic(e.target.files[0])}
          />
        )}
      </div>
      <div className="profile-details">
        <h1 className="display-name">{profile.displayName}</h1>
        <div className="username">@{profile.username}</div>
        <div className="description">{profile.description}</div>
        <div className="details">
          <span className="dob">Born on {profile.dob}</span> <br />
          <span className="experience">
            {profile.yearsOfExperience} years grinding at the gym
          </span>
          <div className="follower-info">
            <button onClick={handleIsFollowed} className="follow-button">
              {isFollowed ? "Unfollow" : "Follow"}
            </button>
            <span className="follower-count">{followerCount} Followers</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
