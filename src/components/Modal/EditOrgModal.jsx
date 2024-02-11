import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { updateOrganization } from "../../services/organizationService";

const EditOrgModal = ({ setIsOpen, setLoadingOrgs, orgData }) => {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(orgData.organizationName);
    const [description, setDescription] = useState(orgData.organizationDescription);
    const [imageData, setImageData] = useState(orgData.imageData);

    const handleImageUpload = (e) => {
        let file = e.target.files[0];

        if (file) {
            let fileSize = file.size;

            if (fileSize > 5 * 1000000) {
                alert(
                    `File size is too large, please upload image of size less than 5MB.\nSelected File Size: ${fileSize / 1000000
                    }MB`
                );
                return;
            }

            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                var srcData = fileLoadedEvent.target.result;
                setImageData(srcData);
            }

            fileReader.readAsDataURL(file);
        }
        else
            setImageData(null);
    }

    useEffect(() => {
        if (loading === true) {

            if (name === "") {
                toast("Name is required")
                setLoading(false)
                return;
            }

            if (description === "") {
                toast("Description is required")
                setLoading(false)
                return;
            }

            const createOrg = async () => {
                try {
                    const res = await updateOrganization({ organizationName: name, organizationDescription: description, imageData, id: orgData.id })
                    if (res?.status === "success") {
                        toast('Organization Details Updated Sucessfully')
                        setIsOpen(false)
                        setLoadingOrgs(true)
                    } else
                        throw new Error("Organization Update Failed");
                } catch (e) {
                    toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
                }
            }

            createOrg()
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
                        <h5 className='heading'>Edit Organization</h5>
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

                                <span className="title">Description</span>
                                <input
                                    type="text"
                                    value={description}
                                    placeholder="Enter description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    className='emailInput'
                                />

                                <span className="title">Logo </span>
                                <div className="passwordInputWrapper">
                                    <div className="passwordInputInnerWrapper">
                                        <input type="file" id="img" name="img" accept="image/png,image/jpeg" onChange={handleImageUpload} />
                                    </div>
                                    {imageData !== null && <img src={imageData} style={{ height: 20, width: 'auto', marginRight: '10px' }} alt="Organization"/>}
                                </div>

                                <div>
                                    <button className="loginButton" style={{ border: 'none', cursor: 'pointer' }} onClick={() => { setLoading(true) }} >Edit Organization</button>
                                </div>
                            </>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditOrgModal;