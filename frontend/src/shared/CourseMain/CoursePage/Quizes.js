import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import QuizCard from "../Quiz/QuizCard";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

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

    const [marksQuiz, setMarksQuiz] = useState([]);
    const [quizCnt, setQuizCnt] = useState([]);
   
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
        
        <div>
            <div className="bg-base-200 h-[600px] rounded-xl mt-5">
            <Bar
          data={{
            labels: marksQuiz.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: quizCnt.map((data) => data.value),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Revenue Source",
              },
            },
          }}
        />
            </div>
        </div>

        </>
    );
}
//get the marks of a student in format like 
//{1 , 5} , {2, 10}, {3, 8}, {4, 6} , {5, }, {6, 20}


export default Quizes;
<>

</>