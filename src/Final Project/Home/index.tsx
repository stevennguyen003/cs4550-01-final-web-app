import "./index.css";
import FriendsList from "./FriendsList";
import { Link, Routes, Route } from "react-router-dom";
import Chat from "./Chat";
import CommentSection from "./Feed/Comment";
import Feed from "./Feed/";
import * as userClient from "../Profile/client";
import { useEffect, useState } from "react";
import Header from "../Header";

function Home() {
    const BASE_API = process.env.REACT_APP_BACKEND_URL;
    const [profile, setProfile] = useState({
        profilePicture: null,
        _id: "",
        username: "",
        role: "USER",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await userClient.profile();
                console.log(response);
                const formattedDOB = response.dob
                    ? new Date(response.dob).toISOString().slice(0, 10)
                    : "";
                setProfile({
                    ...response,
                    dob: formattedDOB,
                });
                if (response.profilePicture && response.profilePicture !== "") {
                    const url = `${BASE_API}/${response.profilePicture}`;
                    const correctedUrl = url.replace(/\\/g, "/");
                    setProfile({
                        ...response,
                        profilePicture: correctedUrl,
                    });
                    //console.log("Profile Picture: ", correctedUrl);
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <>
        <Header /> {/* This will place the header at the top */}
          <div className="home-page-container">
            <div className="main-content">
            <div className="home-page-container wd-flex-row-container">
                <div className="home-page-users-container">
                    <div className="home-page-users-pill">
                        <Link to={`/Profile/${profile._id}`}>Profile</Link>
                        <h1>Friends List</h1>
                        <FriendsList /> {/* take a look at this in a bit */}
                    </div>
                </div>
                <div className="home-page-body-container">
                    <div className="home-page-body-pill">
                        <div className="home-page-body-header">
                            <Link to="/Home/Community"><h3>COMMUNITY</h3></Link>
                            <Link to="/Home/Exercises"><h3>EXERCISES</h3></Link>
                            <textarea className="form-control home-page-body-search"></textarea>
                        </div>
                        <Feed />
                    </div>
                </div>
                <div className="home-page-chat-container d-none d-xl-block">
                    <div className="home-page-chat-pill">
                        <Chat />
                    </div>
                </div>
            </div>
            </div>
            </div>
        </>
    )
}
export default Home;