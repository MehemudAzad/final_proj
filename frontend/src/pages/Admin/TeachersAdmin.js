import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import TeacherCard from "./TeacherCard";

const TeachersAdmin = () => {
    const [teachers, setTeachers] = useState([]);

    const getTeachers = () => {
        fetch('http://localhost:5002/teacher/allInfo')
        .then(res => res.json())
        .then(data => setTeachers(data))
    }
    useEffect(()=>{
        getTeachers();
    },[]);
    console.log(teachers);

    const handleDelete = (id) => {
        console.log(id);
        const proceed = window.confirm(
        "Are you sure, you want to delete this teacher?"
        );
        if (proceed) {
        fetch(`http://localhost:5002/teacher/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
            console.log(data);
            });
        }
        window.location = `/admin/dashboard`;
    };


///teacher/allInfo
    return ( 
        <>
            <h2 className="uppercase text-md">Teacher STATS</h2>
            <div className="grid grid-cols-2 gap-4 bg-base-200 p-5 rounded-xl">
            <div className="col-span-1"> 
            <Bar
              data={{
                labels: teachers.map((data) => data.username),
                datasets: [
                  {
                    label: "teacher salary",
                    data: teachers.map((data) => data.sum),
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
            </div>
            <div className=""> 
            <Bar
              data={{
                labels: teachers.map((data) => data.username),
                datasets: [
                    {
                        label: "mentoring currently",
                        data: teachers.map((data) => data.mentored_students),
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
            <section className="mt-10 bg-base-200 p-4 rounded-xl">
                {
                    teachers.map(teacher=>
                        <TeacherCard key={teacher?.teacher_id} teacher={teacher} handleDelete={handleDelete}></TeacherCard>
                    )
                }
            </section>
        </>
    );
}
 
export default TeachersAdmin;