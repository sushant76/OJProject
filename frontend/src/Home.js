import React from 'react';
import axios from 'axios';

const {useState} = require('react');

function FileSubmission () {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    console.log(code);

    const handleSubmit = async () => {
        const payload = {
            language: 'java',
            code
        };
        try {
            const { data } = await axios.post('http://localhost:8000/submit', payload);
            setOutput(data.output);
            console.log(data);

        } catch (error) {
            console.log("Error while submission :" + error);
        }
    } 
    return(
        <>
            <div className='container'>
                <h1>AlgoU Online Code Compiler</h1><br />
                <select className='select-box'>
                    <option value='cpp'>C++</option>
                    <option value='java'>Java</option>
                    <option value='js'>Javascript</option>
                    <option value='python'>Python</option>
                </select>
                <textarea rows='20' cols='75' className='textarea' onChange={(e) => {
                    setCode(e.target.value);
                }}>
                </textarea>
                <button className='submit-button' onClick={handleSubmit}>Submit</button>
                {
                    output &&
                    <div className='outputbox'>
                        <p>{output}</p>
                    </div>
                }
            </div>
        </>
    )
};
export default FileSubmission;
// ...