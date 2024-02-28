import { useLoaderData } from "react-router-dom";
import LectureComments from "./LectureComments";
import LectureVideo from "./LectureVideo";

const LecturesPage = () => {
    const lecture = useLoaderData();
    console.log(lecture);
    if(lecture) {
        const {lecture_id, pdf_note, video_link} = lecture;
    }
    return ( 
        <div className="px-6 py-4">
            <LectureVideo lecture= {lecture}></LectureVideo>
            <LectureComments lecture={lecture}></LectureComments>
        </div>
     );
}
 
export default LecturesPage;