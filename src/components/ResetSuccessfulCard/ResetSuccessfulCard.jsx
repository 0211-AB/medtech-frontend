import React from 'react'
import './resetSuccessfulCard.css'
import { ReactComponent as Tick } from '../../assets/tickFrame.svg'
import { useNavigate } from 'react-router-dom';
function ResetSuccessfulCard() {
    const navigate = useNavigate()
    return (
        <div className='resetSuccessfulContainer container'>
            <div className='resetPasswordCardWrapper'>
                <Tick className='keyIcon' />
                <span className='resetPasswordHeading'>Password Reset</span>
                <span className='resetPasswordSubHeading'>Your password has been successfully reset. Click below to login.</span>

                <button className="resetButton" onClick={() => {
                    navigate('/login')
                }}>Back To Login</button>
            </div>
        </div>
    )
}

export default ResetSuccessfulCard