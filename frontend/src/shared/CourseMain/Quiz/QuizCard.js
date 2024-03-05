import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const QuizCard = ({quiz}) => {
    const {user} = useContext(AuthContext);
    const [quizTaken, setQuizTaken] = useState(false);
    const handleCheckQuizTaken = async () => {
        try {
            const response = await fetch(`http://localhost:5002/quizTaken/${quiz.quiz_id}/${user?.student_id}`);

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();
            console.log("has quiz take " , data);
            setQuizTaken(data.hasTakenQuiz);
        } catch (error) {
            // setError('Error checking if quiz is taken. Please try again.');
            console.error('Error:', error);
        } finally {
            // setIsLoading(false);
        }
    };
    useEffect(()=>{
        handleCheckQuizTaken();
    }, [])
    return ( 
        <>
              <div className="bg-base-200 p-4 my-2 rounded-sm flex items-center justify-between" key={quiz.quiz_id}>
                        <div>
                            <h2>quiz_id: {quiz?.quiz_id}</h2>
                            <h2>Lesson_id : {quiz?.lesson_id}</h2>
                            <h3>Questions: {quiz?.question_count}</h3>
                        </div>
                        <div>
                         
                            {
                                user?.role !== "student" ?
                                <>
                                <button className="btn btn-primary">delete</button>
                                </> : <></>
                            }
                            {
                                quizTaken ? <>
                                <Link to={`/take-quiz/${quiz.quiz_id}/${user?.student_id}`}><button className="btn btn-primary">Check Results</button></Link>
                                </> : 
                                <>
                                   <Link to={`/take-quiz/${quiz?.quiz_id}`}><button className="btn btn-primary mx-2"> take </button></Link>
                                </>
                             }
                        </div>
                        
                    </div>    
        </>
     ); 
}
 
export default QuizCard;