import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import moment from 'moment'
import Curogram from '../../assets/curogramIcon.png'
import Meet from '../../assets/meetIcon.png'
import Teams from '../../assets/teams.png'
import Zoom from '../../assets/zoom.svg'
import ScribeAi from '../../assets/mic.png'
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import { ReactComponent as Search } from '../../assets/search.svg'

function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs + ' hrs ' + mins + ' mins ' + secs + ' secs ';
}

const Table = ({ data, pending, searchKeyWord, setSearchKeyWord, state, setState, setIsOpen, setFunctionData, dontShow }) => {
    const navigate = useNavigate()
    const [showDatePicker, setShowDatePicker] = useState(false)

    const columns = [
        {
            name: "",
            cell: (row) => <span>
                {row.meetingPlatform === "CUROGRAM" ? <img style={{ height: '20px' }} src={Curogram} data-tag="allowRowEvents" alt="Curogram" />
                    : row.meetingPlatform === "MEET" ? <img style={{ height: '20px' }} src={Meet} data-tag="allowRowEvents" alt="Meet" />
                        : row.meetingPlatform === "ZOOM" ? <img style={{ height: '20px' }} src={Zoom} data-tag="allowRowEvents" alt="Zoom" />
                            : row.meetingPlatform === "SCRIBE-AI" ? <img style={{ height: '20px' }} src={ScribeAi} data-tag="allowRowEvents" alt="ScribeAi" /> : <img style={{ height: '20px' }} src={Teams} data-tag="allowRowEvents" alt="MSTeams" />}
            </span>
            ,
            width: '56px',
        },
        {
            name: 'Meeting',
            selector: row => row.meetingName,
        },
        {
            name: 'Date',
            selector: row => moment(row.createdAt).format('dddd MMMM Do'),
            sortable: true,
            sortFunction: (rowA, rowB) => { return rowA.createdAt < rowB.createdAt }
        },
        {
            name: 'Time',
            selector: row => moment(row.createdAt).format('h:mm a'),
        },
        {
            name: 'Duration',
            selector: row => msToTime(row.duration),
        },
        {
            name: 'Action',
            cell: (row) => <span style={{ color: '#6e75ff', fontWeight: 400, fontSize: 15, marginLeft: '3%' }} onClick={() => { setIsOpen(true); setFunctionData({ type: "DELETE-TRANSCRIPT", data: { id: row.id } }) }}>
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
            {dontShow === true ? <></> : <>{showDatePicker === true && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: '999', background: 'rgb(248, 248, 248)', padding: '10px', borderRadius: '5px', border: '1px solid gray', flexDirection: 'column', gap: '10px', right: '0%', }}>
                <DateRange
                    editableDateInputs={true}
                    onChange={item => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: "100%", gap: '10px' }}>
                    <span style={{ padding: '5px 10px', borderRadius: '4px', background: 'lightgray', cursor: 'pointer' }} onClick={() => { setShowDatePicker(false); setState([{ startDate: null, endDate: null, key: 'selection' }]) }}>Cancel</span>

                    <span style={{ padding: '5px 10px', borderRadius: '4px', background: 'lightgray', cursor: 'pointer' }} onClick={() => { setShowDatePicker(false) }}>Apply</span>
                </div>
            </div>}

                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>

                    <div style={{ display: 'flex', width: '360px', height: '40px', background: '#F6F6F6', borderRadius: 5, justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(126, 137, 168, 1)' }}>
                        <Search style={{ marginLeft: 10 }} />
                        <input
                            type="text"
                            placeholder="Search by Meeting Name"
                            value={searchKeyWord}
                            onChange={(e) => { setSearchKeyWord(e.target.value) }}
                            style={{ height: '38px', color: 'rgba(126, 137, 168, 1)', background: '#F6F6F6' }}
                        />
                    </div>

                    <div style={{ display: 'flex', height: '40px', width: '200px', background: 'rgba(110, 117, 255, 1)', borderRadius: 5, marginLeft: '20px', border: '1px solid rgba(110, 117, 255, 1)', justifyContent: 'center', alignItems: 'center', color: 'white', cursor: 'pointer', position: 'relative', padding: '0 5px', gap: '5px', fontSize: '15px' }} onClick={() => { setShowDatePicker(true) }}>
                        <ion-icon name="calendar-number-outline" style={{ fontSize: '20px' }}></ion-icon>
                        Select Date Range
                    </div>

                </div></>}

            <DataTable
                title="Transcriptions"
                pagination
                columns={columns}
                data={data}
                pointerOnHover
                highlightOnHover
                sortIcon={true}
                progressPending={pending}
                onRowClicked={(row, event) => { navigate(`/transcript-details?${row.id}`) }}
            />
        </div>
    )
}

export default Table