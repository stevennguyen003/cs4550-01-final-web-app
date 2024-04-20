import "./index.css"
function FriendsList() {
    const friends = ["Jeffrey", "Steven", "David"];
    return (
        // Replace with complete backend
        <div className="friends-list-container">
            <h1>FriendsList</h1>
            {friends.map((friend, index) =>
                <div key={index}>
                    <h3>{friend}</h3>
                </div>
            )}
        </div>
    )
}
export default FriendsList;