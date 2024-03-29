import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LogOut from '../../assets/logout.svg'
import { ReactComponent as Logo } from '../../assets/Group.svg'
import './navBar.css'
import AuthContext from '../../store/AuthContext'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authCtx = useContext(AuthContext)
  const navigate = useNavigate()
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='nav-main' style={{
      height: '77px',
      background: '#fff',
      width: '100%',
      padding: '20px 120px',
      display: 'flex',
      boxShadow: '0px 2px 18px 0px rgba(0, 0, 0, 0.1)',
    }}>
      {authCtx?.user?.organization ? <img src={authCtx?.user?.organization?.imageData} /> : <Logo style={{ transform: 'scale(8)' }} />}
      <div style={{
        display: 'flex',
        marginLeft: 'auto',
        justifyContent: 'flex-end',
        cursor: 'pointer',
        position: 'relative'
      }}
        onClick={toggleDropdown}>

        {isOpen && (
          <div className="dropdown-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => { navigate('/reset-password') }}>
              <ion-icon name="key" style={{ fontSize: 20 }}></ion-icon>Reset Password
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={authCtx.logout}>
              <img src={LogOut} alt="Log Out"></img>Log Out
            </div>
          </div>
        )}

        <div style={{
          width: '35px',
          height: '35px',
          borderRadius: '100%',
          background: 'rgba(122, 90, 248, 1)',
          color: 'white',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {authCtx.user?.name?.substring(0, 1)?.toUpperCase()}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginLeft: '10px', color: '#808080', textDecoration: 'underline'
        }}>
          {authCtx.user?.email}
        </div>

      </div>
    </div>
  )
}

export default NavBar