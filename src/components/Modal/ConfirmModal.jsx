import React, { useEffect, useState } from "react";
import { deleteUser, updatedUserStatus } from "../../services/userService";
import { ToastContainer, toast } from "react-toastify";
import { deleteTransriptByID } from "../../services/transcriptService";
import { deletePromptByID } from "../../services/promptService";

const ConfirmModal = ({ setIsOpen, functionData, setLoading, setFunctionData }) => {
    const [confirm, setConfirm] = useState(false)

    const deleteUserByEmail = async (request) => {
        try {
            const res = await deleteUser(request)
            setFunctionData(null)
            setConfirm(false)
            if (res?.status === "success") {
                setLoading(true)
                setIsOpen(false)
                toast(res.message)
            } else
                throw new Error("Failed To Update User Status");
        } catch (e) {
            setLoading(true)
            setIsOpen(false)
            toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
        }
    }

    const updateStatus = async (request) => {
        try {
            const res = await updatedUserStatus(request)
            setFunctionData(null)
            setConfirm(false)
            if (res?.status === "success") {
                setIsOpen(false)
                setLoading(true)
                toast("Updated User status sucessfully")
            } else
                throw new Error("Failed To Update User Status");
        } catch (e) {
            setIsOpen(false)
            setLoading(true)
            toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
        }
    }

    const deleteTranscript = async (request) => {
        try {
            const res = await deleteTransriptByID(request.id)
            setFunctionData(null)
            setConfirm(false)
            if (res?.status === "success") {
                setIsOpen(false)
                setLoading(true)
                toast(res.message)
            } else
                throw new Error("Fetching Failed");
        } catch (e) {
            setIsOpen(false)
            setLoading(true)
            toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
        }
    }

    const deletePrompt = async (request) => {
        try {
            const res = await deletePromptByID(request)
            setFunctionData(null)
            setConfirm(false)
            if (res?.status === "success") {
                setIsOpen(false)
                setLoading(true)
                toast(res.message)
            } else
                throw new Error("Fetching Failed");
        } catch (e) {
            setIsOpen(false)
            setLoading(true)
            toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
        }
    }

    useEffect(() => {
        if (confirm === false)
            return;

        if (functionData.type === "ACTIVATE")
            updateStatus(functionData.data)

        if (functionData.type === "DELETE")
            deleteUserByEmail(functionData.data)

        if (functionData.type === "DELETE-TRANSCRIPT")
            deleteTranscript(functionData.data)

        if (functionData.type === "DELETE-PROMPT")
            deletePrompt(functionData.data)

        // eslint-disable-next-line
    }, [confirm])

    return (
        <>
            <ToastContainer />
            <div className='darkBG' onClick={() => setIsOpen(false)} />
            <div className='centered'>
                {confirm ? <div className='modal'>
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
                    </div>
                </div> : <div className='modal'>

                    <div className="loginCardWrapper" style={{ padding: '10px', display: 'flex', flexDirection: 'row', }}>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                            <div style={{ height: '70px', width: '70px', borderRadius: '50%', border: '1px solid grey', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>  <ion-icon name="warning-outline" style={{ color: 'black', fontSize: 28 }}></ion-icon></div>
                        </div>
                        <div style={{ flex: 4,padding:'10px' }}>
                            <h3 style={{ color: 'black', }}>Warning !</h3>
                            <span style={{ marginTop: 0, color: 'grey', fontWeight: 500, fontSize: '0.8rem' }}>{functionData?.type === 'DELETE-TRANSCRIPT' || functionData?.type === 'DELETE-PROMPT' ? 'You will lose all of your data by deleting this. This action cannot be undone' : functionData?.type === 'DELETE' ? 'Be certain before you proceed. After deleting the account,it will first be deactivated for 30 days and after that the account will be permanently deleted and cannot be undone. You will lose all access to account data' : 'Are you sure you want to update status ?'}</span>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', gap: 10 }}>
                                <button className="deleteBtn" style={{ border: 'none', cursor: 'pointer' }} onClick={() => { setIsOpen(false); }} >Cancel</button>

                                <button className="confirmBtn" style={{ border: 'none', cursor: 'pointer' }} onClick={() => { setConfirm(true); }} >{functionData?.type === 'DELETE' || functionData?.type === 'DELETE-TRANSCRIPT' || functionData?.type === 'DELETE-PROMPT' ? 'Delete' : functionData?.data?.status === false ? 'Deactivate' : 'Activate'}</button>
                            </div>
                        </div>
                    </div>
                </div>}

            </div>
        </>
    );
};

export default ConfirmModal;