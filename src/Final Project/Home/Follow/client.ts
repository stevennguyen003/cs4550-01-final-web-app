import axios from 'axios';

const BASE_API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

export const fetchFollowers = async (userId: string) => {
  try {
    const response = await axios.get(`${BASE_API}/api/users/${userId}/followers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching followers:', error);
    throw error;
  }
};

export const fetchFollowings = async (userId: string) => {
  try {
    const response = await axios.get(`${BASE_API}/api/users/${userId}/following`);
    return response.data;
  } catch (error) {
    console.error('Error fetching followings:', error);
    throw error;
  }
};

export const addFollower = async (followerId: string, followeeId: string) => {
  try {
    const response = await axios.post(`${BASE_API}/api/follows`, { followerId, followeeId });
    return response.data;
  } catch (error) {
    console.error('Error adding follower:', error);
    throw error;
  }
};

export const removeFollower = async (followerId: string, followeeId: string) => {
  try {
    const response = await axios.delete(`${BASE_API}/api/follows`, { data: { followerId, followeeId } });
    return response.data;
  } catch (error) {
    console.error('Error removing follower:', error);
    throw error;
  }
};
