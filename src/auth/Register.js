
import React, { useState } from 'react';
import "./auth.css";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerAPI } from '../utils/ApiRequest';
import axios from "axios";

function Register() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const validate = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await axios.post(registerAPI, {
        name,
        email,
        password,
        aadharNumber,
        phoneNumber
      });
      console.log(data.data.success);
      if (data.data.success === true) {
        delete data.data.user.password;
        localStorage.setItem("user", JSON.stringify(data.data.user));
        toast.success(data.data.message, toastOptions);
        navigate("/");
      } else {
        toast.error(data.data.message, toastOptions);
      }
    } else {
      alert('Passwords do not match');
    }
  }

  return (
    <section>
      <div className="container-login">
        <div className="user signinBx">
          <div className="imgBx"><img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/reading_0re1.svg" alt='imgbx' /></div>
          <div className="formBx">
            <form method="POST">
              <div className="form">
                <h2>Create an account</h2>
                <input type="text" name="username" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" name="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" placeholder="Create Password" autoComplete="on" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" autoComplete="on" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <input type="text" name="aadharNumber" placeholder="Aadhar Number" value={aadharNumber} onChange={(e) => setAadharNumber(e.target.value)} minLength={12} maxLength={12} />
                <input type="text" name="phoneNumber" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} minLength={10} maxLength={10} />
                <button type="submit" className="btn btn-success" onClick={validate}>Sign up</button>
                <p className="signup">
                  Already have an account ?
                  <Link to="/login">Sign In.</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register;