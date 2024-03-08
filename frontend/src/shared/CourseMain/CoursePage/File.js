import { Link } from "react-router-dom";

const File = ({ submission }) => {
  const { file_id, file_name, name} = submission;

  const handleDownload = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5002/submission-download/${file_id}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file_name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error('Failed to download file:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    
      <a href="#" onClick={handleDownload}>
      <div className="py-1 px-2 my-3  border-l-4 border-indigo-800 bg-base-200 hover:bg-base-300 rounded">
        <h3 className="text-2xl">{file_id}. {file_name}</h3>
        <p className="text-md text-blue-700">added by {name}</p>
      </div>
      </a>
    
  );
};


export default File;