import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import { ToastContainer, toast } from 'react-toastify';
import { getConfig, updateConfig } from '../../services/configService';

const SettingsScreen = () => {
    const [data, setData] = useState(null)
    const [updateData, setUpdateData] = useState(null)

    useEffect(() => {
        const getConfigData = async () => {
            try {
                const res = await getConfig()
                if (res?.status === "success") {
                    setData(res.config)
                } else
                    throw new Error("Fetching Failed");
            } catch (e) {
                toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
            }
        }

        if (data === null)
            getConfigData()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const updateConfigData = async () => {
            try {
                const res = await updateConfig(updateData)
                if (res?.status === "success") {
                    toast('Updated Setting Successfully')
                    setUpdateData(null)
                } else
                    throw new Error("Fetching Failed");
            } catch (e) {
                toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
            }
        }

        if (updateData !== null)
            updateConfigData()
    }, [updateData])

    return (
        <>
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

                        <select style={{ margin: '15px', padding: '10px', width: '60%', outline: 'none', border: '1px solid #EAECF0', background: '#FCFCFD', color: '#ADB5BD' }} onChange={(e) => { setUpdateData({ days: e.target.value }) }}>
                            <option disabled>Choose Data Retention Period</option>
                            <option selected={data?.daysToDelete === '7'} value='7'>7 Days</option>
                            <option selected={data?.daysToDelete === '15'} value='15'>15 Days</option>
                            <option selected={data?.daysToDelete === '30'} value='30'>30 Days</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', background: '#fff', width: '90%', padding: '10px 40px' }}>
                        <div style={{
                            padding: '15px', display: 'flex', background: '#F5F5F5', fontSize: '24px',
                            fontWeight: '500',
                            textAlign: 'left',
                            width: '100%',
                            borderRadius: '10px'
                        }}>
                            File Upload Settings
                        </div>
                        <h4 style={{ padding: '15px', fontWeight: '600' }}>MAXIMUM FILE UPLOAD SIZE LIMIT</h4>
                        <p style={{ padding: '0 15px' }}>Adjust the maximum size allowed for file uploads. This affects the size of files users can upload to the platform.<br></br>
                            <b>Note :   </b> Increasing the file upload size limit may affect performance and storage usage.</p>

                        <select style={{ margin: '15px', padding: '10px', width: '60%', outline: 'none', border: '1px solid #EAECF0', background: '#FCFCFD', color: '#ADB5BD' }} onChange={(e) => { setUpdateData({ size: e.target.value }) }}>
                            <option disabled>Choose Maximum File Size</option>
                            <option selected={data?.maxUploadSize === '104857600'} value='104857600'>100 MB</option>
                            <option selected={data?.maxUploadSize === '209715200'} value='209715200'>200 MB</option>                                    
                            <option selected={data?.maxUploadSize === '314572800'} value='314572800'>300 MB</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SettingsScreen