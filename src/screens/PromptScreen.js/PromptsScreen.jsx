import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import { ToastContainer, toast } from 'react-toastify';
import './promptsScreen.css'
import prompt from '../../assets/prompt.jpeg'
import { createPrompt, getAllPrompts } from '../../services/promptService';
import PromptsTable from '../../components/Table/PromptsTable';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import EditPromptModal from '../../components/Modal/EditPromptModal'

const PromptScreen = () => {
    const [open, setIsOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [data, setData] = useState(null)
    const [name, setName] = useState('')
    const [functionData, setFunctionData] = useState(null)
    const [promptText, setPromptText] = useState('')
    const [prompts, setPrompts] = useState([])
    const [loading, setLoading] = useState(true)
    const [editData, setEditData] = useState(null)

    useEffect(() => {
        const addPrompt = async () => {
            try {
                if (name === "") {
                    toast("Prompt Name is required")
                    setData(null)
                    return;
                }

                if (promptText === "") {
                    toast("Prompt is required")
                    setData(null)
                    return;
                }


                const res = await createPrompt(data)
                if (res?.status === "success") {
                    setData(null)
                    setLoading(true)
                    toast('Prompt added successfully')
                } else
                    throw new Error("Uploaded files data fetch failed");
            } catch (e) {
                setData(null)
                toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
            }
        }

        if (data !== null)
            addPrompt()

        // eslint-disable-next-line
    }, [data])

    useEffect(() => {
        const getPromptData = async () => {
            try {
                const res = await getAllPrompts()
                if (res?.status === "success") {
                    setPrompts(res?.result ? res?.result : [])
                    setLoading(false)
                } else
                    throw new Error("Prompts data fetch failed");
            } catch (e) {
                setLoading(false)
                toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
            }
        }

        if (loading === true)
            getPromptData()

        // eslint-disable-next-line
    }, [loading])

    return (
        <>
            {open && <ConfirmModal isOpen={open} setIsOpen={setIsOpen} functionData={functionData} setLoading={setLoading} setFunctionData={setFunctionData} />}
            {openEdit && <EditPromptModal isOpen={openEdit} setIsOpen={setOpenEdit} data={editData} setLoading={setLoading} />}
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
                                        <div class="upload-icon-container"><img src={prompt} alt="Open-AI" style={{ height: 80 }} /></div>
                                        <h2 class="upload-header-hd">Enter and save prompts for future reference or use.</h2>
                                        <p class="upload-header-para">Please enter your prompt text in the box below and click "Save Prompt" to save it.</p>
                                    </div>
                                </div>
                            </div>
                            {loading === true ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
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
                                <div class="category-first-row">
                                    <div class="MuiFormControl-root MuiTextField-root sc-6748d2ae-0 floIoB">
                                        <div class="MuiInputBase-root MuiFilledInput-root MuiFilledInput-underline MuiInputBase-formControl MuiInputBase-multiline MuiFilledInput-multiline">
                                            <textarea rows="1" aria-invalid="false" id="outlined-bare" placeholder="Prompt Name" class="MuiInputBase-input MuiFilledInput-input MuiInputBase-inputMultiline MuiFilledInput-inputMultiline" style={{ height: '19px', overflow: 'hidden' }} onChange={(e) => { setName(e.target.value) }}></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div class="category-first-row">
                                    <div class="MuiFormControl-root MuiTextField-root sc-6748d2ae-0 floIoB">
                                        <div class="MuiInputBase-root MuiFilledInput-root MuiFilledInput-underline MuiInputBase-formControl MuiInputBase-multiline MuiFilledInput-multiline" style={{ height: '100px' }}>
                                            <textarea rows="3" aria-invalid="false" id="outlined-bare" placeholder="Enter your prompt here" class="MuiInputBase-input MuiFilledInput-input MuiInputBase-inputMultiline MuiFilledInput-inputMultiline" style={{ height: '75px', overflow: 'hidden' }} onChange={(e) => { setPromptText(e.target.value) }}></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}> <div style={{ display: 'flex', height: '40px', width: '200px', background: 'rgba(110, 117, 255, 1)', borderRadius: 5, border: '1px solid rgba(110, 117, 255, 1)', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', padding: '0 5px', gap: '5px', fontSize: '15px' }} onClick={() => { setData({ name, prompt: promptText }) }}>
                                    {data === null ? 'Save Prompt' : <div class="scribe-transcript-loader"></div>}
                                </div></div>
                                <PromptsTable data={prompts} pending={loading} open={open} setIsOpen={setIsOpen} functionData={functionData} setFunctionData={setFunctionData} setEditData={setEditData} setOpenEdit={setOpenEdit} />
                            </>}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default PromptScreen