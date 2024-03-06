import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import CourseInstructors from "./Course_Instructors";
import PrivateRoute from "../../Routes/PrivateRoute/PrivateRoute";
import CourseFAQ from "./CourseFAQ";
import { HiAcademicCap } from "react-icons/hi";
import ReactPlayer from "react-player";
import { ToastContainer, toast } from "react-toastify";
import { PiStudentFill } from "react-icons/pi";

const SingleCourse = () => {
  const course = useLoaderData();
  const [isClicked, setIsClicked] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    course_id,
    course_name,
    course_description,
    course_price,
    image_url,
  } = course;
  const user_id = user?.id;
  const [teachers, setTeachers] = useState([]);
  const [enrolled, setEnrolled] = useState(0);

  const notify = () =>
    toast("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      // Truncate the text to the nearest word within the specified length
      const truncatedText = text.substr(0, text.lastIndexOf(" ", maxLength));
      return `${truncatedText}...`;
    }
  };
  //loading the related teachers with this course
  const getTeachers = () => {
    fetch(`http://localhost:5002/courses/teachers/${course_id}`)
      .then((res) => res.json())
      .then((data) => setTeachers(data.teachers));
  };
  useEffect(() => {
    getTeachers();
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5002/course-total-student/${course_id}`)
      .then((res) => res.json())
      .then((data) => setEnrolled(data[0]?.total_enrolled));
  }, []);

  console.log(teachers);
  const handleClick = () => {
    setIsClicked(true);
  };
  const handleCourseEnroll = async () => {
    console.log(course_id, user?.student_id);
    try {
      const response = await fetch("http://localhost:5002/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ course_id, student_id: user?.student_id }),
      });

      if (response.ok) {
        const enrollmentData = await response.json();
        console.log("Enrollment successful:", enrollmentData);
        window.location = `/courses/main/${course_id}`;
        // Optionally, you can handle successful enrollment here, such as updating state or displaying a success message.
      } else {
        const errorData = await response.json();
        console.error("Enrollment failed:", errorData.message);
        // Handle enrollment failure, display an error message, etc.
      }
    } catch (error) {
      console.error("Error during enrollment:", error.message);
      // Handle any unexpected errors
    }
  };
  const handleCombinedClick = () => {
    handleClick();
    handleCourseEnroll();
    notify();
  };
  return (
    <div className="bg-blue-100 pb-8">
      <div className="w-[88%] m-auto">
        <div className="grid grid-cols-2 gap-6 relative pb-28 pt-12 py-4 mb-20 bg-blue-100">
          <div className="flex flex-col items-strech justify-start ">
            <h1 className="my-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-gray-400">
                {course_name}
              </span>{" "}
            </h1>
            <h2 className="text-2xl text-blue-900 font-bold my-3">
              {enrolled} Students enrolled{" "}
            </h2>
            <h2 className="text-2xl text-blue-900 font-bold my-3">RATING : </h2>
            <p className="my-4">{truncateText(course_description, 400)}</p>
            <div>
              {user?.role === "student" ? (
                <PrivateRoute>
                  <button
                    onClick={handleCombinedClick}
                    disabled={isClicked}
                    className="btn text-3xl btn-success bg-emerald-700 text-slate-100  w-[45%] absolute bottom-28 left-0"
                  >
                    Enroll
                  </button>
                </PrivateRoute>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div>
            {/* <img
              className="w-full transition-all duration-300 rounded-lg cursor-pointer filter hover:grayscale-0"
              src={
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbXB1dGVyfGVufDB8fDB8fHww"
              }
              alt=""
            /> */}
            {
          course?.image_url ? 
          <>
            <img
            className="w-full h-[500px] transition-all duration-300 rounded-lg cursor-pointer filter hover:grayscale-0"
            src={course?.image_url}
            alt="courses image"
          />
          </> : 
          <><img
          className="w-full h-[500px] transition-all duration-300 rounded-lg cursor-pointer filter hover:grayscale-0"
          src={
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbXB1dGVyfGVufDB8fDB8fHww"
          }
          alt="courses image"
        /></>
        }
          </div>
          {/* image_url? image_url :  */}
        </div>
        {/* course description */}
        <section className="flex items-center gap-20 my-28 py-24 px-10 bg-neutral-900 rounded-xl">
          {/* <video className="w-[640px]"
          url ="https://youtu.be/KTcS3dDSV1k?si=hGGBtb58aXPReCZU"
            width="640"
            height="360"
            controls
            onClick={togglePlay}
          >
            {/* <source src="https://youtu.be/KTcS3dDSV1k?si=9Q0uV8qH32EcSFU5" type="video/mp4" />
            Your browser does not support the video tag. */}
          {/* </video> */}
          <ReactPlayer
            url="https://youtu.be/KTcS3dDSV1k?si=hGGBtb58aXPReCZU"
            width="640px"
            height="400px"
            loop
            controls
          />
          <div className="w-[50%] ">
            <h2 className="text-4xl mb-10 font-semibold text-gray-900 underline dark:text-white decoration-green-500 text-slate-100">
              Course Description
            </h2>
            <p className="text-slate-300">
              This program is designed to take you on a transformative journey
              from mastering Data Structures and Algorithms (DSA) to becoming a
              proficient Developer or a Data Scientist. Whether you aspire to
              become a front-end developer, back-end developer, full-stack
              developer, data scientist or specialize in a specific tech-stack,
              this program provides the essential building blocks for your
              coding journey starting right from basic programming to building
              applications.
            </p>
            <div className="flex items-center mt-6 gap-4">
              <HiAcademicCap className="text-red-600 text-4xl" />
              <h3 className="text-2xl text-red-600">Beginner to Advance</h3>
            </div>
          </div>
        </section>
        {/* teachers int the course section */}
        <div className="py-12 text-center bg-blue-400 rounded-xl my-5">
          <h2 className="text-5xl font-semibold text-gray-900 underline dark:text-white decoration-green-500 py-5 uppercase">
            course instructors
          </h2>
          {teachers.map((teacher) => (
            <CourseInstructors key={teacher.user_id} teacher={teacher} />
          ))}
        </div>

        {/* FAQ section  */}
        <section className="bg-neutral-800 px-4 py-12 rounded-xl pb-16">
          <h1 className="text-4xl font-semibold text-white underline dark:text-white decoration-green-500 pt-20 mb-6">
            FAQ's
          </h1>
          <CourseFAQ></CourseFAQ>
        </section>
      </div>
    </div>
  );
};

export default SingleCourse;
