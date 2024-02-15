import { useState, useEffect, useRef } from 'react';
import { useAudioLevels } from './useAudioLevels'
const socket = new WebSocket('wss://api.deepgram.com/v1/listen?model=nova-2-medical&smart_format=true', ['token', process.env.REACT_APP_DEEPGRAM_KEY])

const useRecorder = () => {
    const [error, setError] = useState('')
    const [recordingState, setRecordingState] = useState('idle');
    const [audioURL, setAudioURL] = useState('');
    const [time, setTime] = useState(0);
    const [blob, setBlob] = useState(null);
    const timerRef = useRef();
    const mediaRecorderRef = useRef();
    const mediaRef = useRef(null)
    const audioLevel = useAudioLevels(recordingState === 'recording');
    const [audioFile, setAudioFile] = useState(null);
    const [transcript, setTranscript] = useState('')

    const getMic = async () => {
        if (mediaRef.current === null) {
            try {
                const media = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRef.current = media
            }
            catch (e) {
                setError("Permission for microphone has been denied. Please allow the site microphone permission in order to continue transcribing")
            }
        }
    }

    const startRecording = async () => {
        await getMic()
        if (mediaRef.current === null) return;


        setRecordingState('recording');
        setTime(0);
        timerRef.current = window.setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);

        console.log(mediaRef.current)

        mediaRecorderRef.current = new MediaRecorder(mediaRef.current);
        const chunks = [];

        mediaRecorderRef.current.ondataavailable = (e) => {
            try {
                if (e.data.size > 0 && socket.readyState === 1)
                    socket.send(e.data)

                socket.onmessage = msg => {
                    try {
                        console.log(JSON.parse(msg.data))
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
