import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import { udpateTranscriptRetention } from '../../services/transcriptService'
import { ToastContainer, toast } from 'react-toastify';

const SettingsScreen = () => {
    var prevDays = localStorage.getItem('Retention')
    const [day, setDay] = useState(prevDays === null ? '' : prevDays)

    console.log(day)
    useEffect(() => {
        const updateTranscripts = async () => {
            try {
                const res = await udpateTranscriptRetention({ day })
                if (res?.status === "success") {
                    toast("Updated Sucessfully!!")
                    localStorage.setItem('Retention', `${day}`)
                    prevDays = day
                } else
                    throw new Error("Fetching Failed");
            } catch (e) {
                toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
            }
        }

        if (day !== prevDays)
            updateTranscripts()
        // eslint-disable-next-line
    }, [day])

    return (
        <div>
            <ToastContainer />
            <NavBar />
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', height: '89vh' }}>
                <SideBar />
                <div style={{ display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ padding: '20px 60px', display: 'flex', background: '#F8F8F8' }}>
                        <span style={{
                            fontSize: '25px',
                            fontWeight: '500',
                            textAlign: 'left',
                        }}> Settings </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', background: '#fff', width: '90%', padding: '10px 40px' }}>
                        <div style={{
                            padding: '15px', display: 'flex', background: '#F5F5F5', fontSize: '24px',
                            fontWeight: '500',
                            textAlign: 'left',
                            width: '100%',
                            borderRadius: '10px'
                        }}>
                            Meeting Settings
                        </div>
                        <h4 style={{ padding: '15px', fontWeight: '600' }}>AUTO DELETE MEETINGS</h4>
                        <p style={{ padding: '0 15px' }}>Set a custom data retention period to automatically delete meetings from your notebook. Every meeting will be retained for this time period, after which the meeting data will be permanently deleted from Scribe.ai</p>

                        <select style={{ margin: '15px', padding: '10px', width: '60%', outline: 'none', border: '1px solid #EAECF0', background: '#FCFCFD', color: '#ADB5BD' }} onChange={(e) => { setDay(e.target.value) }}>
                            <option disabled>Choose Data Retention Period</option>
                            <option selected={day === '7'} value='7'>7 Days</option>
                            <option selected={day === '15'} value='15'>15 Days</option>
                            <option selected={day === '30'} value='30'>30 Days</option>
                        </select>

                        <div style={{
                            padding: '15px', display: 'flex', background: '#F5F5F5', fontSize: '24px',
                            fontWeight: '500',
                            textAlign: 'left',
                            width: '100%',
                            borderRadius: '10px'
                        }}>
                            Account Settings
                        </div>

                        <div style={{
                            margin: '15px 0', padding: '15px', display: 'flex', background: '#FaFaFa',
                            width: '100%', justifyContent: 'center', flexDirection: 'column'
                        }}>
                            <h3 style={{ fontWeight: '400' }}>Delete Account</h3>
                            <p style={{ padding: '10px 0', color: '#6B6F76', width: '60%' }}>Be certain before you proceed. After taking the steps to delete the account it will first be <b>deactivated for 30 days</b> and after that the account will be <b>permanently deleted</b> and <b>cannot be undone.</b> You will lose all access to account data</p>
                            <button style={{ width: '20%', padding: '10px 0', border: 'none', outline: 'none', alignSelf: 'flex-end', background: '#f5f5f5a' }}>Delete Your Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsScreen