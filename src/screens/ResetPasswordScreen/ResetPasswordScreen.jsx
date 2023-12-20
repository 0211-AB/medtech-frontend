import React from 'react'
import './resetPasswordScreen.css'
import { ReactComponent as LogoWhite } from '../../assets/LogoWhite.svg'
import ResetPasswordCard from '../../components/ResetPasswordCard/ResetPasswordCard'
function ResetPasswordScreen() {
  return (
    <div className='authWrapper'>
      <div className='header'>
        <LogoWhite className="logo" />
      </div>
      <div className='container'>
        <ResetPasswordCard />
      </div>
    </div>
  )
}

export default ResetPasswordScreen