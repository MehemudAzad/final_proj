import { useContext, useState } from "react";
import {useLoaderData} from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const TakeQuiz = () => {
    const {user} = useContext(AuthContext);
    const data = useLoaderData();
    const questions = data.questions;
    const quiz = data.quiz;
    const [answers, setAnswers] = useState([]);

    const handleSubmit = async() => {
        console.log("submit clicked");
        let marks = 0;
        //calculate marks
        for (let i = 0; i < questions.length; i++) {
            // Find the answer object corresponding to the current question_id
            const answer = answers.find(ans => ans.question_id === questions[i].question_id);
            // If answer is found and it matches the correctAns, increase marks
            if (answer && answer.answer === questions[i].correct_ans) {
                marks += questions[i].mark;
            }
        }
        console.log(marks, answers)
        fetch(`http://localhost:5002/quiz/${quiz.quiz_id}`, {
            method: 'POST',
            // body: formData,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                answers: answers,
                marks : marks,
                student_id : user?.student_id
            }),
          })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok.');
          })
          .then(data => {
            console.log('Answers uploaded successfully:', data);
            window.location = '/'
          })
          .catch(error => {
            console.error('Error uploading result:', error);
          });
    }

    const handleAnswerChange = (questionId, selectedOption) => {
        let Obj = {
            question_id : questionId,
            answer : selectedOption
        }
        // Check if questionId already exists in answers
        const existingIndex = answers.findIndex(obj => obj.question_id === questionId);

        // If questionId exists, update the existing entry; otherwise, add a new entry
        if (existingIndex !== -1) {
            const updatedAnswers = [...answers];
            updatedAnswers[existingIndex] = Obj;
            setAnswers(updatedAnswers);
        } else {
            setAnswers(prevAnswers => [...prevAnswers, Obj]);
        }
        console.log(answers);
    };

    // console.log(data, questions, quiz)
    return ( 
        <div className="p-4">
            take quiz here 
            <h2 className="text-2xl">Total Marks : {quiz.marks}</h2>
            <h2 className="text-2xl">Quiz on : {quiz.lesson_id}</h2>
            {/* <input type="radio" name="radio-7" className="radio radio-info" /> */}
            {/* lod questions here   */}
            <span className="countdown font-mono text-2xl">
                {/* <span style={{"--value":0}}></span>h */}
                <span style={{"--value":`${quiz.time}`}}></span>m 
                <span style={{"--value":0}}></span>s
            </span>
            { 
                questions.map(question =>
                    <div className="bg-base-200 my-3 w-[90%] m-auto rounded-md p-2">
                        {question.question_id}
                        <div className="flex items-center justify-between px-3">
                            <h2 className="text-2xl mb-2">{question.question}</h2>
                            <h2>Marks ({question.mark})</h2>
                        </div>
                        <div className="p-4">
                            <label className="flex items-center gap-4 my-1 p-2 bg-base-300 hover:bg-indigo-100">
                                <input type="radio" name={`radio-${question.question_id}`} className="radio radio-info"  onChange={() => handleAnswerChange(question.question_id, question.option1)}/>
                                <h2>{question.option1}</h2>
                            </label>
                            <label className="flex items-center gap-4 my-1 p-2 bg-base-300 hover:bg-indigo-100">
                                <input type="radio" name={`radio-${question.question_id}`}  className="radio radio-info" onChange={() => handleAnswerChange(question.question_id, question.option2)}/>
                                <h2>{question.option2}</h2>
                            </label>
                            <label className="flex items-center gap-4 my-1 p-2 bg-base-300 hover:bg-indigo-100">
                                <input type="radio" name={`radio-${question.question_id}`}  className="radio radio-info" onChange={() => handleAnswerChange(question.question_id, question.option3)}/>
                                <h2>{question.option3}</h2>
                            </label>
                            <label className="flex items-center gap-4 my-1 p-2 bg-base-300 hover:bg-indigo-100">
                                <input type="radio" name={`radio-${question.question_id}`}  className="radio radio-info" onChange={() => handleAnswerChange(question.question_id, question.option4)}/>
                                <h2>{question.option4}</h2>
                            </label>
                            
                        </div>
                    </div>
                )
            }
            <button onClick={handleSubmit} className="btn btn-primary my-4 w-[90%] m-auto">Submit</button>
        </div>
     );
}
 
export default TakeQuiz;