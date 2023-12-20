import React, { useState } from 'react';
import './loginCard.css';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';

function LoginCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="loginCardWrapper">
      <div>
        <span className="loginCardTitle">Login</span>
      </div>

        <span className="title">User Id</span>

        <input
          type="text"
          value={email}
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
          className='emailInput'
        />

        <span className="title">Password </span>
      <div className="passwordInputWrapper">
        <div className="passwordInputInnerWrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className={`eye-icon ${showPassword ? 'visible' : ''}`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>
        </div>
      </div>

      <div>
        <button className="loginButton">Login</button>
      </div>

      <div></div>
    </div>
  );
}

export default LoginCard;
