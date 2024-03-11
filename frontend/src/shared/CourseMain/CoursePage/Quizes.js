import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import QuizCard from "../Quiz/QuizCard";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

const Quizes = ({course}) => {
    const {user} = useContext(AuthContext);
    const [quizzes, setQuizzes]= useState([]);
    const [quizMarks, setQuizMarks] = useState([]);
    const [quizMarksPercent, setQuizMarksPercent] = useState([]);
    const [topStudents, setTopStudents] = useState([]);
    // const [studentId, setStudentId] = useState('');
    const getQuizzes = () => {//course/quiz/:course_id
        fetch(`http://localhost:5002/course/quiz/${course?.course_id}`)
        .then(res => res.json())
        .then(data =>setQuizzes(data))
    }
    const getQuizMarks = () => {//course/quiz/:course_id
        fetch(`http://localhost:5002/quiz-marks/${user?.student_id}/${course?.course_id}`)
        .then(res => res.json())
        .then(data =>setQuizMarks(data))
    }///quiz-marks/:student_id/:course_id
    const getQuizMarksPercent = () => {//course/quiz/:course_id
        fetch(`http://localhost:5002/avg-quiz-marks/${course?.course_id}`)
        .then(res => res.json())
        .then(data =>setQuizMarksPercent(data))
    }///quiz-marks/:student_id/:course_id
    const getTopStudents = () => {//course/quiz/:course_id
        fetch(`http://localhost:5002/getTopStudents/${course?.course_id}`)
        .then(res => res.json())
        .then(data =>setTopStudents(data))
    }///quiz-marks/:student_id/:course_id

    console.log(quizMarks);
    useEffect(()=>{
        getQuizzes();
        getQuizMarks();
        getQuizMarksPercent();
        getTopStudents();
    },[]);

    console.log(quizzes);
    console.log("percent", quizMarksPercent)

    const [marksQuiz, setMarksQuiz] = useState([]);
    const [quizCnt, setQuizCnt] = useState([]);
    
    const handleDelete = (id) => {
      console.log(id);
      const proceed = window.confirm(
      "Are you sure, you want to cancel this review"
      );
      if (proceed) {
      fetch(`http://localhost:5002/quiz/${id}`, {
          method: "DELETE",
      })
          .then((res) => res.json())
          .then((data) => {
          console.log(data);
          });
      }
      // window.location = `/lessons/${lecture?.lesson_id}/lecture/${lecture?.lecture_id}`;
  };


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
                    <QuizCard key={quiz.quiz_id} quiz={quiz} handleDelete={handleDelete}></QuizCard>
                )
           }
        
        <div>
          {
            user?.role=== 'student' ? <> 
            <div className="grid grid-cols-2 gap-5">
                 <div className="bg-base-200 h-[600px] rounded-xl mt-5 p-8">
            <h3 className="text-xl">My Marks </h3>
            <Bar
              data={{
                labels: quizMarks.map((data) => data.quiz_number),
                datasets: [
                  {
                    label: "your marks",
                    data: quizMarks.map((data) => data.marks),
                    backgroundColor: [
                      "rgba(43, 63, 229, 0.8)",
                    ],
                    borderRadius: 5,
                  },
                  {
                    label: "highest marks",
                    data: quizMarks.map((data) => data.highest_marks),
                    backgroundColor: [
                      "rgba(250, 192, 19, 0.8)",
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
                <div className="bg-base-200 h-[600px] w-full rounded-xl mt-5 p-8">
                <h3 className="text-xl">Mymarks(Line)</h3>
            <Line
              data={{
                labels: quizMarks.map((data) => data.quiz_number),
                datasets: [
                  {
                    label: "my marks",
                    data: quizMarks.map((data) => data.marks),
                    backgroundColor: "#064FF0",
                    borderColor: "#064FF0",
                  },
                  {
                    label: "highest marks",
                    data: quizMarks.map((data) => data.highest_marks),
                    backgroundColor: "#FF0000",
                    borderColor: "#FF0000",
                  },
                ],
              }}
              options={{
                elements: {
                  line: {
                    tension: 0.5,
                  },
                },
                plugins: {
                  title: {
                    text: "Monthly Revenue & Cost",
                  },
                },
              }}
            />
                </div>
            </div>
           
            </> : <></>
          }
           
            <div className="bg-base-200 h-[600px] rounded-xl mt-5 p-8">
            <h3 className="text-xl">Number of students participated</h3>
            <Bar
          data={{
            labels: quizMarksPercent.map((data) => data.quiz_number),
            datasets: [
              {
                label: "Count Students",
                data: quizMarksPercent.map((data) => data.students),
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
        <div className="bg-base-200 h-[700px] w-full rounded-xl mt-5 p-8">
            <h3 className="text-xl">Overall Marks Students & percentage</h3>
        <Line
          data={{
            labels: quizMarksPercent.map((data) => data.quiz_number),
            datasets: [
              {
                label: "max possible marks",
                data: quizMarksPercent.map((data) => data.obtainable_marks),
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
              },
              {
                label: "obtained marks",
                data: quizMarksPercent.map((data) => data.marks),
                backgroundColor: "rgba(253, 135, 135, 0.8)",
                borderColor: "rgba(253, 135, 135, 0.8)",
              },
              {
                label: "percentage",
                data: quizMarksPercent.map((data) => data.percentage_marks),
                backgroundColor: "#FF3030",
                borderColor: "#FF3030",
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Monthly Revenue & Cost",
              },
            },
          }}
        />
        </div>
        </div>
        <section className="bg-base-200 p-6 mt-20 rounded-xl">
          <h3 className="text-xl">Top Students </h3>
          {
            topStudents.map(student =>
              <>
                <div>
                  <div className="bg-indigo-100 px-5 py-2 my-2 rounded-2xl text-md">
                    <div>Name : {student?.username}</div>
                    <div>Email : {student?.email}</div>
                    <div>Total Marks : {student?.total_marks}</div>
                  </div>

                </div>

              </>  
            )
          }
        </section>
        </>
    );
}
//get the marks of a student in format like 
//{1 , 5} , {2, 10}, {3, 8}, {4, 6} , {5, }, {6, 20}


export default Quizes;
