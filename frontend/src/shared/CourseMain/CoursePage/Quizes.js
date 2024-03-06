import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import QuizCard from "../Quiz/QuizCard";

const Quizes = ({course}) => {
    const {user} = useContext(AuthContext);
    const [quizzes, setQuizzes]= useState([]);
    // const [studentId, setStudentId] = useState('');
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
        <div className="flex items-center justify-between pb-4">
        <h2 className="text-2xl ">Quizes({quizzes.length})</h2>
            {
                user?.role === "teacher" ? <><Link to={`/quiz/create/${course?.course_id}`}><button className="btn" >Add quiz</button></Link> </> : <></>
            }
        </div>
           
           {
                quizzes.map(quiz=>
                    <QuizCard key={quiz.quiz_id} quiz={quiz}></QuizCard>
                )
           }

        </>
    );
}
 
export default Quizes;
<>

</>