import React, { useState, useEffect } from "react";
import "./modal.css";
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import { addAdminToOrg } from "../../services/organizationService";

const AddAdminModal = ({ setIsOpen, setLoadingUsers, orgData }) => {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (loading === true) {

            if (name === "") {
                toast("Name is required")
                setLoading(false)
                return;
            }

            if (email === "") {
                toast("User Id is required")
                setLoading(false)
                return;
            }

            if((/^[0-9A-Za-z]{6,16}$/).test(email)===false)
            {
                toast("User ID must be between 6 and 16 characters, alphanumeric only")
                setLoading(false)
                return;
            }

            
            if (password === "") {
                toast("Password is required")
                setLoading(false)
                return;
            }


            if ((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(password) === false) {
                toast("Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character (@$!%*?&) is required for password")
                setLoading(false)
                return;
            }

            if (confirmPassword !== password) {
                toast("The passwords are not mtaching. Please try again")
                setLoading(false)
                return;
            }

            const addAdmin = async () => {
                try {
                    const res = await addAdminToOrg({ email, password, name, organizationId: orgData.id })
                    if (res?.status === "success") {
                        toast('New Admin Added Sucessfully')
                        setIsOpen(false)
                        setLoading(false)
                    } else
                        throw new Error("Admin Add Failed");
                } catch (e) {
                    setLoading(false)
                    toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
                }
            }

            addAdmin()
        }
        // eslint-disable-next-line
    }, [loading])

    return (
        <>
            <div className='darkBG' onClick={() => setIsOpen(false)} />
            <ToastContainer />
            <div className='centered'>
                <div className='modal'>
                    <div className='modalHeader'>
                        <h5 className='heading'>Add Admin</h5>
                    </div>
                    <button className='closeBtn' onClick={() => setIsOpen(false)}>
                        <ion-icon name="close-outline"></ion-icon>
                    </button>

                    <div className="loginCardWrapper" style={{ padding: '10px' }}>
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
                                </svg>
                            </div> : <>
                                <span className="title">Name</span>

                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Enter Name"
                                    onChange={(e) => setName(e.target.value)}
                                    className='emailInput'
                                />

                                <span className="title">User ID</span>
                                <input
                                    type="text"
                                    value={email}
                                    placeholder="Enter your User Id"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='emailInput'
                                />

                                <span className="title">Password </span>
                                <div className="passwordInputWrapper">
                                    <div className="passwordInputInnerWrapper">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            placeholder="Enter your password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span
                                            className={`eye-icon ${showPassword ? 'visible' : ''}`}
                                            style={{ color: '#888888' }}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                        </span>
                                    </div>
                                </div>

                                <span className="resetPasswordTitle" style={{ marginTop: '10px' }}>Confirm Password</span>
                                <div className="passwordInputWrapper">
                                    <div className="passwordInputInnerWrapper">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            placeholder="Enter your password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <span
                                            className={`eye-icon ${showConfirmPassword ? 'visible' : ''}`}
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <button className="loginButton" style={{ border: 'none', cursor: 'pointer' }} onClick={() => { setLoading(true) }} >Add Admin To {orgData.organizationName}</button>
                                </div>
                            </>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddAdminModal;