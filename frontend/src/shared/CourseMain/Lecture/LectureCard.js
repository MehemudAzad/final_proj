import React from 'react';

const LectureCard = ({lecture}) => {
    const {lecture_id, vidoe_link, lesson_id, pdf_note, lecture_title} = lecture;
    return (
        <div className='py-5 bg-blue-200 m-4'>
            {lecture_title}
        </div>
    );
};

export default LectureCard;