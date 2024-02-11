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
                onRowClicked={(row, event) => { navigate(`/upload-details?${row.id}`, { state: row }) }}
            />
        </div>
    )
}

export default UploadTable