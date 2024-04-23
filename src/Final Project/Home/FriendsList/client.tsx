import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true
});

export interface Friend {
  _id: string;
  requester: string;
  recipient: string;
  status: 'pending' | 'accepted' | 'declined' | 'blocked';
  createdDate: Date;
  confirmedDate?: Date;
}

// do not need promise but we added for clarity remember to refactor out
export const fetchFriends = async (): Promise<Friend[]> => {
  const response = await API.get<Friend[]>('/friends/my');
  return response.data;
};

export const sendFriendRequest = async (recipientId: string): Promise<Friend> => {
  const response = await API.post<Friend>('/friends', { recipient: recipientId });
  return response.data;
};

export const updateFriendRequest = async (friendId: string, status: 'accepted' | 'declined'): Promise<Friend> => {
  const response = await API.patch<Friend>(`/friends/${friendId}`, { status });
  return response.data;
};

export const deleteFriend = async (friendId: string): Promise<void> => {
  await API.delete(`/friends/${friendId}`);
};
