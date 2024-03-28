import LoginSidebar from "./Sidebar";
import Galaxy from "./Galaxy";
import "./body.css";
import { Routes, Route } from "react-router-dom";
import CreateAccount from "../CreateAccount";

function LandingPage() {
    return (
        <>
            <div className="login-account-body">
                <LoginSidebar />
                <Galaxy />
            </div>
        </>
    );
}
export default LandingPage;