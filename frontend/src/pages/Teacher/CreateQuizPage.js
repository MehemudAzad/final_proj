import { MdDriveFolderUpload, MdLibraryAdd } from "react-icons/md";
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import {useLoaderData} from "react-router-dom";

const CreateQuizPage = () => {
    const [questions, setQuestions] = useState([])
    const {user} = useContext(AuthContext);
    const course = useLoaderData();
    // console.log(course)
    console.log(course)
    // const handleCreateQuiz = async (e) => {
    //     e.preventDefault();

    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        //calling the form with event.target
        const form = e.target;
        // Use FormData to get form data
        const formData = new FormData(form);
        
        // Retrieve values from formData
        const question = formData.get('question');
        const option1 = formData.get('option1');
        const option2 = formData.get('option2');
        const option3 = formData.get('option3');
        const option4 = formData.get('option4');
        const correctAns = formData.get('correctAns');
        const mark = formData.get('mark');
        console.log(question, option1, option2, option3, option4)
        let Obj = {
            question : question,
            option1 : option1,
            option2 : option2,
            option3 : option3,
            option4 : option4,
            mark : mark,
            correct_ans : correctAns
        };
        setQuestions([...questions, Obj]);
        console.log(questions)
      };
      console.log(questions)

    //   const sendQuestionsToServer = async () => {
    //     try {
    //         const response = await fetch('http:/localhost:5002/addQuestions', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ questions: questions })
    //         });

    //         if (!response.ok) {
    //             throw new Error('Error sending questions to server');
    //         }

    //         console.log('Questions sent successfully');
    //         // Clear the questions array after sending to server
    //         setQuestions([]);
    //     } catch (error) {
    //         console.error('Error sending questions to server:', error);
    //     }
    // };

    const handleSubmitQuiz = async(e) => {
        e.preventDefault();
        //calling the form with event.target
        const form = e.target;
        // Use FormData to get form data
        const formData = new FormData(form);
        const time = formData.get('time');
        const lesson_id = formData.get('lesson_id');
        console.log('Questions sent successfully');
        let serializedArray = JSON.stringify(questions);
        formData.append('questions', serializedArray);
        formData.append('creator_id', user?.teacher_id);
        formData.append('course_id', course?.course_id);
        console.log('quiz submitted')
        console.log(time, lesson_id, formData);
        console.log(formData.get('questions'));

        try {
            const response = await fetch('http://localhost:5002/add-Questions', {
                method: 'POST',
                // body: formData,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    questions: questions,
                    time : time,
                    lesson_id : lesson_id,
                    creator_id : user?.teacher_id,
                    course_id : course?.course_id
                }),
            });

            if (!response.ok) {
                throw new Error('Error sending questions to server');
            }

            console.log('Questions sent successfully');
            // Clear the questions array after sending to server
            setQuestions([]);
        } catch (error) {
            console.error('Error sending questions to server:', error);
        }
    }

    return ( 
        <div className="p-4 w-[90%] m-auto">  
            <h1 className="text-2xl mb-3 text-blue-800 bg-base-200 py-2">Create new Quiz</h1>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
             {/* Displaying questions */}
             <form onSubmit={handleSubmitQuiz}  className='border-3 p-8 bg-white'>
             <label className="input input-bordered flex items-center gap-2 my-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
            <input type="text" name="time" className="grow" placeholder="Time for this quiz" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
            <input type="text" name="lesson_id" className="grow" placeholder="Lesson this quiz unlocks" />
            </label>
             {questions.length > 0 && (
                        <div className="mt-4 bg-base-200 rounded-2xl p-2 mb-2">
                            <h2 className="text-2xl font-semibold mb-2">Current Questions:</h2>
                            <ul>
                                {questions.map((q, index) => (
                                    <div key={index} className="my-3 rounded-xl">
                                    <div className="flex items-center justify-between text-2xl bg-indigo-950 p-2">
                                        <h3 className= "text-white">{q.question}</h3>
                                        <h2 className="text-white">marks({q.mark})</h2>
                                    </div>
                                            <div className="text-xl p-2">
                                                <p className="bg-blue-100 my-1 p-1 px-2">1) {q.option1}</p>
                                                <p className="bg-blue-100 my-1 p-1 px-2">2) {q.option2}</p>
                                                <p className="bg-blue-100 my-1 p-1 px-2">3) {q.option3}</p>
                                                <p className="bg-blue-100 my-1 p-1 px-2">4) {q.option4}</p>
                                            </div>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    )}
                         <button type="submit" className="btn w-full mt-2">Create Quiz</button>
            </form>
            <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
                
            <form onSubmit={handleSubmit}  className='border-3 p-8 bg-white'>
                <h1 className='flex items-center gap-3 text-4xl font-semibold text-blue-800 mb-5'><MdLibraryAdd />New Question</h1>
                {/* name */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text text-blue-800">Enter the question?</span>
                    <span className="label-text-alt"></span>
                </label> 
                <textarea className="textarea textarea-bordered h-24 bg-slate-200" name='question' placeholder="Enter the question here" required ></textarea>
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-blue-800">Enter the option 1</span>
                    </label>
                    <input  type="text"  name='option1' placeholder="option 1" className="input input-bordered w-full bg-slate-200"  required/>
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-blue-800">Enter the option 2</span>
                    </label>
                    <input  type="text"  name='option2' placeholder="option 2" className="input input-bordered w-full bg-slate-200"  required/>
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-blue-800">Enter the option 3</span>
                    </label>
                    <input  type="text"  name='option3' placeholder="option 3" className="input input-bordered w-full bg-slate-200"  required/>
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-blue-800">Enter the option 4</span>
                    </label>
                    <input  type="text"  name='option4' placeholder="option 4" className="input input-bordered w-full bg-slate-200"  required/>
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-blue-800">Enter correct answer</span>
                    </label>
                    <input  type="text"  name='answer' placeholder="correct answer" className="input input-bordered w-full bg-slate-200"  required/>
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-blue-800">Marks for this question</span>
                    </label>
                    <input  type="text"  name='mark' placeholder="marks for this question" className="input input-bordered w-full bg-slate-200"  required/>
                </div>
                <button type="submit" class="w-full inline-block px-6 py-2 border-2 mt-5 border-blue-800 text-xl text-blue-800 font-medium leading-normal uppercase rounded hover:bg-blue-800 hover:text-white  focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                    ADD QUESTION
                </button>
       
                </form>

                <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button, it will close the modal */}
                    <button className="btn rounded-full absolute top-5 right-5"><span> X </span></button>
                </form>
                
                </div>
            </div>
            </dialog>
            <button className="btn w-full " onClick={()=>document.getElementById('my_modal_4').showModal()}>Add question</button>
            {/* <button className="btn w-full mt-2" onClick={sendQuestionsToServer}>Create Quiz</button> */}
        </div>
     );
}
 
export default CreateQuizPage;