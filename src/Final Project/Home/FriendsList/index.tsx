import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { fetchFriends, Friend } from './client'; 

function FriendsList() {
    const [friends, setFriends] = useState<Friend[]>([]);

    useEffect(() => {
        const loadFriends = async () => {
            try {
                const friendsData = await fetchFriends();
                setFriends(friendsData);
            } catch (error) {
                console.error('Failed to fetch friends:', error);
            }
        };

        loadFriends();
    }, []);

    if (friends.length === 0) {
        return <div>No friends added yet.</div>;
    }

    return (
        <div className="friends-list-container">
            {friends.map((friend, index) =>
                <Link to="Profile/1">
                    <div key={index} className="friend">
                        <FaUser className="fs-2" />
                        <div className="friend-display-name">
                            {friend.requester} 
                        </div>
                    </div>
                </Link>
            )}
        </div>
    );
}

export default FriendsList;
