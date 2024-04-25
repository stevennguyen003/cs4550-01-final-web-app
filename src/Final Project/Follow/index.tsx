import React, { useState, useEffect } from "react";
import * as client from "./client";

interface User {
    _id: string;
    username: string;
}

const UserComponent = () => {
    const [userId, setUserId] = useState<string>(""); // do we configure to use id from
    const [following, setFollowing] = useState<User[]>([]);
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchFollowers = async () => {
        setLoading(true);
        const followers = await client.getFollowers(userId);
        setFollowers(followers);
        setLoading(false);
    };

    const fetchFollowing = async () => {
        setLoading(true);
        const following = await client.getFollowing(userId);
        setFollowing(following);
        setLoading(false);
    };

    const handleFollow = async (followId: string) => {
        setLoading(true);
        await client.followUser(followId);
        await fetchFollowers();
        await fetchFollowing();
        setLoading(false);
    };

    const handleUnfollow = async (unfollowId: string) => {
        setLoading(true);
        await client.unfollowUser(unfollowId);
        await fetchFollowers();
        await fetchFollowing();
        setLoading(false);
    };

    useEffect(() => {
        if (userId) {
            fetchFollowers();
            fetchFollowing();
        }
    }, [userId]);

    return (
        <div>
            <h2>Followers</h2>
            {loading ? <p>Loading...</p> : followers.map((follower: User) => (
              <div key={follower._id}>
                {follower.username}
                <button onClick={() => handleUnfollow(follower._id)}>Unfollow</button>
              </div>
            ))}
            <h2>Following</h2>
            {loading ? <p>Loading...</p> : following.map(follow => (
                <div key={follow._id}>
                    {follow.username}
                    <button onClick={() => handleFollow(follow._id)}>Follow</button>
                </div>
            ))}
        </div>
    );
};

export default UserComponent;