import axios from "axios";
axios.defaults.withCredentials = true;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

interface Exercise {
    name: string;
    bodyPart: string;
    equipment: string;
    gifUrl: string;
    id: Number;
    target: string;
}

export const getExercise = async (query: string) => {
    try {
        const url = `${BACKEND_URL}/api/exercises/${query.toLowerCase()}`;
        const response = await axios.get(url);
        return response.data; // Return the JSON data from the response
    } catch (error) {
        console.error("Error fetching exercise:", error);
        throw error; // Rethrow the error to handle it elsewhere
    }
};

export const saveExercise = async (exercise: any) => {
    try {
        const url = `${BACKEND_URL}/api/exercises/${exercise.toLowerCase()}`;
        const response = await axios.post(url);
        console.log("SAVE EXERCISE: " + response.data);
        return response.data; // Return the JSON data from the response
    } catch (error) {
        console.error("Error saving exercise:", error);
        throw error; // Rethrow the error to handle it elsewhere
    }
};