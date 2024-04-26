import { useState, useEffect } from "react";
import "../App.css"

const Questions = () => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState();
    const [score, setScore] = useState(0);

    const getQuestions = async () => {
        const res = await fetch("https://the-trivia-api.com/v2/questions/");
        const res_questions = await res.json();
        setQuestions(res_questions);
    };

    const checkAnswer = (answer) => {
        if(questions[questionIndex].correctAnswer === answer){
            setScore(score + 1);
        }

        if(questionIndex === (questions.length - 1)){
            getQuestions();
            setQuestionIndex(0);
        }
        else{
            setQuestionIndex(questionIndex + 1);

        }
    }

    useEffect(() => {
        getQuestions();
    }, [])

    return(
        <div>
            {questions && (<div>
                <div className="score">
                    <p>Score: {score}</p>
                </div>
                <div className="question">
                    <h2>{questions[questionIndex].question.text}</h2>
                    <div className="choices">
                        {[questions[questionIndex].correctAnswer, ...questions[questionIndex].incorrectAnswers].sort(() => Math.random() - 0.5).map((answer, index) => {
                            const hue = Math.random() * 360;
                            const color = `hsla(${hue}, 100%, 40%, 1)`;
                            return(
                                <button key={index} style={{backgroundColor: color}} onClick={() => checkAnswer(answer)}>{answer}</button>
                            );
                        })}
                    </div>
                </div>
            </div>)}
        </div>
    );
}

export default Questions;