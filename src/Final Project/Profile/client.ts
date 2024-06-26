import axios from "axios";
import { response } from "express";

export const BASE_API = process.env.REACT_APP_BACKEND_URL;
console.log(`Base API URL: ${BASE_API}`);
export const USERS_API = `${BASE_API}/api/users`;
export interface User {
  _id: string;
  username: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  dob: Date;
  profilePicture: string;
  bio: string;
  yearOfExperience: number;
  sex: string;
}

const api = axios.create({
  withCredentials: true,
});

export const signin = async (credentials: User) => {
  const response = await api.post(`${USERS_API}/signin`, credentials);
  return response.data;
};
export const profile = async () => {
  const response = await api.post(`${USERS_API}/profile`);
  return response.data;
};

export const findProfileById = async (id: any) => {
  const response = await api.get(`${USERS_API}/profile/${id}`)
  return response.data;
}

export const updateUser = async (user: any) => {
  const response = await api.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};
export const findAllUsers = async () => {
  const response = await api.get(`${USERS_API}`);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await api.post(`${USERS_API}`, user);
  return response.data;
};
export const deleteUser = async (user: any) => {
  const response = await api.delete(`${USERS_API}/${user._id}`);
  return response.data;
};
export const findUserById = async (id: any) => {
  const response = await api.get(`${USERS_API}/${id}`);
  return response.data;
};
export const findUsersByRole = async (role: string) => {
  var response = null;
  if (role === "") {
    response = await api.get(`${USERS_API}`);
  } else {
    response = await api.get(`${USERS_API}?role=${role}`);
  }
  return response.data;
};
export const signup = async (user: any) => {
  const response = await api.post(`${USERS_API}/signup`, user);
  return response.data;
};
export const signout = async () => {
  const response = await api.post(`${USERS_API}/signout`);
  return response.data;
};
export const uploadProfilePicture = async (id: string, file: File) => {
  const formData = new FormData();
  formData.append('profilePicture', file);

  const response = await api.post(`${USERS_API}/${id}/uploadProfilePicture`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
