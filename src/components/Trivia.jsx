import Questions from "./Questions" 
import { useState } from "react";
import "../App.css"

const Trivia = () => {
    const [begin, initiate] = useState(false);

    return (
        <div>
            {!begin && <button className="begin" onClick={() => initiate(true)}>Begin</button>}

            {begin && (
                <Questions />
            )}
        </div>
    );
}

export default Trivia;