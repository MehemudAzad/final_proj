import React from 'react';
import { pdfjs } from 'react-pdf';

import pdf from "./1.pdf";
import PdfComp from './../../../components/PdfComp';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();



const Outline = () => {
    
    return (
        <div className='p-2 bg-base-300'>
            <PdfComp pdfFile={pdf}/>
        </div>
    );
}
 
export default Outline;


