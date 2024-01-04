import React, { useContext, useEffect, useState } from 'react'
import File from '../../assets/files.svg'
import Settings from '../../assets/settings.svg'
import User from '../../assets/user.svg'
import './sideBar.css'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../store/AuthContext'

const SideBar = () => {
    const [tab, setTab] = useState(0)
    const authCtx = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (window.location.pathname === '/settings')
            setTab(1)
        else if (window.location.pathname === '/users')
            setTab(2)
        else
            setTab(0)
        // eslint-disable-next-line
    }, [window.location])

    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', width: '80px', height: '100%', background: 'rgba(51, 66, 96, 1)' }}>
            <div className={tab === 0 ? 'sideBarBox selectedBox' : 'sideBarBox'} onClick={() => { navigate('/') }}>
                <img src={File} style={{ transform: 'scale(1.5)' }} alt="FileImg" />
            </div>

            {authCtx.isAdmin === true && <div className={tab === 1 ? 'sideBarBox selectedBox' : 'sideBarBox'} onClick={() => { navigate('/settings') }}>
                <img src={Settings} style={{ transform: 'scale(1.5)' }} alt="SettingsImg" />
            </div>}

            {authCtx.isAdmin === true && <div className={tab === 2 ? 'sideBarBox selectedBox' : 'sideBarBox'} onClick={() => { navigate('/users') }}>
                <img src={User} style={{ transform: 'scale(1.5)' }} alt="UserImg" />
            </div>}

        </div>
    )
}

export default SideBar