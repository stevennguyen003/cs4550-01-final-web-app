import "./index.css";
import FriendsList from "./FriendsList";
import Chat from "./Chat";
import CommentSection from "./Feed/Comment";
function Home() {
    return (
        <>
            <div className="home-page-container wd-flex-row-container">
                <div className="home-page-users-container">
                    <div className="home-page-users-pill">
                        <h1>Profile and Friends List</h1>
                        <FriendsList />
                    </div>
                </div>
                <div className="home-page-body-container">
                    <div className="home-page-body-pill">
                        <h1>Community Posts</h1>
                        <CommentSection />
                    </div>
                </div>
                <div className="home-page-chat-container">
                    <div className="home-page-chat-pill">
                        <Chat />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;