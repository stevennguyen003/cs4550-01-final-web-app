import "./index.css";
import * as client from "./client";
import { useState } from "react";

interface Exercise {
    name: string;
    bodyPart: string;
    equipment: string;
    gifUrl: string;
    id: Number;
    target: string;
}


function Exercises({ result }: { result: Exercise[] }) {
    // const [savedExercises, saveExercise] = useState<Exercise[]>([]);
    // const addExercise = async (e: Exercise) => {
    //     const response = await client.saveExercise(e);
    // }
    return (
        <div className="exercise-body-container">
            <div className="saved-exercises-container">
                <h1>Saved Exercises</h1>
            </div>
            <div className="exercises-search-container">
                <div className="search-result-container">
                    <h1>Search Results</h1>
                    <div className="search-result-content">
                        {result.map((e) =>
                            <div className="result-item card">
                                <img src={e.gifUrl} className="result-img" />
                                <div className="result-label">
                                    <p className="result-title card-img-overlay"><b>{e.name}</b></p>
                                    {/* <button onClick={() => addExercise(e) }>Add Exercise</button> */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Exercises;