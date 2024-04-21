import "./index.css";
import FriendsList from "./FriendsList";
import { Link, Routes, Route } from "react-router-dom";
import Chat from "./Chat";
import Posts from "./Posts";
import Exercises from "./Exercises";
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
                            <Link to="/Home/Community"><h3>COMMUNITY</h3></Link>
                            <Link to="/Home/Exercises"><h3>EXERCISES</h3></Link>
                            <textarea className="form-control home-page-body-search"></textarea>
                        </div>
                        <Routes>
                            <Route path="/Community" element={<Posts/>} />
                            <Route path="/Exercises" element={<Exercises/>} />
                        </Routes>
                        <div className="home-page-body-posts">
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