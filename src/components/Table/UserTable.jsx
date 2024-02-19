import React, { useContext } from 'react'
import DataTable from 'react-data-table-component';
import { ReactComponent as Search } from '../../assets/search.svg'
import Tooltip from '../ToolTip/ToolTip';
import './UserTable.css'
import AuthContext from '../../store/AuthContext';


const UserTable = ({ data, pending, setFunctionData, searchKeyWord, setSearchKeyWord, toggleOpen, setUserData, setIsConfirmOpen, toggleOpenEdit }) => {
    const authCtx = useContext(AuthContext)
    const columns = [
        {
            name: 'Organization',
            cell: (row) => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 5 }}>
                {row.organization?.imageData ? <img style={{ maxWidth: '80px', height: 'auto', maxHeight: '50px', borderRadius: '10px', flex: 1 }} src={row.organization?.imageData} alt="Org" /> : <p style={{ flex: 1 }}>{row?.organization?.organizationName ? row?.organization?.organizationName : "Scribe.Ai"}</p>}
            </div>,
            center: true
        },
        {
            name: 'Name',
            selector: row => row.Name,
        },
        {
            name: 'User Id',
            selector: row => row.email,
        },
        {
            name: 'Role',
            selector: row => row.role === "Provider" ? "Provider / Scribe" : row.role,
        },
        {
            name: 'Status',
            cell: row => {
                return row.isActive ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ color: '#388E3B', background: '#E8F5E9', fontWeight: 400, fontSize: 12, padding: 3, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '80px', height: '20px' }}><ion-icon name="checkmark-outline"></ion-icon>Active </span> <div class="check-box">
                    <input type="checkbox" checked={true} onChange={(e) => { e.preventDefault(); setIsConfirmOpen(true); setFunctionData({ type: "ACTIVATE", data: { email: row.email, status: !row.isActive } }) }} />
                </div> </div> : <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ color: '#E13333', background: '#FFF5F5', fontWeight: 400, fontSize: 12, padding: 3, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '80px', height: '20px' }}><ion-icon name="close-outline"></ion-icon> InActive</span>
                    <div class="check-box">
                        <input type="checkbox" checked={false} onChange={(e) => { e.preventDefault(); setIsConfirmOpen(true); setFunctionData({ type: "ACTIVATE", data: { email: row.email, status: !row.isActive } }) }} />
                    </div></div>
            },
            width: '200px',
            center: true,
            sortable: true,
            sortFunction: function sortByIsActive(user1, user2) {
                if (user1.isActive && !user2.isActive) {
                    return 1;
                } else if (!user1.isActive && user2.isActive) {
                    return -1;
                } else {
                    return 0;
                }
            }
        },
        {
            name: 'Action',
            cell: (row) => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 400, fontSize: 12 }} onClick={() => { toggleOpenEdit(); setUserData(row) }}>
                    <span style={{ color: '#6E75FF', background: '#F3F3FF', padding: 5, marginRight: 10, borderRadius: 5, fontSize: 14 }}>  <Tooltip content="Edit User" direction="left"><ion-icon name="create-sharp"></ion-icon></Tooltip>  </span>
                </span>

                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 400, fontSize: 12 }} onClick={() => { setIsConfirmOpen(true); setFunctionData({ type: "DELETE", data: { email: row.email } }) }}>
                    <span style={{ color: '#E13333', background: '#FFF5F5', padding: 5, borderRadius: 5 }}><Tooltip content="Delete User !!" direction="left">
                        <ion-icon name="trash"></ion-icon>
                    </Tooltip></span>
                </span>
            </div>
            ,
            center: true,
            ignoreRowClick: true,
        }
    ];

    return (
        <div style={{ position: 'relative', zIndex: '1' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>

                <div style={{ display: 'flex', width: '360px', height: '40px', background: '#F6F6F6', borderRadius: 5, justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(126, 137, 168, 1)' }}>
                    <Search style={{ marginLeft: 10 }} />
                    <input
                        type="text"
                        placeholder="Search Users"
                        value={searchKeyWord}
                        onChange={(e) => { setSearchKeyWord(e.target.value) }}
                        style={{ height: '38px', color: 'rgba(126, 137, 168, 1)', background: '#F6F6F6' }}
                    />
                </div>

                {authCtx.isAdmin && <div style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', height: '40px', background: 'rgba(110, 117, 255, 1)', borderRadius: 5, marginLeft: '20px', border: '1px solid rgba(110, 117, 255, 1)', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', position: 'relative', padding: '0 5px', gap: '5px', fontSize: '15px' }} onClick={toggleOpen}>
                        <ion-icon name="person-add-outline" style={{ fontSize: '25px' }}></ion-icon>
                        Add members
                    </div>
                </div>}

            </div>

            <DataTable
                title="Users"
                pagination
                columns={columns}
                data={data}
                pointerOnHover
                highlightOnHover
                sortIcon={<ion-icon name="caret-down-outline" style={{ fontSize: 12, position: 'absolute', top: '40%' }}></ion-icon>}
                progressPending={pending}
                onRowClicked={() => { }}
            />
        </div>
    )
}

export default UserTable