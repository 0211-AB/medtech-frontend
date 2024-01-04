import React, { useState, useEffect } from 'react'
import './transcriptDetail.css'
import { ReactComponent as Search } from '../../assets/search.svg'
import Script from '../../assets/script.svg'
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import { useLocation, useNavigate } from 'react-router-dom';
import Highlighter from "react-highlight-words";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { createDoc } from '../../utils/pdfDoc'
import { getTransriptDetailByID } from '../../services/transcriptService';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const TranscriptDetailScreen = () => {
    const navigate = useNavigate()
    const [searchWord, setSearchWord] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])
    const [transcriptDetail, setTranscriptDetail] = useState({})
    const location = useLocation()

    useEffect(() => {
        const getTranscripts = async () => {
            try {
                const res = await getTransriptDetailByID(location.search.substring(1))
                if (res?.status === "success") {
                    setLoading(false)
                    setTranscriptDetail(res?.result)
                    setMessages(res?.result?.rawTranscription ? JSON.parse(res?.result?.rawTranscription) : [])
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

    console.log(messages)
    return (
        <div>
            <ToastContainer />
            <NavBar />
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', height: '89vh' }}>
                <SideBar />
                <div style={{ display: 'flex', flexDirection: 'column', background: '#fff' }}>

                    <div style={{ padding: '20px 50px', display: 'flex', alignItems: 'center', width: '100%' }}>
                        <div style={{ display: 'flex', height: '30px', width: '30px', background: '#f8f8f8', borderRadius: '50%', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={() => { navigate('/') }}>
                            <ion-icon name="arrow-back-outline" style={{ height: '20px', width: '20px', }}></ion-icon>
                        </div>

                        <div style={{ display: 'flex', height: '30px', justifyContent: 'center', flexDirection: 'column', marginLeft: '30px' }}>
                            <div style={{
                                fontSize: '15px',
                                fontWeight: '600',
                                textAlign: 'left',
                            }}>
                                Meeting  {transcriptDetail.meetingId}
                            </div>
                            <div style={{
                                fontSize: '12px',
                                fontWeight: '300',
                                textAlign: 'left',
                                display: 'flex',
                                gap: '10px'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1px' }}>
                                    <ion-icon name="mail-outline"></ion-icon> {transcriptDetail?.patientName}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1px' }}>
                                    <ion-icon name="calendar-clear-outline"></ion-icon> {moment(transcriptDetail.createdAt).format('dddd MMMM Do')}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1px' }}>
                                    <ion-icon name="time-outline"></ion-icon> {moment(transcriptDetail.createdAt).format('h:mm a')}
                                </div>

                            </div>

                        </div>


                        <div style={{ display: 'flex', width: '360px', height: '40px', background: 'white', marginLeft: '35%', borderRadius: 5, border: '1px solid #bdbdbd', justifyContent: 'center', alignItems: 'center' }}>
                            <input
                                type="text"
                                value={searchWord}
                                onChange={(e) => setSearchWord(e.target.value)}
                                placeholder="Search Across The Transcript"
                                style={{ height: '38px', color: 'rgba(126, 137, 168, 1)' }}
                            />
                            <Search style={{ marginTop: 10, marginLeft: 10 }} />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <div style={{ display: 'flex', width: '80px', height: '40px', background: 'white', borderRadius: 5, marginLeft: '20px', border: '1px solid rgba(110, 117, 255, 1)', justifyContent: 'center', alignItems: 'center', color: 'rgba(110, 117, 255, 1)', cursor: 'pointer', position: 'relative' }} onClick={() => { setIsOpen(open => !open) }}>
                                Export
                            </div>
                            {isOpen && (
                                <div className="exportDD">
                                    Export Summary

                                    <p style={{ fontSize: '12px', color: '#333', marginTop: '10px' }}>Select Format</p>
                                    <select>
                                        <option>PDF</option>
                                    </select>
                                    <button style={{ color: 'white', width: '100%', marginTop: '10px', padding: '5px 0', borderRadius: '5px', border: 'none', background: 'linear-gradient(90deg, #6E75FF 0%, #C66EFF 100%)' }} onClick={() => {
                                        var doc = createDoc({ providername: transcriptDetail.providerName, name: transcriptDetail.patientName, email: transcriptDetail.patientEmail, time: moment(transcriptDetail.createdAt).format('LLLL'), messages })
                                        pdfMake.createPdf(doc).open();
                                    }}>Export</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ background: '#fff', }}>
                        <div style={{ display: 'flex', alignItems: 'center', padding: '15px', boxShadow: ' 0px -1px 0px 0px #EEEEEE inset', paddingLeft: '30px', color: '#707070', fontSize: '15px', fontWeight: '500', background: '#f8f8f8' }}>
                            <img src={Script} alt="Script"></img>
                            Transcript
                        </div>
                        {loading ? <div id='svg-container'>
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
                            </svg> </div> :
                            <div style={{ maxHeight: '510px', overflowY: 'scroll', padding: '30px' }}>
                                {messages.map((m) => {
                                    return (
                                        <>
                                            <Highlighter
                                                highlightClassName="YourHighlightClass"
                                                searchWords={[searchWord]}
                                                autoEscape={true}
                                                textToHighlight={m.text ? m.text : m}
                                            />
                                            <br></br>
                                            <br></br>
                                        </>
                                    );
                                })}
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TranscriptDetailScreen