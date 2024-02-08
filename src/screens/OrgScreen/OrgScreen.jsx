import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import { ToastContainer, toast } from 'react-toastify'
import AddOrgModal from '../../components/Modal/AddOrgModal'
import { allOrganizations } from '../../services/organizationService'
import moment from 'moment'
import EditOrgModal from '../../components/Modal/EditOrgModal'
import AddAdminModal from '../../components/Modal/AddAdminModal'

const OrgScreen = () => {
    const [isOpenAdd, setIsOpenAdd] = useState(false)
    const [orgData, setOrgData] = useState(null)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenAdmin, setIsOpenAdmin] = useState(false)
    const [loading, setLoading] = useState(true)
    const [orgs, setOrgs] = useState([])

    useEffect(() => {
        const getOrganizations = async () => {
            try {
                const res = await allOrganizations()
                if (res?.status === "success") {
                    setLoading(false)
                    setOrgs(res?.orgs ? res?.orgs : [])
                    setOrgData(null)
                } else
                    throw new Error("Fetching Failed");
            } catch (e) {
                setLoading(false)
                toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
                setOrgData(null)
            }
        }

        if (loading)
            getOrganizations()
        // eslint-disable-next-line
    }, [loading])

    return (
        <>
            <ToastContainer />
            {isOpenAdd && <AddOrgModal setIsOpen={setIsOpenAdd} setLoadingOrgs={setLoading} />}
            {isOpenEdit && <EditOrgModal setIsOpen={setIsOpenEdit} setLoadingOrgs={setLoading} orgData={orgData} />}
            {isOpenAdmin && <AddAdminModal setIsOpen={setIsOpenAdmin} orgData={orgData} />}
            <NavBar />
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', height: '89vh' }}>
                <SideBar />
                <div style={{ display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ padding: '20px 60px', display: 'flex', background: '#F8F8F8' }}>
                        <span style={{
                            fontSize: '25px',
                            fontWeight: '500',
                            textAlign: 'left',
                        }}> Organizations </span>
                    </div>
                    <div style={{ padding: '20px 60px', display: 'flex', justifyContent: loading ? 'center' : 'flex-start', alignItems: loading ? 'center' : 'flex-start', gap: '25px',flexWrap:'wrap' }}>
                        {loading ?
                            <div id='svg-container'>
                                <svg class="pl" viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
                                            <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                                            <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                                        </linearGradient>
                                        <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                                            <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                                        </linearGradient>
                                    </defs>
                                    <circle class="pl__ring" cx="100" cy="100" r="82" fill="none" stroke="url(#pl-grad1)" stroke-width="36" stroke-dasharray="0 257 1 257" stroke-dashoffset="0.01" stroke-linecap="round" transform="rotate(-90,100,100)" />
                                    <line class="pl__ball" stroke="url(#pl-grad2)" x1="100" y1="18" x2="100.01" y2="182" stroke-width="36" stroke-dasharray="1 165" stroke-linecap="round" />
                                </svg>
                            </div> :
                            <>
                                {orgs.map((org) => {
                                    return <div style={{ width: '250px', height: '250px', background: '#F4F4F4', borderRadius: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 500, flexDirection: 'column' }}>
                                        <div style={{ height: '130px',padding: '5px' }}>
                                            <img src={org.imageData} style={{  maxWidth: '100%',height: '125px', borderRadius: '15px', padding: '5px', }} alt={org.description} />
                                        </div>
                                        {org.organizationName}
                                        <p style={{ fontWeight: 500, textAlign: 'right', fontSize: 10, marginBottom: 10 }}>Created On {moment(org.createdAt).format('do MMMM YYYY')}</p>
                                        <br></br>
                                        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', gap: 10 }}>
                                            <button style={{ border: 'none', cursor: 'pointer', background: 'darkgray', color: 'white', padding: '5px 10px', borderRadius: 5 }} onClick={() => { setOrgData(org); setIsOpenEdit(true) }} >Edit Details</button>
                                            <button style={{ border: 'none', cursor: 'pointer', background: 'gray', color: 'white', padding: 5, borderRadius: 5 }} onClick={() => { setOrgData(org); setIsOpenAdmin(true) }} >Add Admin</button>
                                        </div>
                                    </div>

                                })}

                                <div style={{ width: '250px', height: '250px', background: '#F4F4F4', borderRadius: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 500, flexDirection: 'column', cursor: 'pointer' }} onClick={() => { setIsOpenAdd(true) }}>
                                    <ion-icon name="add-circle-outline" style={{ fontSize: 80 }}></ion-icon>
                                    <br></br>
                                    Add New Organization
                                </div>
                            </>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrgScreen