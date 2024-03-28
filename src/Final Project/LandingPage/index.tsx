import LoginAccount from "../LoginAccount";
import { Routes, Route } from "react-router-dom";
import CreateAccount from "../CreateAccount";

function Impact() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginAccount />} />
                <Route path="CreateAccount" element={<CreateAccount />} />
            </Routes>
        </>
    );
}
export default Impact;