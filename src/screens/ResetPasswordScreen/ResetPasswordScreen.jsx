import React from 'react'
import './resetPasswordScreen.css'
import ResetPasswordCard from '../../components/ResetPasswordCard/ResetPasswordCard'
import ResetSuccessfulCard from '../../components/ResetSuccessfulCard/ResetSuccessfulCard'

function ResetPasswordScreen() {
  const [resetSuccessful, setResetSuccessful] = React.useState(false)
  function handleSuccessfulReset() {
    setResetSuccessful(true)
  }
  return (
    <div className='authWrapper'>
      <div className='centerDiv'>
        {resetSuccessful ? <ResetSuccessfulCard /> : <ResetPasswordCard handleSuccessfulReset={handleSuccessfulReset} />}
      </div>
    </div>
  )
}

export default ResetPasswordScreen