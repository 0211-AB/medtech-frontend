import { useState, useEffect, useRef } from 'react';
import { useAudioLevels } from './useAudioLevels'
let socket = new WebSocket('wss://api.deepgram.com/v1/listen?model=nova-2-medical&smart_format=true', ['token', process.env.REACT_APP_DEEPGRAM_KEY])

const useRecorder = () => {
    const [error, setError] = useState('')
    const [recordingState, setRecordingState] = useState('idle');
    const [audioURL, setAudioURL] = useState('');
    const [time, setTime] = useState(0);
    const [blob, setBlob] = useState(null);
    const timerRef = useRef();
    const mediaRecorderRef = useRef();
    const audioLevel = useAudioLevels(recordingState === 'recording');
    const [audioFile, setAudioFile] = useState(null);
    const [transcript, setTranscript] = useState('')

    const getMic = async () => {
        try {
            const media = await navigator.mediaDevices.getUserMedia({ audio: true });
            return media;
        }
        catch (e) {
            setError("Permission for microphone has been denied. Please allow the site microphone permission in order to continue transcribing")
            throw new Error("Permission for microphone has been denied. Please allow the site microphone permission in order to continue transcribing")
        }
    }

    const startRecording = async () => {
        try {
            const media = await getMic()

            setRecordingState('recording');
            setTime(0);
            timerRef.current = window.setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);

            mediaRecorderRef.current = new MediaRecorder(media);
            const chunks = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                try {
                    if (socket.readyState === 3)
                        socket = new WebSocket('wss://api.deepgram.com/v1/listen?model=nova-2-medical&smart_format=true', ['token', process.env.REACT_APP_DEEPGRAM_KEY])

                    if (e.data.size > 0 && socket.readyState === 1)
                        socket.send(e.data)

                    socket.onmessage = msg => {
                        try {
                            const { transcript: transcriptData } = JSON.parse(msg.data)?.channel?.alternatives[0]
                            if (transcriptData) {
                                setTranscript(data => data + " " + transcriptData)
                            }
                        } catch (e) { console.log(e) }
                    }
                } catch (e) { console.log(e) }
                chunks.push(e.data);
            }


            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/mpeg' });
                setBlob(blob);
                setAudioURL(URL.createObjectURL(blob));

                const audioFile = new File([blob], 'recorded_audio.mp3', {
                    type: 'audio/mpeg',
                });
                setAudioFile(audioFile);
            };

            mediaRecorderRef.current.start(250);
        } catch (e) { console.log(e); setError(e.message) }
    };

    const pauseRecording = () => {
        setRecordingState('paused');
        clearInterval(timerRef.current);
        mediaRecorderRef.current?.pause();
    };

    const resumeRecording = () => {
        setRecordingState('recording');
        timerRef.current = window.setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);
        mediaRecorderRef.current?.resume();
    };

    const resetRecording = () => {
        window.location.reload()
    };

    const stopRecording = () => {
        setRecordingState('stopped');
        clearInterval(timerRef.current);
        mediaRecorderRef.current?.stop();
    };

    useEffect(() => {
        return () => {
            clearInterval(timerRef.current);
        };
    }, []);

    return {
        audioLevel,
        startRecording,
        pauseRecording,
        resumeRecording,
        stopRecording,
        resetRecording,
        timeElapsed: time,
        recordingState,
        isRecording: recordingState === 'recording',
        audioURL,
        audioFile,
        audioBlob: blob,
        transcript,
        setTranscript,
        error,
        setError
    };
};

export default useRecorder;
