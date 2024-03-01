import { MdDriveFolderUpload, MdLibraryAdd } from "react-icons/md";
import { AuthContext } from "../../context/AuthProvider";
import { useContext, useEffect, useState } from "react";

const CreateQuizPage = () => {
    // Object literal syntax
    const [questions, setQuestions] = useState([])
      // Load questions from local storage on component mount
    //   useEffect(() => {
    //     const storedQuestions = JSON.parse(localStorage.getItem('questions'));
    //     if (storedQuestions) {
    //         setQuestions(storedQuestions);
    //     }
    // }, []);
    const {user} = useContext(AuthContext);
    // const getQuestion = (e) => {
    //     const form = e.target;
    //     setQuestion(form.question.value);
    //     console.log(question);
    // }
    // const user_id = user?.id;
    // const teacher_id = user?.teacher_id;
    const handleCreateQuiz = async (e) => {
        e.preventDefault();

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        //calling the form with event.target
        const form = e.target;
        //firstname and lastname add kore fullname banano 
        // const question = form.question.value;
        // const option1 = form.option1.value;
        // const option2 = form.option2.value;
        // const option3 = form.option3.value;
        // const option4 = form.option4.value;
        // const form = e.target.closest('form'); // Get the closest form element
    
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
            mark : mark
        };
        setQuestions([...questions, Obj]);
        console.log(questions)
      };
      console.log(questions)

      const sendQuestionsToServer = async () => {
        try {
            const response = await fetch('http:/localhost:5002/addQuestions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ questions: questions })
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
    };

    return ( 
        <div className="p-4">  
            <h1 className="text-2xl mb-3 text-blue-800 bg-base-200 py-2">Create new Quiz</h1>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
             {/* Displaying questions */}
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
                    <input  type="text"  name='answer' placeholder="option 4" className="input input-bordered w-full bg-slate-200"  required/>
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
                    <button className="btn rounded-full">X</button>
                </form>
                
                </div>
            </div>
            </dialog>
            <button className="btn w-full " onClick={()=>document.getElementById('my_modal_4').showModal()}>Add question</button>
            <button className="btn w-full mt-2" onClick={sendQuestionsToServer}>Create Quiz</button>
        </div>
     );
}
 
export default CreateQuizPage;