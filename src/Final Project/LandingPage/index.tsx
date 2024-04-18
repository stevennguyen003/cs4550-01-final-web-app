import LoginSidebar from "./Sidebar";
import "./index.css";

function LandingPage() {
    return (
        <>
            <div className="landing-page-body wd-flex-row-container">
                <LoginSidebar />
                <div className="col-md-9">
                    <h1>Space</h1>
                </div>
            </div>
        </>
    );
}
export default LandingPage;