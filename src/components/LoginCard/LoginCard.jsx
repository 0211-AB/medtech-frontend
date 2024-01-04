import React, { useEffect, useState } from 'react';
import './loginCard.css';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { signIn } from '../../services/authService';
import { useContext } from 'react';
import AuthContext from '../../store/AuthContext';

function LoginCard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const authCtx = useContext(AuthContext)

  useEffect(() => {
    if (authCtx.isLoggedIn)
      navigate('/')
  }, [authCtx])

  useEffect(() => {
    if (loading === true) {

      if (email === "") {
        toast("Email is required")
        setLoading(false)
        return;
      }

      if (password === "") {
        toast("Password is required")
        setLoading(false)
        return;
      }

      const signInUser = async () => {
        try {
          const res = await signIn({ email, password })
          if (res?.status === "success") {
            authCtx.login(res.data.token, res.data.role === "Admin", { name: res.data.name, email: res.data.email })
            if (res.data.hasResetPassword === false)
              navigate('/reset-password')
            else
              navigate('/')
          } else
            throw new Error("Sign Up Failed");
        } catch (e) {
          toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
        }
      }

      signInUser()
      setLoading(false)
    }
    // eslint-disable-next-line
  }, [loading])

  return (
    <div className=" loginContainer container ">
      <ToastContainer />
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

        {loading === false ? <div>
          <button className="loginButton" onClick={() => { setLoading(true); }} >Login</button>
        </div> : <button className="loginButton">Loading ... </button>}

        <div></div>
      </div>
    </div>
  );
}

export default LoginCard;
