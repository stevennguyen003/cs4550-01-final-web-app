import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./index.css"; // Update to new CSS file for styling changes
import * as client from "./client";
import { findProfileById } from "./client";
import { JsxElement } from "typescript";

function Profile() {
  const [profile, setProfile] = useState({
    _id: "",
    profilePicture: null,
    username: "",
    displayName: "",
    bio: "",
    dob: "",
    experience: "",
    yearsOfExperience: 0,
  });
  const [sessionProfile, setSessionProfile] = useState("");
  const navigate = useNavigate();
  const { param } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const defaultProfilePicUrl = "../images/default.jpeg";
  const [isFollowed, setIsFollowed] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleIsFollowed = () => {
    setIsFollowed(!isFollowed);
    setFollowerCount(followerCount + (isFollowed ? -1 : 1));
  };

  const handleIsEditing = async () => {
    setIsEditing(false);
  };

  const handleProfileEdit = async () => {
    try {
      const response = await client.findUserById(param);
      const newProfile = {
        ...profile,
        username: username ? username : response.username,
        displayName: displayName ? displayName : response.displayName,
        bio: bio ? bio : response.bio,
        yearsOfExperience: yearsOfExperience
          ? yearsOfExperience
          : response.yearsOfExperience,
      };
      const update = await client.updateUser(newProfile);

      if (profilePicture !== null) {
        await client.uploadProfilePicture(response._id, profilePicture);
        console.log("profile picture uploaded", profilePicture);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
    setIsEditing(false);
    setProfilePicture(null);
    fetchProfile();
  };

  async function fetchProfile() {
    try {
      const userResponse = await client.profile();
      if (userResponse) {
        setSessionProfile(userResponse._id as string);
      }
      const response = await client.findUserById(param);
      const formattedDOB = response.dob
        ? new Date(response.dob).toISOString().slice(0, 10)
        : "";
      setProfile({
        ...response,
        dob: formattedDOB,
      });
      setProfilePicture(response.profilePicture);
      setUsername(response.username);
      setDisplayName(response.displayName);
      setBio(response.bio);
      setYearsOfExperience(response.yearsOfExperience);
      if (response.profilePicture) {
        const url = `${process.env.REACT_APP_BACKEND_URL}/${response.profilePicture}`;
        const correctedUrl = url.replace(/\\/g, "/");
        setProfilePic(correctedUrl);
        console.log("Profile Picture: ", correctedUrl);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  }
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <h1 style={{ marginBottom: "30px" }} className="text-gradient">
        Senzu{" "}
      </h1>
      <div className="profile-container">
        <div className="profile-banner"></div>
        <div className="profile-banner"></div>
        <div className="profile-banner"></div>
        <div className="profile-picture">
          <img
            src={profilePic ? profilePic : defaultProfilePicUrl}
            alt="Profile"
            className="profile-image"
          />
        </div>
        <div className="profile-details">
          {isEditing ? (
            <>
              <form>
                <div className="form-group">
                  <label htmlFor="profile-display-name">
                    <b>DISPLAY NAME</b>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    id="profile-display-name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="profile-user-name">
                    <b>USERNAME</b>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    id="profile-user-name"
                    value={username}
                    placeholder={profile.username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="profile-bio">
                    <b>BIO</b>
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    id="profile-bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="profile-yoe">
                    <b>YEARS OF EXPERIENCE IN THE GYM </b>
                  </label>
                  <br />
                  <input
                    type="number"
                    className="form-control"
                    id="profile-yoe"
                    value={yearsOfExperience}
                    defaultValue={0}
                    onChange={(e) =>
                      setYearsOfExperience(Number(e.target.value))
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="profile-picture">
                    <b>PROFILE PICTURE</b>
                  </label>
                  <br />
                  <input
                    type="file"
                    className="form-control"
                    id="profile-picture"
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
                <button
                  onClick={handleProfileEdit}
                  type="button"
                  className="edit-button"
                >
                  Save
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="display-name">{profile.displayName}</h1>
              <div className="username">@{profile.username}</div>
              <div className="description">{profile.bio}</div>
              <div className="details">
                <span className="dob">Born on {profile.dob}</span> <br />
                <span className="experience">
                  {profile.yearsOfExperience} years grinding at the gym
                </span>
                <div className="follower-info">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="edit-button"
                  >
                    {isFollowed ? "Unfollow" : "Follow"}
                  </button>
                  {sessionProfile === profile._id && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                  )}
                  <span className="follower-count">
                    {followerCount} Followers
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Profile;
