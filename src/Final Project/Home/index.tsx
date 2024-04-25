import "./index.css";
import FriendsList from "./FriendsList";
import { Link, Routes, Route } from "react-router-dom";
import Chat from "./Chat";
import CommentSection from "./Feed/Comment";
import { getExercise } from "./Exercises/client";
import Feed from "./Feed/";
import * as userClient from "../Profile/client";
import { useEffect, useState } from "react";
import Exercises from "./Exercises";

interface Exercise {
    name: string;
    bodyPart: string;
    equipment: string;
    gifUrl: string;
    id: Number;
    target: string;
}

function Home() {
    const BASE_API = process.env.REACT_APP_BACKEND_URL;
    const [profile, setProfile] = useState({
        profilePicture: null,
        _id: "",
        username: "",
        role: "USER",
    });
    enum Screens { "Community", "Exercises" }
    const [screen, setScreen] = useState(Screens.Community);
    const [message, setMessage] = useState<string>("");
    const [responses, setResponses] = useState<Exercise[]>([]);
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
            <div className="home-page-container wd-flex-row-container">
                <div className="home-page-users-container">
                <h1 className="text-gradient">Senzu </h1>
                    <div className="home-page-users-pill">
                        <Link to={`/Profile/${profile._id}`}>Profile</Link>
                        <Link to="/">Sign Out</Link>
                        <h1>Friends List</h1>
                        <FriendsList />
                    </div>
                </div>
                <div className="home-page-body-container">
                    <div className="home-page-body-pill">
                        <div className="home-page-body-header">
                            <h2 onClick={() => setScreen(Screens.Community)} className={screen === Screens.Community ? "screen-active" : ""}>Community</h2>
                            <h2 onClick={() => setScreen(Screens.Exercises)} className={screen === Screens.Exercises ? "screen-active" : ""}>Exercises</h2>
                            <textarea value={message} onChange={(e) =>
                                setMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        (async () => {
                                            try {
                                                const exerciseData = await getExercise(message);
                                                console.log(exerciseData); // JSON data fetched from the server
                                                setResponses(exerciseData);
                                            } catch (error) {
                                                console.error("Error fetching exercise:", error);
                                            } finally {
                                                setMessage("");
                                            }
                                        })();
                                    }
                                }} className="form-control home-page-body-search"></textarea>
                        </div>
                        {screen === Screens.Community ? <Feed /> : <Exercises result={responses} />}
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