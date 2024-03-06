import { useContext, useState } from "react";
import {useLoaderData} from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Clock from "../../components/Clock";

const TakeQuiz = () => {
    const {user} = useContext(AuthContext);
    const data = useLoaderData();
    const questions = data.questions;
    const quiz = data.quiz;
    const [answers, setAnswers] = useState([]);
    let i = 0;
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
            window.location = `/take-quiz/${quiz.quiz_id}/${user?.student_id}`
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
        <div className="p-4 w-[85%] m-auto">
            <div className="bg-base-200 text-center py-5">
                <h2 className="text-2xl">Total Marks : {quiz.marks}</h2>
                <h2 className="text-2xl">Quiz on : {quiz.lesson_id}</h2>
                {
                    user?.role === "teacher" ? <></> : <><Clock time={quiz.time*60} onTimeUp={handleSubmit}></Clock></>
                }
                
            </div>
            {/* <input type="radio" name="radio-7" className="radio radio-info" /> */}
            {/* lod questions here   */}
            { 
                questions.map(question =>
                    <div className="bg-base-200 my-3 rounded-md p-2">
                        <div className="flex items-center justify-between px-3">
                            <h2 className="text-2xl mb-2">{++i + ") "}{question.question}</h2>
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
                        {
                            user?.role === "student" ?<></> : <> <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
                            <div className="collapse-title text-xl font-medium">
                                See answer
                            </div>
                            <div className="collapse-content"> 
                                <p>{question.correct_ans}</p>
                            </div>
                            </div></>
                        }
                    </div>
                 
                )
            }
            
             {
                    user?.role === "student" ? <><button onClick={handleSubmit} type="button" className="text-white text-xl  bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg px-5 py-2.5 text-center items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2 w-full">
                    Submit
                    </button></> : <> </>
            }
           
        </div>
     );
}
 
export default TakeQuiz;