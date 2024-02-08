import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import { ToastContainer, toast } from 'react-toastify';
import './UploadScreen.css'
import document from '../../assets/document.svg'
import upload from '../../assets/upload-icon.svg'
import { getuploadMedia, uploadMedia } from '../../services/uploadService';
import UploadTable from '../../components/Table/UploadTable';
import { getConfig } from '../../services/configService';

const UploadScreen = () => {
    const [data, setData] = useState(null)
    const [uploads, setUploads] = useState([])
    const [loading, setLoading] = useState(true)
    const myWidget = useRef(null);

    useEffect(() => {
        const getConfigData = async () => {
            try {
                const res = await getConfig()
                if (res?.status === "success") {
                    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD; // replace with your own cloud name
                    const uploadPreset = "nsu3pmnm"; // replace with your own upload preset

                    myWidget.current = window.cloudinary.createUploadWidget(
                        {
                            cloudName: cloudName,
                            uploadPreset: uploadPreset,
                            sources: ["local", "url"], // restrict the upload sources to URL and local files
                            multiple: false,  //restrict upload to a single file
                            folder: "scribe_ai", //upload files to the specified folder
                            clientAllowedFormats: ["video", "audio"], //restrict uploading to image files only
                            maxFileSize: Number(res.config.maxUploadSize)
                        },
                        (error, result) => {
                            if (!error && result && result.event === "success") {
                                toast("File Uploaded Succesfully. Starting transcription!!!")
                                setData(result);
                                setUploads([{
                                    id: "loading_001",
                                    url: result.info.secure_url,
                                    metaData: JSON.stringify(result),
                                    userId: "user_001",
                                    transcript: "SCRIBE-AI-LOADING-TRANSCRIPT",
                                    createdAt: Date.now(),
                                    updatedAt: Date.now()
                                }, ...uploads])
                            } else if (error) {
                                console.log(error)
                                toast("Error while uploading file. Please try again !!!")
                            }
                        }
                    );
                } else
                    throw new Error("Fetching Failed");
            } catch (e) {
                const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD; // replace with your own cloud name
                const uploadPreset = "nsu3pmnm"; // replace with your own upload preset

                myWidget.current = window.cloudinary.createUploadWidget(
                    {
                        cloudName: cloudName,
                        uploadPreset: uploadPreset,
                        sources: ["local", "url"], // restrict the upload sources to URL and local files
                        multiple: false,  //restrict upload to a single file
                        folder: "scribe_ai", //upload files to the specified folder
                        clientAllowedFormats: ["video", "audio"], //restrict uploading to image files only
                        maxFileSize: 104857600
                    },
                    (error, result) => {
                        if (!error && result && result.event === "success") {
                            toast("File Uploaded Succesfully. Starting transcription!!!")
                            setData(result);
                            setUploads([{
                                id: "loading_001",
                                url: result.info.secure_url,
                                metaData: JSON.stringify(result),
                                userId: "user_001",
                                transcript: "SCRIBE-AI-LOADING-TRANSCRIPT",
                                createdAt: Date.now(),
                                updatedAt: Date.now()
                            }, ...uploads])
                        } else if (error) {
                            console.log(error)
                            toast("Error while uploading file. Please try again !!!")
                        }
                    }
                );
            }
        }

        getConfigData()
        // eslint-disable-next-line
    }, [])



    useEffect(() => {
        const uploadData = async () => {
            try {
                const res = await uploadMedia({ url: data.info.secure_url, data: data })
                console.log(res)
                if (res?.status === "success") {
                    setData(null)
                    setLoading(true)
                    toast("Generated Transcript Sucessfully!!")
                } else
                    throw new Error("Upload Failed");
            } catch (e) {
                toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
            }
        }

        if (data !== null)
            uploadData()

        // eslint-disable-next-line
    }, [data])

    useEffect(() => {
        const getuploadData = async () => {
            try {
                const res = await getuploadMedia()
                if (res?.status === "success") {
                    setUploads(res?.result?.transcriptions ? res?.result?.transcriptions : [])
                    setLoading(false)
                } else
                    throw new Error("Uploaded files data fetch failed");
            } catch (e) {
                setLoading(false)
                toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
            }
        }

        if (loading === true)
            getuploadData()

        // eslint-disable-next-line
    }, [loading])

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
                                        <div class="upload-icon-container"><img src={document} alt="" class="upload-icon" /></div>
                                        <h2 class="upload-header-hd">Upload an audio or video file to generate a transcript</h2>
                                        <p class="upload-header-para">Depending on the size of the audio file, it will be processed &amp; transcribed in 5 - 10 mins</p>
                                    </div>
                                </div>
                            </div>
                            <div class="sc-9cd5de1e-1 ysmhg">
                                <div class="sc-ffe87d3e-0 gBCnOO">
                                    <div class="dropzone-main" aria-disabled="false" id="upload_widget" style={{ position: 'relative' }} onClick={() => { myWidget.current.open() }}>
                                        <p class="smaller"><img width="20" height="20" src={upload} alt="upload" />Drag and drop <b class="highlighted">MP3, M4A, WAV</b> or <b class="highlighted">MP4</b> file here, or select files to upload.</p>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <UploadTable data={uploads} pending={loading} setLoading={setLoading} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UploadScreen