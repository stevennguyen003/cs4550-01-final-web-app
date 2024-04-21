import { useState } from "react";
import "./index.css";

function Profile(): JSX.Element {
  const [profile, setProfile] = useState({
    profilePicture: null,
    username: "testUser",
    displayName: "Mr. Test",
    description: "Testing",
    dob: "09-23-2022",
    experience: "4",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const defaultProfilePicUrl = "../images/default.jpeg";
  const [isFollowed, setIsFollowed] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  return (
    <div className="profile-container">
      <h1 className="profile-heading">Profile</h1>
      <div className="profile-details">
        <div className="profile-picture">
          <img
            src={
              profilePic
                ? URL.createObjectURL(profilePic)
                : defaultProfilePicUrl
            }
            alt="Profile"
          />
        {isEditing && (
            <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && setProfilePic(e.target.files[0])}
            />
        )}
        </div>
        <div className="user-details">
          <div className="username">{profile.username}</div>
          <div className="display-name">{profile.displayName}</div>
          <div className="description">{profile.description}</div>
          <div className="dob">Date of Birth: {profile.dob}</div>
          <div className="experience">Experience in the gym: {profile.experience} years</div>
          <div className="follower-info">
            <button onClick={() => setIsFollowed(!isFollowed)}>
              {isFollowed ? "Unfollow" : "Follow"}
            </button>
            <span>{followerCount} Followers</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
