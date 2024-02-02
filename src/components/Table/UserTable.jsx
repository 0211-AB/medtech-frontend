import React from 'react'
import DataTable from 'react-data-table-component';
import { ReactComponent as Search } from '../../assets/search.svg'
import Tooltip from '../ToolTip/ToolTip';
import './UserTable.css'

const getRandomNumber = (limit) => {
    return Math.floor(Math.random() * limit);
};

const setBackgroundColor = () => {
    const h = getRandomNumber(360);
    const randomColor = `hsl(${h}deg, 50%, 30%)`;

    return randomColor;
};


const UserTable = ({ data, pending, updateAdminStatus, updateStatus, searchKeyWord, setSearchKeyWord, toggleOpen, setUserData,deleteUser }) => {
    const columns = [
        {
            name: "",
            cell: (row) => <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '100%',
                background: setBackgroundColor(),
                color: 'white',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {row.Name?.substring(0, 1)?.toUpperCase()}
            </div>
            ,
            width: '70px'
        },
        {
            name: 'Name',
            selector: row => row.Name.toUpperCase(),
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Role',
            selector: row => row.role,
        },
        {
            name: 'Status',
            cell: row => {
                return row.isActive ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ color: '#388E3B', background: '#E8F5E9', fontWeight: 400, fontSize: 12, padding: 3, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '80px', height: '20px' }}><ion-icon name="checkmark-outline"></ion-icon>Active </span> <div class="check-box">
                    <input type="checkbox" defaultChecked={true} onChange={() => { updateStatus({ email: row.email, status: !row.isActive }) }} />
                </div> </div> : <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ color: '#E13333', background: '#FFF5F5', fontWeight: 400, fontSize: 12, padding: 3, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '80px', height: '20px' }}><ion-icon name="close-outline"></ion-icon> InActive</span>
                    <div class="check-box">
                        <input type="checkbox" onChange={() => { updateStatus({ email: row.email, status: !row.isActive }) }} />
                    </div></div>
            },
            width: '200px',
            center: true
        }, {
            name: 'Admin Privileges',
            cell: (row) => {
                return row.role !== "Admin" ?
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', fontWeight: 400, fontSize: 12 }}>
                        <span style={{ color: '#6E75FF', background: '#F3F3FF', padding: 5, marginRight: 10, borderRadius: 5 }} onClick={() => { updateAdminStatus({ email: row.email, role: "Admin" }) }}>Change To Admin </span>
                    </span> : <span style={{ fontWeight: 400, fontSize: 12 }}>
                        <span style={{ color: '#6E75FF', background: '#F3F3FF', padding: 5, borderRadius: 5 }} onClick={() => { updateAdminStatus({ email: row.email, role: "Provider" }) }}>Remove From Admin  </span>
                    </span>
            },
            center: true
        },
        {
            name: 'Action',
            cell: (row) => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 400, fontSize: 12 }} onClick={() => { toggleOpen(); setUserData(row) }}>
                    <span style={{ color: '#6B6F76', background: '#EBEBEB', padding: 5, marginRight: 10, borderRadius: 5 }}>  <Tooltip content="Edit User" direction="left"><ion-icon name="create-outline"></ion-icon></Tooltip>  </span>
                </span>

                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 400, fontSize: 12 }} onClick={() => { deleteUser({email:row.email}) }}>
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

                <div style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', height: '40px', background: 'rgba(110, 117, 255, 1)', borderRadius: 5, marginLeft: '20px', border: '1px solid rgba(110, 117, 255, 1)', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', position: 'relative', padding: '0 5px', gap: '5px', fontSize: '15px' }} onClick={toggleOpen}>
                        <ion-icon name="person-add-outline" style={{ fontSize: '25px' }}></ion-icon>
                        Add members
                    </div>
                </div>

            </div>

            <DataTable
                title="Users"
                pagination
                columns={columns}
                data={data}
                pointerOnHover
                highlightOnHover
                sortIcon={true}
                progressPending={pending}
                onRowClicked={() => { }}
            />
        </div>
    )
}

export default UserTable