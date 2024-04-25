import "./index.css";
import * as client from "./client";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ExerciseDetails from "./Details";

interface Exercise {
    name: string;
    bodyPart: string;
    equipment: string;
    gifUrl: string;
    id: number;
    target: string;
    instructions: string[];
}

function Exercises({ result, search }: { result: Exercise[], search: string }) {
    console.log("Search:", search);
    const [exercise, setExercise] = useState({
        name: "",
        bodyPart: "",
        equipment: "",
        gifUrl: "",
        id: 0,
        target: "",
        instructions: [] as string[],
    });

    const { query, id } = useParams();

    const handleSetExercise = (e: Exercise) => {
        const clicked = {
            name: e.name,
            bodyPart: e.bodyPart,
            equipment: e.equipment,
            gifUrl: e.gifUrl,
            id: e.id,
            target: e.target,
            instructions: e.instructions,
        }
        setExercise(clicked);
    }
    return (
        <div className="exercise-body-container">
            <div className="exercises-search-container">
                <div className="search-result-container">
                    {query ? <ExerciseDetails result={exercise}/> : <>
                        <h1>Search Results</h1>
                        <div className="search-result-content">
                            {result.map((e) =>
                                <Link onClick={() => (handleSetExercise(e))} to={`/Home/Search/${search}/${e.id}`}>
                                    <div className="result-item card">
                                        <img src={e.gifUrl} className="result-img" />
                                        <p className="result-title card-img-overlay"><b>{e.name}</b></p>
                                    </div>
                                </Link>
                            )}
                        </div> </>}
                </div>
            </div>
        </div>
    )
}
export default Exercises;