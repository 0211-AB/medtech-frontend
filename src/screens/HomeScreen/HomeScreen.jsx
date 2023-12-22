import React from 'react'
import './homeScreen.css'
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/Group.svg'
import { ReactComponent as File } from '../../assets/File.svg'
import { ReactComponent as Search } from '../../assets/search.svg'
import { ReactComponent as Filter } from '../../assets/filter.svg'

const meetings = [
    {
        name: 'Meeting ',
        date: 'Fri,Dec 12',
        time: '08:00 PM',
        duration: '22min',
    },
    {
        name: 'Meeting ',
        date: 'Fri,Dec 12',
        time: '10:00 PM',
        duration: '1h 02min',
    },
    {
        name: 'Meeting ',
        date: 'Thu,Dec 11',
        time: '06:20 PM',
        duration: '12min',
    },
    {
        name: 'Meeting ',
        date: 'Wed,Dec 10',
        time: '11:00 AM',
        duration: '21min',
    },
    {
        name: 'Meeting ',
        date: 'Tue,Dec 09',
        time: '12:50 AM',
        duration: '24min',
    },
]

function HomeScreen() {
    const navigate = useNavigate()
    // React.useEffect(() => {
    //     navigate('/login')
    // }, [])  
    return (
        <div>

            <div style={{
                height: '77px',
                width: '100%',
                boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.1)',
                padding: '20px 120px',
                display: 'flex',
                overflowY: 'hidden'

            }}>
                <Logo style={{ transform: 'scale(8)' }} />

                <div style={{
                    display: 'flex',
                    marginLeft: 'auto',
                    justifyContent: 'flex-end',
                    overflowY: 'hidden'
                }}>

                    <div style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '100%',
                        background: 'rgba(122, 90, 248, 1)',
                        color: 'white',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: '9px',
                    }}>
                        J
                    </div>

                    <div style={{
                        alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: '10px', marginLeft: '10px', overflowY: 'hidden'
                    }}>
                        jhondoe@gmail.com
                    </div>

                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', minWidth: '100vw' }}>

                <div style={{ width: '70px', Height: '100vh', background: 'rgba(51, 66, 96, 1)' }}>
                    <File style={{ transform: 'scale(4)', marginTop: '20px', marginLeft: '20px' }} />
                </div>

                <div style={{
                    background: 'rgba(248, 248, 248, 1)', width: '100%'
                }}>
                    <div style={{ padding: '20px 50px', display: 'flex' }}>
                        <span style={{
                            fontSize: '24px',
                            fontWeight: '500',
                            textAlign: 'left',
                        }}>
                            Transcriptions</span>

                        <div style={{ display: 'flex', width: '360px', height: '40px', background: 'white', marginLeft: '100px', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Search style={{ marginTop: 10, marginLeft: 10 }} />
                            {/* <inpu style={{}}>
                                Search meetings, transcripts...
                            </inpu> */}
                            <input
                                type="text"

                                placeholder="Search meetings, transcripts..."
                            />


                            <Filter style={{ marginLeft: 'auto' }} />
                        </div>


                    </div>

                    <div style={{ width: '100vw', minHeight: '100vh', background: '#fff' }}>
                        <div style={{ width: '100%', height: '20px', display: 'flex', alignItems: 'center', padding: '40px 30px', boxShadow: ' 0px -1px 0px 0px #EEEEEE inset' }}>
                            <span style={{ width: '50%', paddingLeft: 80 }}>Meeting</span>
                            <span style={{ width: '12%' }}>Date</span>
                            <span style={{ width: '12%' }}>Time</span>
                            <span style={{ width: '12%' }}>Duration</span>
                            <span style={{ width: '12%' }}>Action</span>
                        </div>


                        {meetings.map((meeting, index) => {
                            return <div style={{ width: '100%', height: '20px', display: 'flex', alignItems: 'center', padding: '40px 30px', }}>
                                <div style={{ width: '50%', paddingLeft: 80, justifyContent: 'center', display: 'flex', alignContent: 'center', justifyContent: 'flex-start' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '100%',
                                        background: 'rgba(122, 90, 248, 1)',
                                        color: 'white',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingTop: '10px',
                                    }}>
                                        J
                                    </div>
                                    <span style={{
                                        margin: 'auto 20px', fontFamily: 'Poppins',
                                        fontSize: '18px',
                                        fontWeight: '500',
                                        textAlign: 'left'
                                    }}>
                                        {meeting.name}{index + 1}
                                        <span style={{
                                            display: 'block', color: '#6E75FF', background: '#F3F3FF', padding: 5,
                                            fontFamily: 'Poppins',
                                            fontSize: '11px',
                                            fontWeight: '400',
                                            textAlign: 'left'
                                        }}>
                                            jhon@email.com
                                        </span>
                                    </span>
                                </div>
                                <span style={{ width: '12%', color: '#6B6F76', fontWeight: 400, fontSize: 12 }}>{meeting.date}</span>
                                <span style={{ width: '12%', color: '#6B6F76', fontWeight: 400, fontSize: 12 }}> {meeting.time} </span>
                                <span style={{ width: '12%', color: '#6B6F76', fontWeight: 400, fontSize: 12 }}> {meeting.duration} </span>
                                <span style={{ width: '12%', color: '#6B6F76', fontWeight: 400, fontSize: 12 }}></span>
                            </div>
                        })}

                    </div>
                </div>

            </div>

        </div >
    )
}

export default HomeScreen