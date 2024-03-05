import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const Quizes = ({course}) => {
    const {user} = useContext(AuthContext);
   const [quizzes, setQuizzes]= useState([]);

    const getQuizzes = () => {//course/quiz/:course_id
        fetch(`http://localhost:5002/course/quiz/${course?.course_id}`)
        .then(res => res.json())
        .then(data =>setQuizzes(data))
    }
    useEffect(()=>{
        getQuizzes();
    },[]);

    console.log(quizzes);

    return ( 
        <>
            this is quizes page
           <Link to={`/quiz/create/${course?.course_id}`}><button className="btn" >Add quiz</button></Link> 



           {/* display quizes here  */}
           {/* http://localhost:5002/quiz/46 */}
           {
                quizzes.map(quiz=>
                    <div className="bg-base-200 p-4 my-2 rounded-sm flex items-center justify-between" key={quiz.quiz_id}>
                        <div>
                            <h2>quiz_id : {quiz?.quiz_id}</h2>
                            <h2>Lesson_id : {quiz?.lesson_id}</h2>
                            <h3>Questions: {quiz?.question_count}</h3>
                        </div>
                        <div>
                            <Link to={`/take-quiz/${quiz?.quiz_id}`}><button className="btn btn-primary mx-2"> take </button></Link>
                            {
                                user?.role !== "student" ?
                                <>
                                <button className="btn btn-primary">delete</button>
                                </> : <></>
                            }
                        </div>
                        
                    </div>    
                )
           }

        </>
    );
}
 
export default Quizes;
<>

</>