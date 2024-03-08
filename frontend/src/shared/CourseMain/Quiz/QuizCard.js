import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { FaEye } from "react-icons/fa";

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
              <div className="bg-base-200 p-4 my-2 rounded-sm flex items-center justify-between">
                        <div>
                            <h2>Quiz ID: {quiz?.quiz_id}</h2>
                            <h2>Lesson ID : {quiz?.lesson_id}</h2>
                            <h3>Questions: {quiz?.question_count}</h3>
                            <h3>Time : {quiz.time} minutes</h3>
                        </div>
                        <div>
                         
                            {
                                user?.role !== "student" ?
                                <>
                                <button className="btn btn-primary mr-2">delete</button>
                                </> : <></>
                            }
                            {
                                quizTaken ? <>
                                <Link to={`/take-quiz/${quiz.quiz_id}/${user?.student_id}`}><button type="button" className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                <FaEye/>

                                    <h5 className="ml-2">Check Answer</h5>
                                </button>
                                </Link>
                                </> : 
                                <>
                                   <Link to={`/take-quiz/${quiz?.quiz_id}`}><button type="button" class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                    <h5 className="ml-2">{user?.role === "teacher" ? <>view </>: <>take</>}</h5>
                                </button></Link>
                                </>
                             }
                        </div>
                        
                    </div>    
        </>
     ); 
}
 
export default QuizCard;