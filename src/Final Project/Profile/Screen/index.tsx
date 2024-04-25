import Profile from "..";
import ProfileFeed from "../Feed";
import { Link } from "react-router-dom";
import "./index.css";
function ProfileScreen() {
    return (
        <div className="profile-screen-container">
            <div className="profile-picture-container">
                <Profile />
            </div>
            <div className="profile-feed-container">
                <ProfileFeed />
            </div>
        </div>
    )
}
export default ProfileScreen;