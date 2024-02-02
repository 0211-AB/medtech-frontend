import React, { useState, useEffect } from 'react'
import { ReactComponent as Search } from '../../assets/search.svg'
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import Modal from '../../components/Modal/Modal';
import { toast, ToastContainer } from 'react-toastify'
import { changeAdminStatus, deleteUser, getAllUsers, updatedUserStatus } from '../../services/userService';
import UserTable from '../../components/Table/UserTable';
import EditModal from '../../components/Modal/EditModal';

const UserScreen = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [allUsers, setAllUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])
    const [searchKeyword, setSearchKeyword] = useState("")
    const [userData, setUserData] = useState(null)
    const [divHeight, setDivHeight] = useState(0);
    const [isEditOpen, setIsEditOpen] = useState(false)

    const deleteUserByEmail = async (request) => {
        try {
            const res = await deleteUser(request)
            if (res?.status === "success") {
                setLoading(true)
                toast(res.message)
            } else
                throw new Error("Failed To Update User Status");
        } catch (e) {
            console.log(e)
            setLoading(true)
            toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
        }
    }

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
            setUsers(allUsers.filter((u) => u.Name.includes(searchKeyword) || u.email.includes(searchKeyword)))
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
            {isOpen && <Modal setIsOpen={setIsOpen} setLoadingUsers={setLoading} />}
            {isEditOpen && <EditModal setIsOpen={setIsEditOpen} setLoadingUsers={setLoading} data={userData} />}
            <NavBar />
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', height: divHeight }}>
                <SideBar />
                <div style={{ flexGrow: '1', display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#F8F8F8' }}>

                    {loading ?
                        <div id='svg-container'>
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
                            </svg> </div> : <>
                            <div style={{ padding: '20px 50px', borderRadius: '10px' }}>
                                <UserTable data={users} searchKeyWord={searchKeyword} setSearchKeyWord={setSearchKeyword} pending={loading} updateAdminStatus={updateAdminStatus} updateStatus={updateStatus} toggleOpen={() => { setIsEditOpen(!isEditOpen) }} setUserData={setUserData} deleteUser={deleteUserByEmail}/>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>)
}

export default UserScreen