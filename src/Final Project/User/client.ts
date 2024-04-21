import axios from 'axios';

export interface User {
  _id?: string;
  username: string; 
  password?: string; 
  firstName: string;
  lastName: string;
  email: string;
  dob: Date; 
  profilePicture?: string; 
  bio?: string; 
  phoneNumber?: string; 
  role: "USER" | "VISITOR"; 
  following?: string[]; 
  favorites?: string[]; 
  comments?: string[]; 
  reviews?: string[]; 
}

const API = axios.create({
  baseURL: 'http://localhost:4000/api', // Change to match your actual API base URL
});

export const createUser = async (userData: User) => {
  const response = await API.post<User>('/users', userData);
  return response.data;
};

export const signInUser = async (username: string, password: string) => {
  const response = await API.post<User>('/signin', { username, password });
  return response.data;
};

export const signOutUser = async () => {
  await API.post('/signout');
};

export const fetchUserProfile = async (userId: string) => {
  const response = await API.get<User>(`/users/${userId}`);
  return response.data;
};

export const updateUserProfile = async (userId: string, userData: Partial<User>) => {
  const response = await API.put<User>(`/users/${userId}`, userData);
  return response.data;
};

export const followUser = async (userId: string, targetUserId: string) => {
  const response = await API.put(`/users/${userId}/follow/${targetUserId}`);
  return response.data;
};

export const unfollowUser = async (userId: string, targetUserId: string) => {
  const response = await API.put(`/users/${userId}/unfollow/${targetUserId}`);
  return response.data;
};

