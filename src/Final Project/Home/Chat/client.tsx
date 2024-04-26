import axios from "axios";
axios.defaults.withCredentials = true;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const getConversation = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/openai/conversation`);
    return response.data;
};

export const postMessage = async (message: any) => {
    const response = await axios.post(`${BACKEND_URL}/api/openai/conversation`,
        message);
    return response.data;
};
