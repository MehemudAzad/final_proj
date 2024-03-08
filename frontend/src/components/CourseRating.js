import React, { useEffect, useState } from 'react';

const StarRating = ({ rating }) => {
  // State to store the average rating
  const [rats, setRats] = useState(0);
  console.log(rating);
  useEffect(() => {
    // Set the rating state with the rating prop
    setRats(Math.round(rating));
    console.log('rounded value:', Math.round(rating));
  }, []);

  // Function to generate star icons based on rating
  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rats) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
};

  return (
    <div className="star-rating">
      {
        generateStars()
      }
    </div>
  );
};
const CourseRating = ({ course_id }) => {
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log(course_id);
  
    useEffect(() => {
      fetch(`http://localhost:5002/course_reviews/${course_id}`)
        .then((res) => res.json())
        .then((data) => {
          setRating(data[0]?.ratings);
          console.log(rating);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }, []);

    console.log(rating); 
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    return (
      <div>
        <div>
          <h2 className="text-2xl text-blue-900 font-bold my-3">RATING : {rating}</h2>
        </div>
        <StarRating rating={rating} />
      </div>
    );
  };

export default CourseRating;