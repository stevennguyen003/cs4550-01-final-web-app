import axios from "axios";
axios.defaults.withCredentials = true;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const getExercise = async ( query: String ) => {
    console.log(query);
    const url = `http://localhost:4000/api/exercises/${query.toLowerCase()}` ||
    `${BACKEND_URL}/api/exercises/${query.toLowerCase()}`;
    console.log(url);
    const response = await axios.get(url);
    //return response.data;
    console.log(response.data);
};