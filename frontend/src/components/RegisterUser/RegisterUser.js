import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import '../../App.css'
const { useState } = require('react');
function RegistrationForm() {

    const [firstname, setFirstName] = useState(null);
    const [lastname, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const [output, setOutput] = useState('');
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "firstName") {
            setFirstName(value);
        }
        if (id === "lastName") {
            setLastName(value);
        }
        if (id === "email") {
            setEmail(value);
        }
        if (id === "password") {
            setPassword(value);
        }
        if (id === "confirmPassword") {
            setConfirmPassword(value);
        }

    }

    const handleSubmit = async () => {
        console.log(firstname, lastname, email, password, confirmPassword);
        const payload = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        };
        try {
            const { data } = await axios.post('http://localhost:8000/register', payload);
            setOutput(data.success);
            console.log(data);
            if (output === true) {
                navigate("..");
            }

        } catch (error) {
            console.log("Error while submission :" + error);
        }
    }
    return (
        <div className='form-container'>
            <div className="form">
                <div className='header'>
                    <h1>RegistrationForm</h1>
                </div>
                <div className="form-body">
                    <div className="username">
                        <label className="form__label" htmlFor="firstName">First Name </label>
                        <input className="form__input" type="text" value={firstname} onChange={(e) => handleInputChange(e)} id="firstName" placeholder="First Name" />
                    </div>
                    <div className="lastname">
                        <label className="form__label" htmlFor="lastName">Last Name </label>
                        <input type="text" name="" id="lastName" value={lastname} onChange={(e) => handleInputChange(e)} className="form__input" placeholder="LastName" />
                    </div>
                    <div className="email">
                        <label className="form__label" htmlFor="email">Email </label>
                        <input type="email" id="email" value={email} onChange={(e) => handleInputChange(e)} className="form__input" placeholder="Email" />
                    </div>
                    <div className="password">
                        <label className="form__label" htmlFor="password">Password </label>
                        <input className="form__input" type="password" id="password" value={password} onChange={(e) => handleInputChange(e)} placeholder="Password" />
                    </div>
                    <div className="confirm-password">
                        <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
                        <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => handleInputChange(e)} placeholder="Confirm Password" />
                    </div>
                </div>
                <div className="footer">
                    <button type="submit" className="btn" onClick={() => handleSubmit()}>Register</button>
                    {
                        output &&
                        <div className='outputbox'>
                            <p>{output}</p>
                        </div>
                    }
                </div>
            </div>

        </div>

    )
}
export default RegistrationForm;