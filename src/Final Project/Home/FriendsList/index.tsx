import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { fetchFriends, Friend } from './client'; 

function FriendsList() {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    // Filter friends based on search term
    const filteredFriends = friends.filter(friend => 
        friend.requester.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="friends-list-container">
            <input
                type="text"
                placeholder="Search friends..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
            />
            {filteredFriends.length > 0 ? (
                filteredFriends.map((friend, index) =>
                    <Link to={`/Profile/${friend._id}`} key={index}>
                        <div className="friend">
                            <FaUser className="fs-2" />
                            <div className="friend-display-name">
                                {friend.requester} 
                            </div>
                        </div>
                    </Link>
                )
            ) : (
                <div>No friends found or added yet.</div>
            )}
        </div>
    );
}

export default FriendsList;
