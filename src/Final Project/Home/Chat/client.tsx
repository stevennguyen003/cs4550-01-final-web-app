import axios from "axios";
axios.defaults.withCredentials = true
export const getConversation = async () => {
 const response = await axios.get(
"http://localhost:4000/api/openai/conversation");
 return response.data;
};

export const postMessage = async (message: any) => {
 const response = await axios.post(
   "http://localhost:4000/api/openai/conversation",
message );
 return response.data;
};
