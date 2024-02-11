import React, { useState, useEffect } from "react";
import "./modal.css";
import { toast, ToastContainer } from "react-toastify";
import { updatePrompt } from "../../services/promptService";

const EditPromptModal = ({ setIsOpen, setLoading, data }) => {
  const [name, setName] = useState(data.promptName);
  const [prompt, setPrompt] = useState(data.promptText);
  const [newData, setNewData] = useState(null)

  useEffect(() => {

    const updateUserDetails = async () => {


      if (name === "") {
        toast("Prompt Name is required")
        setNewData(null)
        return;
      }

      if (prompt === "") {
        toast("Prompt is required")
        setNewData(null)
        return;
      }

      try {
        const res = await updatePrompt(newData)
        setNewData(null)
        if (res?.status === "success") {
          toast('Updated Prompt Sucessfully')
          setIsOpen(false)
          setLoading(true)
        } else
          throw new Error("Prompt Update Failed");
      } catch (e) {
        setIsOpen(false)
        toast(e?.response?.data?.message ? e?.response?.data?.message : "An error occured. Please try again")
      }
    }

    if (newData !== null)
      updateUserDetails()

    // eslint-disable-next-line
  }, [newData])

  return (
    <>
      <div className='darkBG' onClick={() => setIsOpen(false)} />
      <ToastContainer />
      <div className='centered'>
        <div className='modal' style={{ width: 800 }}>
          <div className='modalHeader'>
            <h5 className='heading'>Edit Prompt</h5>
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

            <span className="title">Prompt Text</span>
            <textarea
              value={prompt}
              placeholder="Enter your prompt"
              onChange={(e) => setPrompt(e.target.value)}
              style={{ height:100, padding: 5, outline: "none", border: '1px solid #cbd5e1', borderRadius: 5 }}
            />

            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
              <button className="loginButton" style={{ border: 'none', cursor: 'pointer', padding: 0,width:'25%' }} onClick={() => { setNewData({ name, prompt, id: data.id }) }} >{newData === null ? 'OK' : <div class="scribe-transcript-loader"></div>}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPromptModal;