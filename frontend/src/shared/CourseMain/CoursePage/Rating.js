import React from 'react';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import axios from 'axios';

const Rating = ({ course }) => {
    const { user } = useContext(AuthContext);
    console.log(user?.role, course?.course_id);
    const [review, setReview] = useState('');

    const handleInputChange = (event) => {
        setReview(event.target.value);
    };

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
        console.log('Submitting review:', review);
        // Clear the input field after submission
        const reviewData = {
            review: review,
            rating: rating,
            course_id: course?.course_id,
            user_id: user?.id
        };

        // Make an HTTP POST request to your backend endpoint
        fetch('http://localhost:5002/course_reviews', {
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
            setReview('');
            setRating(0);
        })
        .catch(error => {
            // Handle error
            console.error('Error submitting review:', error.message);
        });
    };


    return (
        <div className='flex items-center '>
            <div className="rating">
                <input
                    type="radio"
                    name="rating"
                    className="mask mask-star"
                    value="1"
                    checked={rating === 1}
                    onChange={handleRatingChange}
                />
                <input
                    type="radio"
                    name="rating"
                    className="mask mask-star"
                    value="2"
                    checked={rating === 2}
                    onChange={handleRatingChange}
                />
                <input
                    type="radio"
                    name="rating"
                    className="mask mask-star"
                    value="3"
                    checked={rating === 3}
                    onChange={handleRatingChange}
                />
                <input
                    type="radio"
                    name="rating"
                    className="mask mask-star"
                    value="4"
                    checked={rating === 4}
                    onChange={handleRatingChange}
                />
                <input
                    type="radio"
                    name="rating"
                    className="mask mask-star"
                    value="5"
                    checked={rating === 5}
                    onChange={handleRatingChange}
                />
            </div>
            <input
                type="text"
                placeholder="Enter the course Review"
                className="input input-bordered w-full max-w-xs mx-4"
                value={review}
                onChange={handleInputChange}
            />
            <button className="btn btn-primary px-3" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    )
}

export default Rating;