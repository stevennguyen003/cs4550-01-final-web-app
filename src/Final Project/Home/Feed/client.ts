import axios from "axios";
import { response } from "express";
export const BASE_API = process.env.REACT_APP_BACKEND_URL;
console.log(`Base API URL: ${BASE_API}`);
export const POSTS_API = `${BASE_API}/api/posts`;

export interface Post {
  _id: string;
  content: string;
  image?: string;
  author: string; 
  date: Date;
  likes: string[]; 
  comments: string[];
}

const api = axios.create({
  withCredentials: true,
});

export const createPost = async (post: Post) => {
  const response = await api.post(POSTS_API, post);
  return response.data;
};

export const deletePost = async (postId: string) => {
  const response = await api.delete(`${POSTS_API}/${postId}`);
  return response.data;
};

export const findAllPosts = async () => {
  const response = await api.get(POSTS_API);
  return response.data;
};

export const findPostById = async (postId: string) => {
  const response = await api.get(`${POSTS_API}/${postId}`);
  return response.data;
};

export const updatePost = async (postId: string, post: Post) => {
  const response = await api.put(`${POSTS_API}/${postId}`, post);
  return response.data;
};

export const uploadImage = async (postId: string, file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await api.post(`${POSTS_API}/${postId}/uploadImage`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};