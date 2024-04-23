import "./index.css";
import * as client from "./client";
function Exercises() {
    return (
        <div className="exercises-screen-container">
            <div className="saved-exercises-container">
                <h1>Saved Exercises</h1>
            </div>
            {/* <div className="vertical-divider"></div> */}
            <div className="exercises-search-container">
                <div className="search-result-container">
                    <h1>Search Results</h1>
                </div>
            </div>
        </div>
    )
}
export default Exercises;