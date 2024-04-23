import axios from "axios";
import { response } from "express";
export const BASE_API = process.env.REACT_APP_BACKEND_URL;
console.log(`Base API URL: ${BASE_API}`);
export const COMMENTS_API = `${BASE_API}/api/comments`;

export interface Comment {
  _id: string;
  content: string;
  post: string;
  author: string; 
  date: Date;
  likes: string[]; 
}

const api = axios.create({
  withCredentials: true,
});

export const createComment = async (comment: Comment) => {
  const response = await api.post(COMMENTS_API, comment);
  return response.data;
};

export const deleteComment = async (commentId: string) => {
  const response = await api.delete(`${COMMENTS_API}/${commentId}`);
  return response.data;
};

export const findAllComments = async () => {
  const response = await api.get(COMMENTS_API);
  return response.data;
};

export const findCommentById = async (commentId: string) => {
  const response = await api.get(`${COMMENTS_API}/${commentId}`);
  return response.data;
};

export const findCommentsByPost = async (postId: string) => {
  try {
    const response = await api.get(`${COMMENTS_API}/post/${postId}`);
    return response.data;
} catch (error) {
    console.error('Failed to load comments:', error);
    return []; // Return an empty array or handle as appropriate
}
};

export const updateComment = async (commentId: string, comment: Comment) => {
  const response = await api.put(`${COMMENTS_API}/${commentId}`, comment);
  return response.data;
};
