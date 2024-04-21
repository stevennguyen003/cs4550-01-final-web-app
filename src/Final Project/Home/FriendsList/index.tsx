import "./index.css"
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
function FriendsList() {
    const friends = ["Jeffrey", "Steven", "David", "YOOOOOOOOOOOOOOoooooooOOOOOOOOOOOOOO",
        "Jeffrey", "Steven", "David", "YOOOOOOOOOOOOOOoooooooOOOOOOOOOOOOOO",
        "Jeffrey", "Steven", "David", "YOOOOOOOOOOOOOOoooooooOOOOOOOOOOOOOO",
        "Jeffrey", "Steven", "David", "YOOOOOOOOOOOOOOoooooooOOOOOOOOOOOOOO"
    ];
    return (
        // Replace with complete backend
        <div className="friends-list-container">
            {friends.map((friend, index) =>
                <Link to="Profile/1">
                    <div key={index} className="friend">
                        <FaUser className="fs-2" />
                        <div className="friend-display-name">
                            {friend}
                        </div>
                    </div>
                </Link>
            )}
        </div>
    )
}
export default FriendsList;