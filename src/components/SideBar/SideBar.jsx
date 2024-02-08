import React, { useContext, useEffect, useState } from 'react'
import File from '../../assets/files.svg'
import Settings from '../../assets/settings.svg'
import User from '../../assets/user.svg'
import OpenAI from '../../assets/openai.png'
import './sideBar.css'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../store/AuthContext'

const SideBar = () => {
    const [tab, setTab] = useState(0)
    const authCtx = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (window.location.pathname === '/prompt')
            setTab(5)
        else if (window.location.pathname === '/upload')
            setTab(4)
        else if (window.location.pathname === '/organizations')
            setTab(3)
        else if (window.location.pathname === '/settings')
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

            <div className={tab === 4 ? 'sideBarBox selectedBox' : 'sideBarBox'} onClick={() => { navigate('/upload') }}>
                <ion-icon name="cloud-upload-outline" style={{ color: "white", fontSize: 30 }}></ion-icon>
            </div>

            {authCtx.isAdmin === true && <div className={tab === 5 ? 'sideBarBox selectedBox' : 'sideBarBox'} onClick={() => { navigate('/prompt') }}>
            <img src={OpenAI} style={{ transform: 'scale(0.2)' }} alt="FileImg" />
            </div>}

            {(authCtx.isAdmin || authCtx.isSuperAdmin) === true && <div className={tab === 2 ? 'sideBarBox selectedBox' : 'sideBarBox'} onClick={() => { navigate('/users') }}>
                <img src={User} style={{ transform: 'scale(1.5)' }} alt="UserImg" />
            </div>}

            {authCtx.isAdmin === true && <div className={tab === 1 ? 'sideBarBox selectedBox' : 'sideBarBox'} onClick={() => { navigate('/settings') }}>
                <img src={Settings} style={{ transform: 'scale(1.5)' }} alt="SettingsImg" />
            </div>}

            {authCtx.isSuperAdmin === true && <div className={tab === 3 ? 'sideBarBox selectedBox' : 'sideBarBox'} onClick={() => { navigate('/organizations') }}>
                <ion-icon name="business-outline" style={{ color: "white", fontSize: 30 }}></ion-icon>
            </div>}

        </div>
    )
}

export default SideBar