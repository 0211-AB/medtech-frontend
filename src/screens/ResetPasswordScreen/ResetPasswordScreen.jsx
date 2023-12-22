import React from 'react'
import './resetPasswordScreen.css'
import { ReactComponent as LogoWhite } from '../../assets/LogoWhite.svg'
import ResetPasswordCard from '../../components/ResetPasswordCard/ResetPasswordCard'
import ResetSuccessfulCard from '../../components/ResetSuccessfulCard/ResetSuccessfulCard'
function ResetPasswordScreen() {
  const [resetSuccessful, setResetSuccessful] = React.useState(false)
  function handleSuccessfulReset() {
    console.log('Handle Successful Reset');
    setResetSuccessful(true)
  }
  return (
    <div className='authWrapper'>
      <div className='header'>
        <LogoWhite className="logo" />
      </div>
      <div className='centerDiv'>
        {resetSuccessful ? <ResetSuccessfulCard /> : <ResetPasswordCard handleSuccessfulReset={handleSuccessfulReset} />}
      </div>
    </div>
  )
}

export default ResetPasswordScreen