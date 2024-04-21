import "./index.css";
import FriendsList from "./FriendsList";
import { Link } from "react-router-dom";
import Chat from "./Chat";
import CommentSection from "./Feed/Comment";
import Feed from "./Feed/";
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
                        <div className="home-page-body-header">
                            <Link to="/"><h3>FRIENDS</h3></Link>
                            <Link to="/"><h3>FOR YOU</h3></Link>
                        </div>
                        <Feed />
                        <div className="home-page-body-posts">
                        </div>
                        <div className="condensed-chatlog d-block d-xl-none">
                            <h1>ChatLog</h1>
                        </div>
                    </div>
                </div>
                <div className="home-page-chat-container d-none d-xl-block">
                    <div className="home-page-chat-pill">
                        <Chat />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;