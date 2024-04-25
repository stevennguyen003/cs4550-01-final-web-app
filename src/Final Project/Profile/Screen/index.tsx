import Profile from "..";
import ProfileFeed from "../Feed";
import "./index.css";
import Header from "../../Header";
function ProfileScreen() {
    return (
        <>
        <Header />
        <div className="profile-screen-container">
            <div className="profile-picture-container">
                <Profile />
            </div>
            <div className="profile-feed-container">
                <ProfileFeed />
            </div>
        </div>
        </>
    )
}
export default ProfileScreen;