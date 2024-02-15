import React, { useEffect, useState, useContext } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import { ToastContainer, toast } from 'react-toastify';
import Table from '../../components/Table/Table';
import { getAllTranscripts, saveTranscript } from '../../services/transcriptService';
import AuthContext from '../../store/AuthContext';
import moment from 'moment';
import useRecorder from '../../hooks/useRecorder'
import './RecordScreen.css'
import ConfirmModal from '../../components/Modal/ConfirmModal';

const RecordScreen = () => {
    const [transcriptData, setTranscriptData] = useState(null)
    const [name, setName] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [functionData, setFunctionData] = useState(null)
    const authCtx = useContext(AuthContext)
    const [uploads, setUploads] = useState([])
    const [loading, setLoading] = useState(true)
    const {
        startRecording,
        pauseRecording,
        resetRecording,
        resumeRecording,
        audioLevel,
        timeElapsed,
        recordingState,
        transcript,
        setTranscript,
        error,
        setError
    } = useRecorder();


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
                if (name === "") {
                    toast("No Name has been provided")
                    setTranscriptData(null)
                    return;
                }

                if (transcript === "") {
                    toast("No Transcript has been generated")
                    setTranscriptData(null)
                    return;
                }

                const res = await saveTranscript(transcriptData)
                if (res?.status === "success") {
                    resetRecording()
                    setTranscriptData(null)
                    toast('Transcript added successfully')
                } else
                    throw new Error("Uploaded files data fetch failed");
            } catch (e) {
                console.log(e)
                resetRecording()
                setTranscriptData(null)
                toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
            }
        }

        if (transcriptData !== null)
            addTranscript()

        // eslint-disable-next-line
    }, [transcriptData])

    useEffect(() => {
        if (error !== '') {
            toast(error)
            setError('')
        }
    }, [error])

    return (
        <>
            <ToastContainer />
            {isOpen && <ConfirmModal isOpen={isOpen} setIsOpen={setIsOpen} functionData={functionData} setLoading={setLoading} setFunctionData={setFunctionData} />}
            <NavBar />
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', height: '89vh' }}>
                <SideBar />
                <div style={{ display: 'flex', flexDirection: 'column', background: '#fff' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', background: '#fff', width: '100%', padding: '10px 40px' }}>
                        <div class="main-container scroll-nice">
                            <div class="header-container" style={{ marginBottom: '15px' }}>
                                <div>
                                    <div class="header-sub-container" >
                                        <h2 class="upload-header-hd">Transcribe your voice live</h2>
                                        <p class="upload-header-para">Click the "Record" button to begin recording</p>
                                    </div>
                                    <div class="audio-recording-container">
                                        <div class="controls">
                                            {recordingState === "idle" ? <button onClick={startRecording} class="btn start">
                                                <ion-icon name="mic" style={{ color: 'white', fontSize: 24 }}></ion-icon></button> : recordingState === "paused" ? (
                                                    <button onClick={resumeRecording} class="btn resume"><ion-icon name="mic" style={{ color: 'white', fontSize: 24 }}></ion-icon></button>
                                                ) : (
                                                <button onClick={pauseRecording} class="btn pause"><ion-icon name="mic-off" style={{ color: 'white', fontSize: 24 }}></ion-icon></button>
                                            )}
                                        </div>
                                        {recordingState !== "idle" && <div class="audio-info">
                                            <div class="audio-level-bar" style={{ height: 10, width: 150, borderRadius: 10 }}>
                                                <div class="audio-level-fill" style={{
                                                    width: `${audioLevel}%`,
                                                    backgroundColor: `rgb(110,117,${255 - audioLevel * .255})`,
                                                    height: 10,
                                                    borderRadius: 10
                                                }}></div>
                                            </div>
                                        </div>}
                                    </div>

                                </div>
                            </div>
                            <div class="sc-9cd5de1e-1 ysmhg">
                                <div class="sc-ffe87d3e-0 gBCnOO">
                                    <input style={{ width: '100%', marginBottom: 10, border: '1px dashed rgb(110, 117, 255)', borderRadius: '4px' }} placeholder={'Enter the name for recording'} value={name} onChange={(e) => setName(e.target.value)}></input>
                                    <div class="dropzone-main" aria-disabled="false" style={{ position: 'relative', height: '400px', maxWidth: '100%' }} >
                                        <textarea style={{ height: '100%', width: '100%', outline: 'none', border: 'none', resize: 'none', padding: '10px', fontSize: 14 }}
                                        placeholder='Your transcription will appear here ...' value={transcript} onChange={(e) => { setTranscript(e.target.value) }}></textarea>
                                    </div>
                                </div>
                                <br></br>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%', gap: '20px' }}>
                                    <div style={{ display: 'flex', width: '150px', height: '40px', background: 'gray', borderRadius: 5, border: '1px solid gray', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', padding: '0 5px', gap: '5px', fontSize: '15px' }} onClick={resetRecording}>
                                        Reset
                                    </div>

                                    <div style={{ display: 'flex', width: '150px', height: '40px', background: 'rgba(110, 117, 255, 1)', borderRadius: 5, border: '1px solid rgba(110, 117, 255, 1)', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', padding: '0 5px', gap: '5px', fontSize: '15px' }} onClick={() => {
                                        setTranscriptData({
                                            duration: timeElapsed * 1000,
                                            meetingId: `${authCtx.user.name} - ${moment(new Date()).format("Do MMMM YYYY hh:mm:ss a")}`,
                                            rawTranscription: JSON.stringify([{ text: transcript, highlight: false }]),
                                            patientName: 'Unknown',
                                            patientDOB: new Date(),
                                            meetingName: name,
                                            meetingPlatform: 'SCRIBE-AI',
                                            summarizedTranscription: '',
                                            isTranscriptionComplete: true
                                        })
                                    }}>
                                        {transcriptData === null ? <>Save <ion-icon name="save-outline" style={{ color: 'white', fontSize: 24 }}></ion-icon></> : <>Loading ...</>}
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <Table data={uploads} pending={loading} dontShow={true} setIsOpen={setIsOpen} functionData={functionData} setFunctionData={setFunctionData} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecordScreen