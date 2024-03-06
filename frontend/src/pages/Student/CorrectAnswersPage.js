import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import {useLoaderData} from "react-router-dom";

const CorrectAnswersPage = () => {
    const {user} = useContext(AuthContext);
    const data = useLoaderData();
    const questions = data.questions;
    const quiz = data.quiz;
    const [answers, setAnswers] = useState([]);
    const [marks, setMarks] = useState(0);
    // let marks = 0;
    // /quiz-answers/:quizId/:studentId
    useEffect(()=>{
        fetch(`http://localhost:5002/quiz-answers/${quiz.quiz_id}/${user?.student_id}`)
        .then(res => res.json())
        .then(
            data =>{
                setAnswers(data.answers);
                setMarks(data.marks[0].marks);
                // marks = data.marks;
            }
        )
    },[]);
    console.log(marks)
    console.log(answers)
    const questionElements = [];
for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    console.log(question)
    // const selectedAnswer = "hello";
    const selectedAnswer = answers.find(answer => answer.question_id === question.question_id)?.answer;
    const isWrongAnswer = selectedAnswer !== question.correct_ans;
    console.log(selectedAnswer , " ", question.correct_ans);
    questionElements.push(
        <div className={`bg-base-200 my-3 w-[90%] m-auto rounded-md p-2 ${isWrongAnswer ? 'radio-error' : ''}`} key={question.question_id}>
            <div className="flex items-center justify-between px-3 py-1 bg-amber-50 rounded-md">
                <h2 className="text-2xl mb-2">{i+1 + ") "}{question.question}</h2>
                <h2 className="text-xl  px-2 py-1 rounded-md">Marks {question.mark}</h2>
            </div>
            <div className="p-4">
                <label className={`flex items-center gap-4 my-1 p-2 bg-base-300 hover:bg-indigo-100 ${isWrongAnswer ? 'radio-error' : ''}`}>
                    <input 
                        type="radio" 
                        name={`radio-${question.question_id}`} 
                        className={`radio ${isWrongAnswer ? 'radio-error' : 'radio-success'}`}
                        value={question.option1}
                        checked={selectedAnswer === question.option1 || question.option2 === question.correct_ans}
                        readOnly
                    />
                    <h2>{question.option1}</h2>
                </label>
                <label className={`flex items-center gap-4 my-1 p-2 bg-base-300 hover:bg-indigo-100 ${isWrongAnswer ? 'radio-error' : ''}`}>
                    <input 
                        type="radio" 
                        name={`radio-${question.question_id}`}  
                        className={`radio ${isWrongAnswer ? 'radio-error' : 'radio-success'}`} 
                        value={question.option2}
                        checked={selectedAnswer === question.option2 || question.option2 === question.correct_ans}
                        readOnly
                    />
                    <h2>{question.option2}</h2>
                </label>
                <label className={`flex items-center gap-4 my-1 p-2 bg-base-300 hover:bg-indigo-100 ${isWrongAnswer ? 'radio-error' : ''}`}>
                    <input 
                        type="radio" 
                        name={`radio-${question.question_id}`}  
                        className={`radio ${isWrongAnswer ? 'radio-error' : 'radio-success'}`}
                        value={question.option3}
                        checked={selectedAnswer === question.option3 || question.option2 === question.correct_ans}
                        readOnly
                    />
                    <h2>{question.option3}</h2>
                </label>
                <label className={`flex items-center gap-4 my-1 p-2 bg-base-300 hover:bg-indigo-100 ${isWrongAnswer ? 'radio-error' : ''}`}>
                    <input 
                        type="radio" 
                        name={`radio-${question.question_id}`}  
                        className={`radio ${isWrongAnswer ? 'radio-error' : 'radio-success'}`}
                        value={question.option4}
                        checked={selectedAnswer === question.option4 || question.option2 === question.correct_ans}
                        readOnly
                    />
                    <h2>{question.option4}</h2>
                </label>
            </div>
                        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
            <div className="collapse-title text-xl font-medium">
                See answer
            </div>
            <div className="collapse-content"> 
                <p>{question.correct_ans}</p>
            </div>
            </div>
        </div>
    );
}

    // console.log(data, questions, quiz)
    return ( 
        <div className="p-4">
            <div className="bg-base-200 text-center py-10">
                <div className="text-2xl">Quiz on lesson: {quiz.lesson_id}</div>
                <div className="text-2xl">Total Marks Obtained: {marks}</div>
                <div className="py-10"></div>
            </div>
            <hr  className="mb-5"/>
             {questionElements}
        </div>
     );
}
 
export default CorrectAnswersPage;