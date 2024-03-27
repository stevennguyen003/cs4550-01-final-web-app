import LoginAccount from "../LoginAccount";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import CreateAccount from "../CreateAccount";
function LandingPage() {
    return (
        <>
            <LoginAccount />
            <Routes>
                <Route path="CreateAccount" element={<CreateAccount/>} />
            </Routes>
        </>
    );
}
export default LandingPage;