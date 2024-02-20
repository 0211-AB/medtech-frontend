import React, { useState, useEffect } from 'react'
import { ReactComponent as Key } from '../../assets/keyFrame.svg'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { FaArrowLeftLong } from "react-icons/fa6";
import './resetPasswordCard.css'
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/userService';
import { ToastContainer, toast } from 'react-toastify';

function ResetPasswordCard({ handleSuccessfulReset }) {
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (loading === true) {

            if (password === "") {
                toast("Password is required")
                setLoading(false)
                return;
            }

            if ((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(password) === false) {
                toast("Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character (@$!%*?&) is required for password")
                setLoading(false)
                return;
            }

            if (confirmPassword === "") {
                toast("Confirm Password is required")
                setLoading(false)
                return;
            }

            if (confirmPassword !== password) {
                toast("The passwords are not mtaching. Please try again")
                setLoading(false)
                return;
            }

            const resetUserPassword = async () => {
                try {
                    const res = await resetPassword({ newpassword: password })
                    if (res?.status === "success") {
                        handleSuccessfulReset(true)
                        setLoading(false)
                    } else
                        throw new Error("Resset Password Failed");
                } catch (e) {
                    setLoading(false)
                    toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
                }
            }

            resetUserPassword()
        }

        // eslint-disable-next-line
    }, [loading])


    return (
        <div div className='resetContainer container'>
            <ToastContainer />
            <div className='resetPasswordCardWrapper'>
                <Key className='keyIcon' />
                <span className='resetPasswordHeading'>Set New Password</span>
                <span className='resetPasswordSubHeading'>Your new password must be different from previously used password.</span>
                <span className="resetPasswordTitle">New Password</span>
                <div className="passwordInputWrapper" style={{ marginTop: '10px' }}>
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
                <span className="resetPasswordTitle" style={{ marginTop: '10px' }}>Confirm Password</span>
                <div className="passwordInputWrapper">
                    <div className="passwordInputInnerWrapper">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            placeholder="Enter your password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span
                            className={`eye-icon ${showConfirmPassword ? 'visible' : ''}`}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </span>
                    </div>
                </div>
                {loading === false ? <button className="resetButton" style={{ marginTop: 25 }} onClick={() => {
                    setLoading(true)
                }}>Reset Password</button> : <button className="resetButton" style={{ marginTop: 25 }}>Loading ... </button>}
                <div className='backButtonWrapper' onClick={() => { navigate("/login") }} >
                    <FaArrowLeftLong className='backButtonIcon' />
                    <span className='backButtonText'>Back</span>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordCard