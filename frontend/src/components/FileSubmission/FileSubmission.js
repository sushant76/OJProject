import React from 'react';
import axios from 'axios';
import { uploadFile } from '../../service/api';
const { useState, useEffect, useRef } = require('react');

function FileSubmission() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const [recentSubmission,setRecentSubmission] = useState('');
  console.log(code);

  


  useEffect(() => {
    document.getElementById("outputBox").value = output;

    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
  
        const response = await uploadFile(data);
        console.log(response);
        setResult(response.path);
  
        var reader = new FileReader();
  
        reader.onload = function (e) {
          var fileContent = reader.result;
          // Here the content has been read successfuly
          document.getElementById("codeBox").value = fileContent;
          setCode(fileContent);
        }
  
        reader.readAsText(file);
        //} 
      }
    }
  
    getImage();

    const getRecentSubmissions = async () =>{
      try{
        const {data} = await axios.get('http://localhost:8000/fetchFiles');
        if(data.success === true){
          Object.values(data.fileNames).forEach(val => {
            document.getElementById("recentSubmissions").value += val.name+"\n";
          });
        }        
      }catch(error){
        console.log("Error while fetching submissions: "+error);
      }
    }

    getRecentSubmissions();
  }, [output, file]);

  const fileInputRef = useRef();
  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (req,res) => {
    const payload = {
      language: 'java',
      code,
  
    };
    try {
      const { data } = await axios.post('http://localhost:8000/submit', payload);
      setOutput(data.output);
      console.log(data);

    } catch (error) {
      console.log("Error while submission :" + error);
      setOutput(error);
    }
  }
  return (
    <>
      <div className='container'>
        <div>
          <a href='http://localhost:3000'>Back to Login</a>
          <h1>AlgoU Online Code Compiler</h1>
        </div>
        <div className='divCenter'>
          <h3>Select language </h3>
          <select className='select-box'>
            <option value='cpp'>C++</option>
            <option value='java'>Java</option>
            <option value='js'>Javascript</option>
            <option value='python'>Python</option>
          </select>
        </div>
        <div className="row">
          <div className="column left" >
            <div>
              <h3>Submissions</h3><textarea rows='20' cols='20' id="recentSubmissions" className='textarea'></textarea>
            </div>
          </div>
          <div className="column middle">
            <textarea rows='20' cols='75' id='codeBox' className='textarea' placeholder='Type your code here.' onChange={(e) => { setCode(e.target.value); }}></textarea>
          </div>
          <div className="column right" >
          </div>
        </div>
        <div className='divCenter'>
          <button onClick={() => onUploadClick()}>Upload</button>
          <input type="file" ref={fileInputRef} style={{
            display: "none"
          }} onChange={(e) => setFile(e.target.files[0])} />
          {
            result &&
            <a href={result}>Download File</a>
          }
        </div>
        <div className='divCenter'>
          <button className='submit-button' onClick={handleSubmit}>Submit</button>
        </div>
        <div>
          <h3>Output</h3>
        </div>
        <div className='divCenter'>
          <div>
            <textarea rows='10' cols='75' id="outputBox" className='textarea'></textarea>
          </div>
        </div>
      </div>
    </>
  )
};
export default FileSubmission;
// ...