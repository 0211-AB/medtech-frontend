import React, { useState, useEffect, useContext } from 'react'
import { ReactComponent as Search } from '../../assets/search.svg'
import Script from '../../assets/script.svg'
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import { useLocation, useNavigate } from 'react-router-dom';
import Highlighter from "react-highlight-words";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { createDoc } from '../../utils/pdfDoc'
import { getUploadDetailByID,highlightUpload } from '../../services/uploadService';
import { getAllPrompts } from '../../services/promptService';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import Tooltip from '../../components/ToolTip/ToolTip';
import { summarizeUpload } from '../../services/summaryService';
import AuthContext from '../../store/AuthContext';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const UploadDetailScreen = () => {
    const { state } = useLocation()
    const metaData = JSON.parse(state?.metaData)?.info
    const navigate = useNavigate()
    const [searchWord, setSearchWord] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState(state.transcript.split("\n\n"))
    const [prompts, setPrompts] = useState([])
    const [transcriptDetail, setTranscriptDetail] = useState({})
    const [toBeHighlighted, setToBeHighlighted] = useState(null)
    const [selectedPrompt, setSelectedPrompt] = useState('')
    const [fetchSummary, setFetchSummary] = useState(false)
    const [includeSummary, setIncludeSummary] = useState(false)
    const location = useLocation()
    const authCtx = useContext(AuthContext)
    
    useEffect(() => {
        const getTranscripts = async () => {
            try {
                const res = await getUploadDetailByID(location.search.substring(1))
                if (res?.status === "success") {
                    setLoading(false)
                    setTranscriptDetail(res?.result)
                    setMessages(res?.result?.transcript ? JSON.parse(res?.result?.transcript) : [])
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
        const getPrompts = async () => {
            try {
                const res = await getAllPrompts()
                if (res?.status === "success") {
                    setPrompts(res?.result ? res?.result : [])
                } else
                    throw new Error("Fetching Prompts Failed");
            } catch (e) {
                toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
            }
        }
        getPrompts()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const updateTranscripts = async () => {
            try {
                const res = await highlightUpload({ id: location.search.substring(1), index: toBeHighlighted })
                if (res?.status === "success") {
                    setToBeHighlighted(null)
                } else
                    throw new Error("Fetching Failed");
            } catch (e) {
                setLoading(true)
                setToBeHighlighted(null)
                toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
            }
        }

        if (toBeHighlighted !== null)
            updateTranscripts()
        // eslint-disable-next-line
    }, [toBeHighlighted])

    useEffect(() => {
        const updateTranscripts = async () => {
            try {
                if (selectedPrompt === '') {
                    toast('Please select a propmt !!!')
                    setFetchSummary(false)
                    return;
                }

                const res = await summarizeUpload({ id: location.search.substring(1), prompt: selectedPrompt.promptText })
                if (res?.status === "success") {
                    setLoading(true)
                    setFetchSummary(false)
                } else
                    throw new Error("Summarizing Failed");
            } catch (e) {
                setFetchSummary(false)
                toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
            }
        }

        if (fetchSummary === true)
            updateTranscripts()

        // eslint-disable-next-line
    }, [fetchSummary])


    return (
        <>
            <ToastContainer />
            <NavBar />
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', height: '89vh' }}>
                <SideBar />
                <div style={{ display: 'flex', flexDirection: 'column', background: '#fff' }}>

                    <div style={{ padding: '20px 50px', display: 'flex', alignItems: 'center', width: '100%' }}>
                        <div style={{ display: 'flex', height: '30px', width: '30px', background: '#f8f8f8', borderRadius: '50%', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={() => { navigate('/') }}>
                            <ion-icon name="arrow-back-outline" style={{ height: '20px', width: '20px', }}></ion-icon>
                        </div>

                        <div style={{ display: 'flex', height: '30px', justifyContent: 'center', flexDirection: 'column', marginLeft: '30px', width: '100%' }}>
                            <div style={{
                                fontSize: '15px',
                                fontWeight: '600',
                                textAlign: 'left',
                            }}>
                                {metaData.original_filename}.{metaData.format}
                            </div>
                            <div style={{
                                fontSize: '12px',
                                fontWeight: '300',
                                textAlign: 'left',
                                display: 'flex',
                                gap: '10px'
                            }}>

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2px' }}>
                                    <ion-icon name="calendar-clear-outline"></ion-icon>  {moment(metaData.created_at).format('dddd MMMM Do')}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2px' }}>
                                    <ion-icon name="time-outline"></ion-icon>  {moment(metaData.created_at).format('h:mm a')}
                                </div>

                            </div>

                        </div>


                        <div style={{ display: 'flex', width: '450px', height: '40px', background: 'white', borderRadius: 5, border: '1px solid #bdbdbd', justifyContent: 'center', alignItems: 'center' }}>
                            <input
                                type="text"
                                value={searchWord}
                                onChange={(e) => setSearchWord(e.target.value)}
                                placeholder="Search Across The Transcript"
                                style={{ height: '38px', color: 'rgba(126, 137, 168, 1)' }}
                            />
                            <Search style={{ marginRight: 10 }} />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <div style={{ display: 'flex', width: '80px', height: '40px', background: 'white', borderRadius: 5, marginLeft: '20px', border: '1px solid rgba(110, 117, 255, 1)', justifyContent: 'center', alignItems: 'center', color: 'rgba(110, 117, 255, 1)', cursor: 'pointer', position: 'relative' }} onClick={() => { setIsOpen(open => !open) }}>
                                Export
                            </div>
                            {isOpen && (
                                <div className="exportDD">
                                    Export Transcript
                                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', fontSize: 10, margin: '5px 0', width: '100%', gap: 8 }}><input type='checkbox' style={{ padding: 0, flex: 'none', borderRadius: 10, height: '10px', width: '20px', margin: '5px' }} className='summaryCheckbox' checked={includeSummary} onChange={() => { setIncludeSummary(!includeSummary && transcriptDetail.summarizedTranscript !== '') }}></input> Include Summary</div>
                                    <p style={{ fontSize: '12px', color: '#333' }}>Select Format</p>
                                    <select>
                                        <option>PDF</option>
                                    </select>
                                    <button style={{ color: 'white', width: '100%', marginTop: '10px', padding: '5px 0', borderRadius: '5px', border: 'none', background: 'linear-gradient(90deg, #6E75FF 0%, #C66EFF 100%)' }} onClick={() => {
                                        var doc = createDoc({ file: `${metaData.original_filename}.${metaData.format}`, time: moment(transcriptDetail.createdAt).format('LLLL'), messages, includeSummary, summarizedTranscript: transcriptDetail.summarizedTranscript, url: authCtx?.user?.organization?.imageData })
                                        pdfMake.createPdf(doc).open();
                                    }}>Export</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ background: '#fff', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', padding: '15px', boxShadow: ' 0px -1px 0px 0px #EEEEEE inset', paddingLeft: '30px', color: '#707070', fontSize: '15px', fontWeight: '500', background: '#f8f8f8' }}>
                            <div style={{ display: 'flex', flex: 1, fontSize: '15px', fontWeight: '500', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', fontSize: '15px', fontWeight: '500', alignItems: 'center' }}><img src={Script} alt="Script"></img>
                                    Transcript
                                    <Tooltip content="Copy Transcript" direction="top">
                                        <button style={{ marginLeft: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', cursor: 'pointer' }} onClick={async () => {
                                            document.body.style.cursor = 'wait';

                                            async function copyToClipboard(text) {
                                                try {
                                                    await navigator.clipboard.writeText(text);
                                                    toast('Copied to clipboard successfully!!')
                                                } catch (err) {
                                                    console.error('Failed to copy text:', err);
                                                    toast('Failed to copy text:' + err)
                                                }
                                            }

                                            await copyToClipboard(messages.map(arr => arr.text).join(' '));
                                            document.body.style.cursor = 'default'
                                        }}> <ion-icon name="copy-outline" style={{ fontSize: 16, color: 'gray' }}></ion-icon></button>
                                    </Tooltip>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flex: 1, fontSize: '15px', fontWeight: '500', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', fontSize: '15px', fontWeight: '500', alignItems: 'center' }}>
                                    Summary
                                    <Tooltip content="Copy Summary" direction="top">
                                        <button style={{ marginLeft: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', cursor: 'pointer' }} onClick={async () => {
                                            document.body.style.cursor = 'wait';

                                            async function copyToClipboard(text) {
                                                try {
                                                    await navigator.clipboard.writeText(text);
                                                    toast('Copied to clipboard successfully!!')
                                                } catch (err) {
                                                    console.error('Failed to copy text:', err);
                                                    toast('Failed to copy text:' + err)
                                                }
                                            }

                                            await copyToClipboard(transcriptDetail.summarizedTranscript);
                                            document.body.style.cursor = 'default'
                                        }}> <ion-icon name="copy-outline" style={{ fontSize: 16, color: 'gray' }}></ion-icon></button>
                                    </Tooltip>
                                </div>
                            </div>

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
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '90%' }} className='details-section'>
                                <div style={{ minHeight: '510px',maxHeight:'100vh', overflowY: 'auto', padding: '30px', flex: 1, order: '-1' }}>
                                    {messages.map((m, index) => {
                                        return (
                                            <div className='message-container' style={{ background: m.highlight === true ? 'lightyellow' : 'white', borderRadius: '10px', position: 'relative' }}>
                                            
                                                {m.highlight === true ? <div className='highlightButton highlight-active'>
                                                    <Tooltip content="Double click to remove highlight !!" direction="left">
                                                        <ion-icon name="bookmarks" onDoubleClick={() => { setMessages(prevMessages => prevMessages.map((m, idx) => { if (idx === index) m.highlight = false; return m })); setToBeHighlighted(index) }}></ion-icon>
                                                    </Tooltip>
                                                </div> : <div className='highlightButton'>
                                                    <Tooltip content="Double click to highlight !!" direction="left">
                                                        <ion-icon name="bookmarks-outline" onDoubleClick={() => { setMessages(prevMessages => prevMessages.map((m, idx) => { if (idx === index) m.highlight = true; return m })); setToBeHighlighted(index) }}></ion-icon>
                                                    </Tooltip>
                                                </div>}
                                                <Highlighter
                                                    highlightClassName="YourHighlightClass"
                                                    searchWords={[searchWord]}
                                                    autoEscape={true}
                                                    textToHighlight={m.text ? m.text : m}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                                <div style={{ minHeight: '510px', overflowY: 'auto', padding: '30px', flex: 1 }}>
                                    {fetchSummary === true ? <div id='svg-container'>
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
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5, marginBottom: 15 }}>
                                            <select style={{ width: 300, height: 30, outline: 'none', borderRadius: '5px', padding: '0 5px' }} onChange={(e) => { setSelectedPrompt(prompts[Number(e.target.value)]) }}>
                                                <option disabled value='' selected>
                                                    Select A Prompt
                                                </option>
                                                {prompts.map((prompt, index) => {
                                                    return <option value={index} title={prompt.promptText}>
                                                        {prompt.promptName}
                                                    </option>
                                                })}
                                            </select>
                                            <div style={{ display: 'flex', width: '100px', borderRadius: 5, justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontSize: 14, height: 30, background: 'white', border: '1px solid rgba(110, 117, 255, 1)', color: 'rgba(110, 117, 255, 1)', }} onClick={() => { setFetchSummary(true) }}>
                                                Generate
                                            </div>
                                        </div>

                                        <textarea style={{ width: '100%', height: transcriptDetail.summarizedTranscript === "" ? '0px' : '90vh', background: 'none', outline: 'none', border: 'none' }} disabled value={transcriptDetail.summarizedTranscript}></textarea>
                                    </>}
                                </div>
                            </div>}
                    </div>
                </div>
            </div >
        </>
    )
}

export default UploadDetailScreen