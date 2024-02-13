import React, { useEffect, useState, useRef, useContext } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import { ToastContainer, toast } from 'react-toastify';
import Table from '../../components/Table/Table';
import { getAllTranscripts, saveTranscript } from '../../services/transcriptService';
import AuthContext from '../../store/AuthContext';
import moment from 'moment';

const RecordScreen = () => {
    const [data, setData] = useState("")
    const [transcriptData, setTranscriptData] = useState(null)
    const recorder = useRef(null)
    const authCtx = useContext(AuthContext)
    const [uploads, setUploads] = useState([])
    const [loading, setLoading] = useState(true)
    const [recording, setRecording] = useState(false)

    useEffect(() => {
        const getTranscripts = async () => {
            try {
                const res = await getAllTranscripts('record=true')
                if (res?.status === "success") {
                    setLoading(false)
                    setUploads(res?.result?.transcriptions ? res?.result?.transcriptions : [])
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
        const addTranscript = async () => {
            try {
                if (data === "") {
                    toast("No Transcript has been generated")
                    setTranscriptData(null)
                    return;
                }

                const res = await saveTranscript(transcriptData)
                if (res?.status === "success") {
                    setData('')
                    setTranscriptData(null)
                    setLoading(true)
                    setRecording(false)
                    recorder.current.getTracks().forEach(function (track) {
                        track.stop();
                    });
                    recorder.current = null;
                    toast('Transcript added successfully')
                } else
                    throw new Error("Uploaded files data fetch failed");
            } catch (e) {
                console.log(e)
                setData('')
                setTranscriptData(null)
                toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
            }
        }

        if (transcriptData !== null)
            addTranscript()

        // eslint-disable-next-line
    }, [transcriptData])

    const getMic = async () => {
        if (recorder.current === null) {
            try {
                const media = await navigator.mediaDevices.getUserMedia({ audio: true });
                recorder.current = media
            }
            catch (e) {
                toast("Permission for microphone has been denied. Please allow the site microphone permission in order to continue transcribing")
            }
        }
    }

    async function startRecording() {
        await getMic()
        if (recorder.current === null) return;
        // Start recording.
        try {
            const micRecorder = new MediaRecorder(recorder.current, { mimeType: 'audio/webm' });

            const socket = new WebSocket('wss://api.deepgram.com/v1/listen?model=nova-2-medical&smart_format=true', ['token', process.env.REACT_APP_DEEPGRAM_KEY])

            // Start recording.
            micRecorder.addEventListener('dataavailable', evt => {
                if (evt.data.size > 0 && socket.readyState === 1)
                    socket.send(evt.data)
            })

            socket.onopen = () => {
                micRecorder.start(250);
                setRecording(true)
            }

            socket.onmessage = msg => {
                try {
                    const { transcript } = JSON.parse(msg.data)?.channel?.alternatives[0]
                    if (transcript) {
                        setData(data => data + " " + transcript)
                    }
                } catch (e) { }
            }
        } catch (e) { toast(e) }
    }

    return (
        <>
            <ToastContainer />
            <NavBar />
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', height: '89vh' }}>
                <SideBar />
                <div style={{ display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', background: '#fff', width: '100%', padding: '10px 40px' }}>
                        <div class="main-container scroll-nice">
                            <div class="header-container">
                                <div>
                                    <div class="header-sub-container" >
                                        <h2 class="upload-header-hd">Transcribe your voice live</h2>
                                        <p class="upload-header-para">Click the "Record" button below to see your voice in realtime. Click on "Save" to save the transcript to cloud</p>
                                    </div>
                                </div>
                            </div>
                            <div class="sc-9cd5de1e-1 ysmhg">
                                <div class="sc-ffe87d3e-0 gBCnOO">
                                    <div class="dropzone-main" aria-disabled="false" style={{ position: 'relative', height: '400px' }} >
                                        <textarea style={{ height: '100%', width: '100%', outline: 'none', border: 'none', resize: 'none', padding: '10px', fontSize: 14 }} value={data === "" ? 'Your transcription will appear here ...' : data} disabled={true}></textarea>
                                    </div>
                                </div>
                                <br></br>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%', gap: '20px' }}>
                                    {recording === false ? <div style={{ display: 'flex', width: '150px', height: '40px', background: 'rgba(110, 117, 255, 1)', borderRadius: 5, border: '1px solid rgba(110, 117, 255, 1)', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', padding: '0 5px', gap: '5px', fontSize: '15px' }} onClick={startRecording}>
                                        Record <ion-icon name="mic-circle-outline" style={{ color: 'white', fontSize: 24 }}></ion-icon>
                                    </div> : <div style={{ display: 'flex', width: '150px', height: '40px', background: 'rgba(110, 117, 255, 1)', borderRadius: 5, border: '1px solid rgba(110, 117, 255, 1)', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', padding: '0 5px', gap: '5px', fontSize: '15px' }} onClick={() => {
                                        setTranscriptData({
                                            duration: 0,
                                            meetingId: `${authCtx.user.name} - ${moment(new Date()).format("Do MMMM YYYY hh:mm:ss a")}`,
                                            rawTranscription: JSON.stringify([{ text: data, highlight: false }]),
                                            patientName: 'Unknown',
                                            patientDOB: new Date(),
                                            meetingName: `${authCtx.user.name} - ${moment(new Date()).format("Do MMMM YYYY hh:mm:ss a")}`,
                                            meetingPlatform: 'SCRIBE-AI',
                                            summarizedTranscription: '',
                                            isTranscriptionComplete: true
                                        })
                                    }}>
                                        {transcriptData === null ? <>Save <ion-icon name="save-outline" style={{ color: 'white', fontSize: 24 }}></ion-icon></> : <>Loading ...</>}
                                    </div>}
                                </div>
                            </div>
                            <br></br>
                            <Table data={uploads} pending={loading} dontShow={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecordScreen