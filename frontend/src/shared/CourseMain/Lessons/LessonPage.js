import React from 'react';
import { pdfjs } from 'react-pdf';
import PdfComp from "./../../../components/PdfComp.js";
import pdf from "./1.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

const LessonPage = () => {

    
    return (
        <div className='p-2 bg-base-300'>
            <PdfComp pdfFile={pdf}/>
        </div>
    );
};

export default LessonPage;