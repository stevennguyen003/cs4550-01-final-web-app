import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFollowers, fetchFollowings, addFollower, removeFollower } from './client';

interface User {
  _id: string;
  username: string;
}

function FollowersPage() {
  const { userId } = useParams<{ userId: string }>();
  const [followers, setFollowers] = useState<User[]>([]);
  const [followings, setFollowings] = useState<User[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>(userId || ''); 

  useEffect(() => {
    if (userId) {
      fetchFollowers(userId)
        .then(data => setFollowers(data))
        .catch(err => console.error(err));
      fetchFollowings(userId)
        .then(data => setFollowings(data))
        .catch(err => console.error(err));
    }
  }, [userId]);

  const handleAddFollower = async (followeeId: string) => {
    try {
      await addFollower(currentUserId, followeeId);
      alert("Follower added!");
    } catch (error) {
      console.error('Error adding follower:', error);
    }
  };

  const handleRemoveFollower = async (followeeId: string) => {
    try {
      await removeFollower(currentUserId, followeeId);
      alert("Follower removed!");
    } catch (error) {
      console.error('Error removing follower:', error);
    }
  };

  return (
    <div>
      <h1>Followers and Followings</h1>
      <div>
        <h2>Followers:</h2>
        {followers.map((user) => (
          <div key={user._id}>
            {user.username}
            <button onClick={() => handleRemoveFollower(user._id)}>Remove Follower</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Followings:</h2>
        {followings.map((user) => (
          <div key={user._id}>
            {user.username}
            <button onClick={() => handleAddFollower(user._id)}>Add Follower</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FollowersPage;
