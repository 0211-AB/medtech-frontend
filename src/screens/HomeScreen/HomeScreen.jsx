import React, { useState, useEffect } from 'react'
import './homeScreen.css'
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Search } from '../../assets/search.svg'
import { ReactComponent as Filter } from '../../assets/filter.svg'
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import { getAllTranscripts } from '../../services/transcriptService';
import { toast, ToastContainer } from 'react-toastify'
import moment from 'moment'

function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs + ' hrs ' + mins + ' mins ' + secs + ' secs ';
}

function HomeScreen() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [meetings, setMeetings] = useState([])
    const [allMeetings, setAllMeetings] = useState([])
    const [searchKeyWord, setSearchKeyWord] = useState('')

    useEffect(() => {
        if (searchKeyWord !== "")
            setMeetings(allMeetings.filter((m) => m.patientName?.toLowerCase()?.startsWith(searchKeyWord.toLowerCase()) || m.meetingId?.toLowerCase().startsWith(searchKeyWord.toLowerCase())))
        else
            setMeetings(allMeetings)
        // eslint-disable-next-line
    }, [searchKeyWord])

    useEffect(() => {
        const getTranscripts = async () => {
            try {
                const res = await getAllTranscripts({ page: 1, pageSize: 100 })
                if (res?.status === "success") {
                    setLoading(false)
                    setMeetings(res?.result?.transcriptions ? res?.result?.transcriptions : [])
                    setAllMeetings(res?.result?.transcriptions ? res?.result?.transcriptions : [])
                } else
                    throw new Error("Fetching Failed");
            } catch (e) {
                setLoading(false)
                toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
            }
        }

        if (loading)
            getTranscripts()
        // eslint-disable-next-line
    }, [loading])

    return (
        <div>
            <ToastContainer />
            <NavBar />
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr' }}>
                <SideBar />
                <div style={{ flexGrow: '1', display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F8F8F8' }}>

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
                            </svg> </div> : <>
                            <div style={{ padding: '20px 50px', display: 'flex' }}>
                                <span style={{
                                    fontSize: '24px',
                                    fontWeight: '500',
                                    textAlign: 'left',
                                }}>
                                    Transcriptions</span>

                                <div style={{ display: 'flex', width: '360px', height: '40px', background: 'white', marginLeft: '100px', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Search style={{ marginTop: 10, marginLeft: 10 }} />
                                    <input
                                        type="text"
                                        value={searchKeyWord}
                                        onChange={(e) => setSearchKeyWord(e.target.value)}
                                        placeholder="Search meetings, transcripts..."
                                    />
                                    <Filter style={{ marginLeft: 'auto' }} />
                                </div>


                            </div>

                            <div style={{ minHeight: '100vh', background: '#fff' }}>
                                <div style={{ width: '100%', height: '20px', display: 'flex', alignItems: 'center', padding: '30px 30px', boxShadow: ' 0px -1px 0px 0px #EEEEEE inset' }}>
                                    <span style={{ width: '50%', paddingLeft: 25 }}>Meeting</span>
                                    <span style={{ width: '12%' }}>Date</span>
                                    <span style={{ width: '12%' }}>Time</span>
                                    <span style={{ width: '12%' }}>Duration</span>
                                    <span style={{ width: '12%' }}>Action</span>
                                </div>

                                {meetings.length === 0 && <div style={{ width: '100%', height: '20px', display: 'flex', alignItems: 'center', padding: '40px 30px', cursor: 'pointer', justifyContent: 'center' }}>No Meetings Found</div>}

                                {meetings.map((meeting, index) => {
                                    return <div style={{ width: '100%', height: '20px', display: 'flex', alignItems: 'center', padding: '40px 30px', cursor: 'pointer' }} key={index} onClick={() => { navigate(`/transcript-details?${meeting.id}`) }}>
                                        <div style={{ width: '50%', paddingLeft: 25, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '100%',
                                                background: 'rgba(122, 90, 248, 1)',
                                                color: 'white',
                                                textAlign: 'center',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                {meeting?.patientName?.charAt(0)}
                                            </div>
                                            <span style={{
                                                margin: 'auto 20px', fontFamily: 'Poppins',
                                                fontSize: '18px',
                                                fontWeight: '500',
                                                textAlign: 'left'
                                            }}>
                                                Meeting {index + 1}
                                                <span style={{
                                                    display: 'block', color: '#6E75FF', background: '#F3F3FF', padding: 5,
                                                    fontFamily: 'Poppins',
                                                    fontSize: '11px',
                                                    fontWeight: '400',
                                                    textAlign: 'left'
                                                }}>
                                                    {meeting.meetingId}
                                                </span>
                                            </span>
                                        </div>
                                        <span style={{ width: '12%', color: '#6B6F76', fontWeight: 400, fontSize: 12 }}><ion-icon name="calendar-clear-outline"></ion-icon> {moment(meeting.createdAt).format('dddd MMMM Do')}</span>
                                        <span style={{ width: '12%', color: '#6B6F76', fontWeight: 400, fontSize: 12 }}> <ion-icon name="time-outline"></ion-icon> {moment(meeting.createdAt).format('h:mm a')} </span>
                                        <span style={{ width: '12%', fontWeight: 400, fontSize: 12 }}>
                                            <span style={{ color: '#6E75FF', background: '#F3F3FF', padding: 5 }}>{msToTime(meeting.duration)} </span></span>
                                        <span style={{ width: '12%', color: '#6e75ff', fontWeight: 400, fontSize: 15, marginLeft: '3%' }}>
                                            <ion-icon name="trash"></ion-icon>
                                        </span>
                                    </div>
                                })}

                            </div></>}
                </div>
            </div>
        </div>
    )
}

export default HomeScreen