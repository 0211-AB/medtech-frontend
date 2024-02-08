import React, { useState, useEffect } from "react";
import "./modal.css";
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import { createUser } from "../../services/authService";

const Modal = ({ setIsOpen, setLoadingUsers }) => {
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
                toast("Email is required")
                setLoading(false)
                return;
            }

            if ((/^\S+@\S+\.\S+$/).test(email) === false) {
                toast("Valid email is required")
                setLoading(false)
                return;
            }

            if (password === "") {
                toast("Password is required")
                setLoading(false)
                return;
            }

            if (confirmPassword !== password) {
                toast("The passwords are not mtaching. Please try again")
                setLoading(false)
                return;
            }


            if ((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).test(password) === false) {
                toast("Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character (@$!%*?&) is required for password")
                setLoading(false)
                return;
            }

            const signInUser = async () => {
                try {
                    const res = await createUser({ email, password, role: "Provider", name })
                    if (res?.status === "success") {
                        toast('New User Added Sucessfully')
                        setIsOpen(false)
                        setLoadingUsers(true)
                    } else
                        throw new Error("User Add Failed");
                } catch (e) {
                    toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
                }
            }

            signInUser()
            setLoading(false)
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
                        <h5 className='heading'>Add Member</h5>
                    </div>
                    <button className='closeBtn' onClick={() => setIsOpen(false)}>
                        <ion-icon name="close-outline"></ion-icon>
                    </button>

                    <div className="loginCardWrapper" style={{ padding: '10px' }}>
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
                            placeholder="Enter your email address"
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
                            <button className="loginButton" style={{ border: 'none', cursor: 'pointer' }} onClick={() => { setLoading(true) }} >Add Member</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;