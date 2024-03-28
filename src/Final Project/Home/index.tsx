import "./index.css";
function Home() {
    return (
        <>
            <div className="home-page-container wd-flex-row-container">
                <div className="home-page-settings-container">
                    <div className="home-page-settings-pill">
                        <h1>Settings</h1>
                    </div>
                </div>
                <div className="home-page-body-container">
                    <div className="home-page-body-pill">
                        <h1>Body</h1>
                    </div>
                </div>
            </div>
            <div className="playback-bar-container">
                <h1>Playback</h1>
            </div>
        </>
    )
}
export default Home;