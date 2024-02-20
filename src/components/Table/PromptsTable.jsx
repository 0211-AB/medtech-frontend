import React from 'react'
import DataTable from 'react-data-table-component';


const PromptsTable = ({ data, pending, setIsOpen, setFunctionData, setOpenEdit, setEditData }) => {
    const columns = [
        {
            name: 'Name',
            selector: row => row.promptName,
            grow: 2
        },
        {
            name: 'Prompt', 
            cell: row => <div style={{padding:'5px 0'}}>{row.promptText}</div>,
            grow: 5,
            wrap: true
        },
        {
            name: 'Edit',
            cell: (row) => <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 400, fontSize: 12 }} onClick={() => { setOpenEdit(true); setEditData(row) }}>
                <span style={{ color: '#6E75FF', background: '#F3F3FF', padding: 5, borderRadius: 5, fontSize: 14 }}>  <ion-icon name="create-sharp"></ion-icon>  </span>
            </span>,
            grow: 1,
            center: true,
            ignoreRowClick: true,
        },
        {
            name: 'Delete',
            cell: (row) => <span style={{ color: '#E13333', fontWeight: 400, fontSize: 15 }} onClick={() => { setIsOpen(true); setFunctionData({ type: "DELETE-PROMPT", data: row.id }) }}>
                <ion-icon name="trash"></ion-icon>
            </span>
            ,
            grow: 1,
            center: true,
            ignoreRowClick: true,
        }
    ];

    return (
        <div style={{ position: 'relative' }}>
            <DataTable
                title="Saved Prompts"
                pagination
                columns={columns}
                data={data}
                pointerOnHover
                highlightOnHover
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
            />
        </div>
    )
}

export default PromptsTable