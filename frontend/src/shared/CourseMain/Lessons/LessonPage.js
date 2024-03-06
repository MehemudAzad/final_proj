import React from 'react';
import { pdfjs } from 'react-pdf';
import PdfComp from "./../../../components/PdfComp.js";
import pdf from "./1.pdf";
import {useLoaderData} from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

const LessonPage = () => {
    const lesson = useLoaderData();
    console.log(lesson)
    const pdf_link = lesson[0]?.lesson_pdf?.substring(7);
    return (
        <div className='p-2 bg-base-300'>
            <PdfComp pdfFile={`http://localhost:5002/${pdf_link}`}/>
        </div>
    );
};

export default LessonPage;