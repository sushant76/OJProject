import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../../App.css'
const { useState,useEffect } = require('react');
//const bcrypt = require('bcryptjs');

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');

  const navigate = useNavigate();

  
  const handleSignUp = () =>{
    navigate("/RegisterUser");
  }
  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  }

  const handleSubmit = async () => {
    const payload = {
      email: email,
      password: password
    };
    try {
      const { data } = await axios.post('http://localhost:8000/login', payload);
      setOutput(data.success);
      console.log(data);
      

    } catch (error) {
      console.log("Error while logging in : " + error);
    }
  }


  useEffect(() => {
    if (output === true) {
      navigate('/FileSubmission');
    }

  },[output]);
  return (
    <div className='form-container'>
      <div className="form">
        <h1>Welcome to AlgoU Online Code Compiler</h1><br />
        <div className="form-body">
          <div className="email">
            <label className="form__label" htmlFor="email">Email </label>
            <input type="email" id="email" className="form__input" value={email} onChange={(e) => handleInputChange(e)} placeholder="Email" />
          </div>
          <div className="password">
            <label className="form__label" htmlFor="password">Password </label>
            <input className="form__input" type="password" id="password" value={password} onChange={(e) => handleInputChange(e)} placeholder="Password" />
          </div>
        </div>
        <div className="footer">
          <button type="e-success" className="btn" onClick={handleSignUp}>Signup</button>
          <button type="submit" className="btn" onClick={handleSubmit}>Login</button>
        </div>
      </div>

    </div>
  )
}
export default LoginPage;