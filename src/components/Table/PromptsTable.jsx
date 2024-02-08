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
            />
        </div>
    )
}

export default PromptsTable