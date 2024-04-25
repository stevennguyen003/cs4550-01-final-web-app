import axios from 'axios';

export const BASE_API = process.env.REACT_APP_BACKEND_URL;
console.log(`Base API URL: ${BASE_API}`);

const API = axios.create({
  baseURL: BASE_API,
  withCredentials: true
});

export const USERS_API = `${BASE_API}/api/users`;

export interface Friend {
  _id: string;
  requester: string;
  recipient: string;
  status: 'pending' | 'accepted' | 'declined' | 'blocked';
  createdDate: Date;
  confirmedDate?: Date;
}

export const fetchFriends = async (): Promise<Friend[]> => {
  const response = await API.get<Friend[]>('/api/friends/my');
  return response.data;
};

export const sendFriendRequest = async (recipientId: string): Promise<Friend> => {
  const response = await API.post<Friend>('/api/friends', { recipient: recipientId });
  return response.data;
};

export const updateFriendRequest = async (friendId: string, status: 'accepted' | 'declined'): Promise<Friend> => {
  const response = await API.patch<Friend>(`/api/friends/${friendId}`, { status });
  return response.data;
};

export const deleteFriend = async (friendId: string): Promise<void> => {
  await API.delete(`/api/friends/${friendId}`);
};

export const searchUsers = async (query: string) => {
  const response = await API.get(`${USERS_API}/search`, {
    params: { query }
  });
  return response.data;
};
