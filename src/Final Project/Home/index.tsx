import "./index.css";
import Chat from "./Chat";
function Home() {
    return (
        <>
            <div className="home-page-container wd-flex-row-container">
                <div className="home-page-settings-container">
                    <div className="home-page-settings-pill">
                        <h1>Profile</h1>
                    </div>
                </div>
                <div className="home-page-body-container">
                    <div className="home-page-body-pill">
                        <h1>Community Posts</h1>
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