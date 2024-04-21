import React from "react";
import * as client from "./client";

interface FollowUnfollowButtonProps {
  currentUserId: string; 
  targetUserId: string; 
  isFollowing: boolean; 
  onToggleFollow: () => void; 
}

export default function FollowUnfollowButton({ currentUserId, targetUserId, isFollowing, onToggleFollow }: FollowUnfollowButtonProps) {
  const handleFollowUnfollow = async () => {
    try {
      if (isFollowing) {
        await client.unfollowUser(currentUserId, targetUserId);
      } else {
        await client.followUser(currentUserId, targetUserId);
      }
      onToggleFollow(); 
    } catch (err) {
      console.error("Failed to toggle follow/unfollow", err);
    }
  };

  return (
    <button onClick={handleFollowUnfollow}>
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}
