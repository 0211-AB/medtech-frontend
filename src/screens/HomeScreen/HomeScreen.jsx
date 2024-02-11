import React, { useState, useEffect } from 'react'
import './homeScreen.css'
import moment from 'moment'
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import { deleteTransriptByID, getAllTranscripts } from '../../services/transcriptService';
import { toast, ToastContainer } from 'react-toastify'
import Table from '../../components/Table/Table';
import ConfirmModal from '../../components/Modal/ConfirmModal';

function HomeScreen() {
    const [loading, setLoading] = useState(true)
    const [meetings, setMeetings] = useState([])
    const [allMeetings, setAllMeetings] = useState([])
    const [searchKeyWord, setSearchKeyWord] = useState('')
    const [transcriptId, setTrancriptId] = useState('')
    const [state, setState] = useState([{ startDate: null, endDate: null, key: 'selection' }]);
    const [isOpen, setIsOpen] = useState(false)
    const [functionData, setFunctionData] = useState(null)

    useEffect(() => {
        if (searchKeyWord !== "")
            setMeetings(allMeetings.filter((m) => m.meetingName?.toLowerCase()?.includes(searchKeyWord.toLowerCase()) || m.meetingId?.toLowerCase()?.includes(searchKeyWord.toLowerCase())))
        else
            setMeetings(allMeetings)
        // eslint-disable-next-line
    }, [searchKeyWord])

    useEffect(() => {
        if (state[0].startDate === null && state[0].endDate === null)
            setMeetings(allMeetings)
        else
            setMeetings(allMeetings.filter((m) => m.createdAt >= moment(state[0].startDate).format() && m.createdAt <= moment(state[0].endDate).format()))
        // eslint-disable-next-line
    }, [state])

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

    useEffect(() => {
        const deleteTranscript = async () => {
            try {
                const res = await deleteTransriptByID(transcriptId)
                if (res?.status === "success") {
                    setMeetings(meetings => meetings.filter((m) => m.id !== transcriptId))
                    setAllMeetings(meetings => meetings.filter((m) => m.id !== transcriptId))
                    setTrancriptId('')
                    toast(res.message)
                } else
                    throw new Error("Fetching Failed");
            } catch (e) {
                toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
            }
        }

        if (transcriptId !== '')
            deleteTranscript()
        // eslint-disable-next-line
    }, [transcriptId])

    return (
        <>
            <ToastContainer />
            {isOpen && <ConfirmModal isOpen={isOpen} setIsOpen={setIsOpen} functionData={functionData} setLoading={setLoading} />}
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
                            <div style={{ padding: '20px 50px', borderRadius: '10px' }}>
                                <Table data={meetings} pending={loading} setTrancriptId={setTrancriptId} searchKeyWord={searchKeyWord} setSearchKeyWord={setSearchKeyWord} state={state} setState={setState} setIsOpen={setIsOpen} setFunctionData={setFunctionData} />
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default HomeScreen