import React from 'react';
import './loginScreen.css';
import { ReactComponent as LogoWhite } from '../../assets/LogoWhite.svg';
import LoginCard from '../../components/LoginCard/LoginCard';

function LoginScreen() {
  return (
    <div className='authWrapper'>
      <div className='header'>
        <LogoWhite className="logo"  />
      </div>
      <div className='container'>
        <LoginCard />
      </div>
    </div>
  );
}

export default LoginScreen;
