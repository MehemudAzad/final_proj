import React from 'react';

const LectureCard = ({lecture, isSelected}) => {
    const {lecture_id, vidoe_link, lesson_id, pdf_note, lecture_title} = lecture;
    return (
        <div className={`py-5  m-4 ${isSelected ? "bg-yellow-400" : "bg-blue-200"}`}>
            {lecture_title}
        </div>
    );
};

export default LectureCard;