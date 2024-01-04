import React, { useState, useEffect } from 'react'
import { ReactComponent as Search } from '../../assets/search.svg'
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import Modal from '../../components/Modal/Modal';
import { toast, ToastContainer } from 'react-toastify'
import { changeAdminStatus, getAllUsers, updatedUserStatus } from '../../services/userService';

const getRandomNumber = (limit) => {
    return Math.floor(Math.random() * limit);
};

const setBackgroundColor = () => {
    const h = getRandomNumber(360);
    const randomColor = `hsl(${h}deg, 50%, 30%)`;

    return randomColor;
};

const UserScreen = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [allUsers, setAllUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])
    const [searchKeyword, setSearchKeyword] = useState("")
    const [tab, setTab] = useState("active")
    const [divHeight, setDivHeight] = useState(0);

    const updateStatus = async (request) => {
        try {
            const res = await updatedUserStatus(request)
            if (res?.status === "success") {
                setLoading(true)
                toast("Updated User status sucessfully")
            } else
                throw new Error("Failed To Update User Status");
        } catch (e) {
            setLoading(true)
            toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
        }
    }

    const updateAdminStatus = async (request) => {
        try {
            const res = await changeAdminStatus(request)
            if (res?.status === "success") {
                setLoading(true)
                toast("Changed admin status sucessfully")
            } else
                throw new Error("Failed To Update User Status");
        } catch (e) {
            setLoading(true)
            toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
        }
    }

    useEffect(() => {
        if (searchKeyword !== "")
            setUsers(allUsers.filter((u) => u.Name.startsWith(searchKeyword) || u.email.startsWith(searchKeyword)))
        else
            setUsers(allUsers)
    }, [searchKeyword])

    useEffect(() => {
        function handleResize() {
            const windowHeight = window.innerHeight;
            setDivHeight(windowHeight - 77);
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (loading === true) {
            const getUsers = async () => {
                try {
                    const res = await getAllUsers()
                    if (res?.status === "success") {
                        setUsers(res.results)
                        setAllUsers(res.results)
                    } else
                        throw new Error("Failed To Fetch All Users");
                } catch (e) {
                    setUsers([])
                    toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
                }
            }
            getUsers()
            setLoading(false)
        }
        // eslint-disable-next-line
    }, [loading])

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <ToastContainer />
            {isOpen && <Modal setIsOpen={setIsOpen} setLoadingUsers={setLoading}/>}
            <NavBar />
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', height: divHeight }}>
                <SideBar />
                <div style={{ flexGrow: '1', display: 'flex', flexDirection: 'column', background: '#Fff', height: '100%' }}>

                    <div style={{ padding: '20px 50px', display: 'flex', alignItems: 'center' }}>
                        <span style={{
                            fontSize: '24px',
                            fontWeight: '500',
                            textAlign: 'left',
                            marginRight: '50px'
                        }}>
                            Team</span>

                        <div style={{ fontSize: '12px', padding: '10px', fontWeight: '500', borderBottom: tab === "active" ? '2px solid #3F51B5' : '', color: tab === "active" ? '#3F51B5' : '#0000008A', cursor: 'pointer' }} onClick={() => { setTab("active") }}>ACTIVE ({users.filter((u) => u.isActive)?.length ? users.filter((u) => u.isActive)?.length : 0})</div>

                        <div style={{ fontSize: '12px', fontWeight: '500', color: tab === "inactive" ? '#3F51B5' : '#0000008A', padding: '10px', cursor: 'pointer', borderBottom: tab === "inactive" ? '2px solid #3F51B5' : '', }} onClick={() => { setTab("inactive") }}> DEACTIVATED ({users.filter((u) => u.isActive === true)?.length ? users.filter((u) => u.isActive === false)?.length : 0})</div>

                        <div style={{ display: 'flex', width: '360px', height: '40px', background: '#F6F6F6', marginLeft: '35%', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Search style={{ marginTop: 10, marginLeft: 10 }} />
                            <input
                                type="text"
                                placeholder="Search by name or user ID"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
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

                    {(tab === "active" && users.filter((u) => u.isActive)?.length > 0) ? users.filter((u) => u.isActive).map((user, index) => {
                        return <div style={{ width: '100%', height: '20px', display: 'flex', alignItems: 'center', padding: '40px 0px', cursor: 'pointer', }} key={index}>
                            <div style={{ width: '25%', paddingLeft: 50, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <div style={{
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
                                    {user.Name?.substring(0, 1)?.toUpperCase()}
                                </div>
                                <span style={{
                                    margin: 'auto 20px', fontFamily: 'Poppins',
                                    fontSize: '15px',
                                    fontWeight: '500',
                                    textAlign: 'left', color: '#3C4149'
                                }}>
                                    {user.Name} {user.role === "Admin" ? ' (Admin)' : ''}
                                    <span style={{
                                        display: 'block', padding: 2,
                                        fontFamily: 'Poppins',
                                        color: '#6B6F76',
                                        fontSize: '11px',
                                        fontWeight: '400',
                                        textAlign: 'left'
                                    }}>
                                        {user.email}
                                    </span>
                                </span>
                            </div>
                            <span style={{ width: '5%', color: '#388E3B', background: '#E8F5E9', fontWeight: 400, fontSize: 12, padding: 3, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}><ion-icon name="checkmark-outline"></ion-icon>Active</span>

                            {user.role !== "Admin" && <div style={{ position: 'absolute', right: '100px' }}><span style={{ width: '15%', fontWeight: 400, fontSize: 12 }}>
                                <span style={{ color: '#6E75FF', background: '#F3F3FF', padding: 5, marginRight: 10, borderRadius: 5 }} onClick={() => { updateAdminStatus({ email: user.email, role: "Admin" }) }}>Change To admin  </span>
                            </span>

                                <span style={{ width: '15%', fontWeight: 400, fontSize: 12 }}>
                                    <span style={{ color: '#6B6F76', background: '#EBEBEB', padding: 5, marginRight: 10, borderRadius: 5 }} onClick={() => { updateStatus({ email: user.email, status: false }) }}>  Deactivate  </span>
                                </span>

                                <span style={{ width: '15%', fontWeight: 400, fontSize: 12 }}>
                                    <span style={{ color: '#E13333', background: '#FFF5F5', padding: 5, borderRadius: 5 }}>Remove  </span>
                                </span>
                            </div>}

                            {user.role === "Admin" && <div style={{ position: 'absolute', right: '100px' }}><span style={{ width: '15%', fontWeight: 400, fontSize: 12 }}>
                                <span style={{ color: '#6E75FF', background: '#F3F3FF', padding: 5, borderRadius: 5 }} onClick={() => { updateAdminStatus({ email: user.email, role: "Provider" }) }}>Change To non-admin  </span>
                            </span>
                            </div>}
                        </div>
                    }) : (tab === "inactive" && users.filter((u) => u.isActive === false)?.length > 0) ? users.filter((u) => u.isActive === false).map((user, index) => {
                        return <div style={{ width: '100%', height: '20px', display: 'flex', alignItems: 'center', padding: '40px 0px', cursor: 'pointer' }} key={index}>
                            <div style={{ width: '25%', paddingLeft: 50, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <div style={{
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
                                    {user.Name?.substring(0, 1)?.toUpperCase()}
                                </div>
                                <span style={{
                                    margin: 'auto 20px', fontFamily: 'Poppins',
                                    fontSize: '15px',
                                    fontWeight: '500',
                                    textAlign: 'left', color: '#3C4149'
                                }}>
                                    {user.Name} {user.role === "Admin" ? ' (Admin)' : ''}
                                    <span style={{
                                        display: 'block', padding: 2,
                                        fontFamily: 'Poppins',
                                        color: '#6B6F76',
                                        fontSize: '11px',
                                        fontWeight: '400',
                                        textAlign: 'left'
                                    }}>
                                        {user.email}
                                    </span>
                                </span>
                            </div>
                            <span style={{ width: '5%', color: '#388E3B', background: '#E8F5E9', fontWeight: 400, fontSize: 12, padding: 3, borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}><ion-icon name="checkmark-outline"></ion-icon>Active</span>

                            {user.role !== "Admin" && <div style={{ position: 'absolute', right: '100px' }}><span style={{ width: '15%', fontWeight: 400, fontSize: 12 }}>
                                <span style={{ color: '#6E75FF', background: '#F3F3FF', padding: 5, marginRight: 10, borderRadius: 5 }} onClick={() => { updateAdminStatus({ email: user.email, role: "Admin" }) }}>Change To admin </span>
                            </span>

                                <span style={{ width: '15%', fontWeight: 400, fontSize: 12 }}>
                                    <span style={{ color: '#6B6F76', background: '#EBEBEB', padding: 5, marginRight: 10, borderRadius: 5 }} onClick={() => { updateStatus({ email: user.email, status: true }) }}>  Activate  </span>
                                </span>

                                <span style={{ width: '15%', fontWeight: 400, fontSize: 12 }}>
                                    <span style={{ color: '#E13333', background: '#FFF5F5', padding: 5, borderRadius: 5 }}>Remove  </span>
                                </span>
                            </div>}

                            {user.role === "Admin" && <div style={{ position: 'absolute', right: '100px' }}><span style={{ width: '15%', fontWeight: 400, fontSize: 12 }}>
                                <span style={{ color: '#6E75FF', background: '#F3F3FF', padding: 5, borderRadius: 5 }} onClick={() => { updateAdminStatus({ email: user.email, role: "Provider" }) }}>Change To non-admin  </span>
                            </span>
                            </div>}

                        </div>
                    }) : <div style={{ width: '100%', height: '20px', display: 'flex', alignItems: 'center', padding: '20px 50px' }}>No Users Found...</div>}
                </div>
            </div>
        </div>)
}

export default UserScreen