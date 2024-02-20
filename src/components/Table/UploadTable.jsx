import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import moment from 'moment'
import { deleteuploadMedia } from '../../services/uploadService';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UploadTable = ({ data, pending, setLoading }) => {
    const [uploadId, setUploadId] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const deleteMedia = async () => {
            try {
                const res = await deleteuploadMedia(uploadId)
                if (res?.status === "success") {
                    setLoading(true)
                    setUploadId(null)
                    toast(res.message)
                } else
                    throw new Error("Failed To Delete Transcript");
            } catch (e) {
                setLoading(true)
                setUploadId(null)
                toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
            }
        }

        if (uploadId !== null)
            deleteMedia()
        // eslint-disable-next-line
    }, [uploadId])

    const columns = [
        {
            name: 'Upload Date',
            selector: row => moment(row.createdAt).format('dddd MMMM Do'),
            sortable: true,
            sortFunction: (rowA, rowB) => { return rowA.createdAt < rowB.createdAt }
        },
        {
            name: 'Name',
            cell: row => { return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{JSON.parse(row?.metaData)?.info?.original_filename + "." + JSON.parse(row?.metaData)?.info?.format} <a href={row.url} target="_blank" style={{ color: 'gray', fontSize: 20 }} rel="noreferrer" ><ion-icon name="attach-outline"></ion-icon></a></div> },
            center: true
        },
        {
            name: 'Duration',
            cell: row => {
                const minutes = Math.floor(JSON.parse(row?.metaData)?.info?.duration / 60);
                const seconds = Math.floor(JSON.parse(row?.metaData)?.info?.duration - minutes * 60);
                return minutes + " min  " + seconds + " sec"
            },
            center: true
        },
        {
            name: 'Action',
            cell: (row) => <span style={{ color: '#6e75ff', fontWeight: 400, fontSize: 15, marginLeft: '3%' }} onClick={() => { setUploadId(row.id) }}>
                <ion-icon name="trash"></ion-icon>
            </span>
            ,
            width: '100px',
            center: true,
            ignoreRowClick: true,
        }
    ];

    return (
        <div style={{ position: 'relative' }}>
            <ToastContainer />
            <DataTable
                title="Uploaded Files"
                pagination
                columns={columns}
                data={data}
                pointerOnHover
                highlightOnHover
                sortIcon={true}
                progressPending={pending}
                progressComponent={<div id='svg-container'>
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
                    </svg> </div>}
                onRowClicked={(row, event) => { navigate(`/upload-details?${row.id}`, { state: row }) }}
            />
        </div>
    )
}

export default UploadTable