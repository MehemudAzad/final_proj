import { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

const CourseStatistics = () => {

    const [courseStats, setCourseStats] = useState([]);
    const [courseCategoryStats, setCourseCategoryStats] = useState([]);
    const [courseTypeStats, setCourseTypeStats] = useState([]);
    const [courseStatsMonthly, setCourseStatsMonthly] = useState([]);
    const getCourseStats = () => {//course/quiz/:course_id
        fetch(`http://localhost:5002/course-statistics`)
        .then(res => res.json())
        .then(data =>setCourseStats(data))
    }///quiz-marks/:student_id/:course_id
    // /course-statistics/category
    const getCourseCategoryStats = () => {//course/quiz/:course_id
        fetch(`http://localhost:5002/course-statistics/category`)
        .then(res => res.json())
        .then(data =>setCourseCategoryStats(data))
    }
    const getCourseTypeStats = () => {//course/quiz/:course_id
        fetch(`http://localhost:5002/course-statistics/type`)
        .then(res => res.json())
        .then(data =>setCourseTypeStats(data))
    }
    const getCourseStatsMonthly = () => {//course/quiz/:course_id
        fetch(`http://localhost:5002/totalRevenue`)
        .then(res => res.json())
        .then(data =>setCourseStatsMonthly(data))
    }
    useEffect(()=>{
        getCourseStats();
        getCourseCategoryStats();
        getCourseTypeStats();
        getCourseStatsMonthly();
    }, [])
    console.log(courseStats);
    return ( 
        <>
        <h2 className="text-3xl mb-12">total revenue on monthly basis</h2>
        <Line className="bg-base-200 p-20 rounded-xl"
              data={{
                labels: courseStatsMonthly.map((data) => data.month),
                datasets: [
                  {
                    label: "course revenue",
                    data: courseStatsMonthly.map((data) => data.monthly_revenue),
                    backgroundColor: [
                      "rgba(43, 63, 229, 0.8)",
                    ],
                    borderRadius: 5,
                  },
              ]}}
              options={{
                plugins: {
                  title: {
                    text: "Revenue Source",
                  },
                },
              }}
            />
        <h2 className="text-3xl mt-20 mb-4">type wise course stats</h2>
        <div className="grid grid-cols-3 pt-20 pb-40 gap-16 bg-base-200 p-10 rounded-xl">
        <div >
            <Doughnut
          data={{
            labels: courseTypeStats.map((data) => data.category),
            datasets: [
              {
                label: "Revenue",
                data: courseTypeStats.map((data) => data.percentage_of_total_revenue),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(144, 238, 144, 0.8)",
                  "rgba(135, 206, 235, 0.8)",
                  "rgba(255, 215, 0, 0.8)" ,
                ],
                borderColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(144, 238, 144, 0.8)",
                  "rgba(135, 206, 235, 0.8)",
                  "rgba(255, 215, 0, 0.8)" ,
                ],
              },
              {
                label: "number of students",
                data: courseTypeStats.map((data) => data.num_students),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(144, 238, 144, 0.8)",
                  "rgba(135, 206, 235, 0.8)",
                  "rgba(255, 215, 0, 0.8)" ,
                ],
                borderColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(144, 238, 144, 0.8)",
                  "rgba(135, 206, 235, 0.8)",
                  "rgba(255, 215, 0, 0.8)" ,
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Revenue Sources",
              },
            },
          }}
        />
            </div>
            
            <div className="col-span-2"> 
            <Bar
              data={{
                labels: courseStats.map((data) => data.course_name),
                datasets: [
                  {
                    label: "course revenue",
                    data: courseStats.map((data) => data.total_revenue),
                    backgroundColor: [
                      "rgba(43, 63, 229, 0.8)",
                    ],
                    borderRadius: 5,
                  },
                  {
                    label: "students",
                    data: courseStats.map((data) => data.num_students),
                    backgroundColor: [
                      "rgba(253, 135, 135, 0.8)",
                    ],
                    borderRadius: 5,
                  },
              ]}}
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
        <h2 className="text-3xl mt-12 mb-8">category wise course stats</h2>
            <div className="grid grid-cols-3 pt-20 pb-40 gap-16 bg-base-200 p-10 rounded-xl">
            <div className="col-span-2">
            <Bar
              data={{
                labels: courseCategoryStats.map((data) => data.category),
                datasets: [
                  {
                    label: "course revenue",
                    data: courseCategoryStats.map((data) => data.total_revenue),
                    backgroundColor: [
                      "rgba(43, 63, 229, 0.8)",
                    ],
                    borderRadius: 5,
                  },
                  {
                    label: "students",
                    data: courseCategoryStats.map((data) => data.num_students),
                    backgroundColor: [
                      "rgba(253, 135, 135, 0.8)",
                    ],
                    borderRadius: 5,
                  },
              ]}}
              options={{
                plugins: {
                  title: {
                    text: "Revenue Source",
                  },
                },
              }}
            />
            </div>
            <div >
            <Doughnut
          data={{
            labels: courseCategoryStats.map((data) => data.category),
            datasets: [
              {
                label: "Revenue",
                data: courseCategoryStats.map((data) => data.percentage_of_total_revenue),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(144, 238, 144, 0.8)",
                  "rgba(135, 206, 235, 0.8)",
                  "rgba(255, 215, 0, 0.8)" ,
                ],
                borderColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(144, 238, 144, 0.8)",
                  "rgba(135, 206, 235, 0.8)",
                  "rgba(255, 215, 0, 0.8)" ,
                ],
              },
              {
                label: "number of students",
                data: courseCategoryStats.map((data) => data.num_students),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(144, 238, 144, 0.8)",
                  "rgba(135, 206, 235, 0.8)",
                  "rgba(255, 215, 0, 0.8)" ,
                ],
                borderColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                  "rgba(144, 238, 144, 0.8)",
                  "rgba(135, 206, 235, 0.8)",
                  "rgba(255, 215, 0, 0.8)" ,
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Revenue Sources",
              },
            },
          }}
        />
            </div>
            </div>
           
           
        </>
     );
}
 
export default CourseStatistics;

/**  datasets: [
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
            ], */