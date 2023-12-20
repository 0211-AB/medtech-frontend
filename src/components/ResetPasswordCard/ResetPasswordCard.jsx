import React, { useState } from 'react'
import { ReactComponent as Key } from '../../assets/keyFrame.svg'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { FaArrowLeftLong } from "react-icons/fa6";
import './resetPasswordCard.css'
function ResetPasswordCard() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <div className='resetPasswordCardWrapper'>
            <Key className='keyIcon' />
            <span className='resetPasswordHeading'>Set New Password</span>
            <span className='resetPasswordSubHeading'>Your new password must be different from previously used passwords.</span>
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
            <span className="resetPasswordTitle">Confirm Password</span>
            <div className="passwordInputWrapper" style={{ marginTop: '10px' }}>
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
            <button className="resetButton">Reset Password</button>
            <div className='backButtonWrapper'>
                <FaArrowLeftLong className='backButtonIcon' />
                <span className='backButtonText'>Back to Login</span>
            </div>
        </div>
    )
}

export default ResetPasswordCard