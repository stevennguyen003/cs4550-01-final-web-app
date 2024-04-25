import "./index.css";
import { Link } from "react-router-dom";
interface Exercise {
    name: string;
    bodyPart: string;
    equipment: string;
    gifUrl: string;
    id: number;
    target: string;
    instructions: string[];
}

function ExerciseDetails({ result }: { result: Exercise }) {
    const instr = result.instructions;
    return (
        <div className="exercise-details-container">
            <div className="exercise-details-info-container">
                <div className="result-item card">
                    <img src={result.gifUrl} className="result-img" />
                </div>
                <div className="exercise-details-info">
                    <h3>Name: <span className="text-gradient">{result.name}</span></h3>
                    <h3>Body Part: <span className="text-gradient">{result.bodyPart}</span></h3>
                    <h3>Equipment: <span className="text-gradient">{result.equipment}</span></h3>
                    <h3>Target Muscles: <span className="text-gradient">{result.target}</span></h3>
                </div>
            </div>
            <div className="exercise-details-instructions-container">
                <ol>
                    {instr.map((i, index) =>
                        <li key={index}>
                            <b>{i}</b>
                        </li>)}
                </ol>
            </div>
            <Link to="/Home/Search" className="text-gradient">
                go back
            </Link>
        </div>
    )
}
export default ExerciseDetails;