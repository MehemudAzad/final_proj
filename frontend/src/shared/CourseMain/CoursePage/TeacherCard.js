import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const TeacherCard = ({ teacher, course }) => {
  const { user } = useContext(AuthContext);
  console.log(teacher, "form teacher card");
  const [rating, setRating] = useState(0); // Initial rating state

  // Function to handle rating change
  const handleRatingChange = (event) => {
      // Retrieve the selected rating from the event
      const selectedRating = parseInt(event.target.value, 10);
      // Update the rating state
      setRating(selectedRating);
  };

  const handleSubmit = () => {
      // Handle submission logic here, such as sending the review to the server
      // Clear the input field after submission
      const reviewData = {
          rating: rating,
          course_id: course?.course_id,
          user_id: user?.id,
          teacher_id : teacher?.teacher_id
      };

      // Make an HTTP POST request to your backend endpoint
      fetch('http://localhost:5002/teacher_reviews', {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(reviewData),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to submit review');
          }
          return response.json();
      })
      .then(data => {
          // Handle success response
          console.log('Review submitted successfully:', data);
          // Clear the input fields after submission
          setRating(0);
      })
      .catch(error => {
          // Handle error
          console.error('Error submitting review:', error.message);
      });
  };

  const { id, teacher_id, role, username } = teacher;
  console.log(teacher, "from teahcer card dfafd");
  return (
    <div className="hover:indigo-200">
      {user?.teacher_id === teacher?.teacher_id ? (
        <>
          <div className="bg-indigo-50 p-4 rounded my-3">
            <Link to={`/teacher/profile/${user?.teacher_id}`}>
              <h2>
                Name : <span className="text-blue-500 hover:underline hover:text-blue-700">{username}</span> (you)
              </h2>
            </Link>
            <h2>
                Instituition : <span>{
                  teacher?.institution ? <>
                  <span className="text-blue-500">
                  {teacher?.institution}
                </span></> :
                  <>
                  not available
                  </>
                }</span>     
            </h2>
          </div>
        </>
      ) : (
        <>
          <div className="bg-indigo-50 p-4 rounded my-3 flex items-center justify-between">
            <div>
            <Link to={`/teacher/profile/view/${teacher?.teacher_id}`}>
              <h2>
                Name : <span className="text-blue-500 hover:underline hover:text-blue-700">{username}</span>
              </h2>
            </Link>
            <h2>
                Instituition : <span>{
                  teacher?.institution ? <>
                  <span className="text-blue-500">
                  {teacher?.institution}
                </span></> :
                  <>
                  not available
                  </>
                }</span>     
            </h2>
            </div>
            
            <div>
            {
              user?.role ==="student" ? <><div className='flex items-center '>
                  <div className="rating mx-4">
                      <input
                          type="radio"
                          name={`rating-${teacher?.teacher_id}`}
                          className="mask mask-star"
                          value="1"
                          checked={rating === 1}
                          onChange={handleRatingChange}
                      />
                      <input
                          type="radio"
                          name={`rating-${teacher?.teacher_id}`}
                          className="mask mask-star"
                          value="2"
                          checked={rating === 2}
                          onChange={handleRatingChange}
                      />
                      <input
                          type="radio"
                          name={`rating-${teacher?.teacher_id}`}
                          className="mask mask-star"
                          value="3"
                          checked={rating === 3}
                          onChange={handleRatingChange}
                      />
                      <input
                          type="radio"
                          name={`rating-${teacher?.teacher_id}`}
                          className="mask mask-star"
                          value="4"
                          checked={rating === 4}
                          onChange={handleRatingChange}
                      />
                      <input
                          type="radio"
                          name={`rating-${teacher?.teacher_id}`}
                          className="mask mask-star"
                          value="5"
                          checked={rating === 5}
                          onChange={handleRatingChange}
                      />
                  </div>
                  <button className="btn btn-primary px-3" onClick={handleSubmit}>
                      Submit
                  </button>
              </div>
              </> : <></>
            }
            </div>
               
          </div>
        </>
      )}
    </div>
  );
};

export default TeacherCard;
