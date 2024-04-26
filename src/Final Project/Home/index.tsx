import "./index.css";
import FriendsList from "./FriendsList";
import { Link, Routes, Route, useParams, useNavigate } from "react-router-dom";
import Chat from "./Chat";
import CommentSection from "./Feed/Comment";
import { getExercise } from "./Exercises/client";
import Feed from "./Feed/";
import * as userClient from "../Profile/client";
import { useEffect, useState } from "react";
import Exercises from "./Exercises";
import Header from "../Header";
import FollowingList from "./FollowingList";

interface Exercise {
    name: string;
    bodyPart: string;
    equipment: string;
    gifUrl: string;
    id: number;
    target: string;
    instructions: string[];
}

function Home() {
    const { param, query, id } = useParams();
    const BASE_API = process.env.REACT_APP_BACKEND_URL;
    const [profile, setProfile] = useState({
        profilePicture: null,
        _id: "",
        username: "",
        role: "USER",
    });
    const [message, setMessage] = useState<string>("");
    const [ holder, setHolder ] = useState<string>("");
    const [responses, setResponses] = useState<Exercise[]>([]);
    const navigate = useNavigate();
    const handleSignout = async () => {
        await userClient.signout();
        navigate("/Main/Login");
    }
    const searchExercise = async () => {
        try {
            const exerciseData = await getExercise(message);
            setHolder(message);
            console.log(exerciseData); // JSON data fetched from the server
            setResponses(exerciseData);
            const encodedCriteria = encodeURIComponent(message);
            const url = `/Home/Search/${encodedCriteria}`;
            console.log("Navigating to:", url); // Check the constructed URL
            console.log("Query:", query);
            console.log("Id:", id);
    
            // Update query parameter in the URL
            navigate(url);
        } catch (error) {
            console.error("Error fetching exercise:", error);
        } finally {
            setMessage("");
        }
    }
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
            <div className="split">
                <Header />
                <div className="home-page-container wd-flex-row-container">
                    <div className="home-page-users-container">
                        <div className="home-page-users-pill">
                            <h2>Following List</h2>
                            <FollowingList />
                        </div>
                    </div>
                    <div className="home-page-body-container">
                        <div className="home-page-body-pill">
                            {param === "Community" ? <Feed /> :
                                <>
                                    <div className="search-bar-container">
                                        <textarea value={message} onChange={(e) =>
                                            setMessage(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") { searchExercise() }
                                            }} className="form-control home-page-body-search"></textarea>
                                        <button
                                            onClick={() => searchExercise()}
                                            className="post-button"
                                            style={{ marginLeft: "20px" }}>
                                            Search
                                        </button>
                                    </div>
                                    <Exercises result={responses} search={holder} />
                                </>
                            }
                        </div>
                    </div>
                    <div className="home-page-chat-container d-none d-xl-block">
                        <div className="home-page-chat-pill">
                            <Chat />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
export default Home;