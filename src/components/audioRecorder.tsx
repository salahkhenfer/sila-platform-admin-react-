import React, { useEffect, useState, useRef, SetStateAction, Dispatch } from 'react';
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { BsFillStopCircleFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";

const audioRecorder = ({ 
  setStartRecording, 
  audioFile, 
  setAudioFile, 
  audioURL, 
  setAudioURL } : { 
  setStartRecording: Dispatch<SetStateAction<boolean>>, 
  audioFile: any,
  setAudioFile: any,
  audioURL: any,
  setAudioURL: any }) => {

  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event: BlobEvent) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = () => {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          //File conversion
          const audioFile = blobToAudioFile(audioBlob);
          setAudioFile(audioFile);
          //
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioURL(audioUrl);
          setRecordingTime(0);
          audioChunksRef.current = [];
        };

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        startTimer();
      } catch (err) {
        alert(`Error accessing microphone: ${err}`);
        setStartRecording(false);
      }
    })();
  }, []);

  const blobToAudioFile = (blob: Blob) => {
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const filename = `recorded_audio_${timestamp}.wav`;
    const audioFile = new File([blob], filename, { type: 'audio/wav' });
    return audioFile;
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setRecordingTime(prevTime => prevTime + 1);
    }, 2000);
  };

  const stopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const closeRecordingWindow = () => {
    setStartRecording(false);
    setAudioFile(null);
    setAudioURL(null);
  };

  return (
    <div className='h-full w-full flex items-center justify-between'>
        {
          audioURL != null && audioFile != null ? (
            <div className='h-full w-full flex items-center justify-between'>
              <audio className='h-full w-[90%]' controls src={audioURL}></audio>
              <Button onClick={closeRecordingWindow} variant="ghost" size="icon">
                <IoIosCloseCircle size={20} />
              </Button>
            </div>
          ) : (
            <>
              <motion.div 
                  animate={{ opacity: [0, 1, 0] }} 
                  transition={{ type: "tween", duration: 1, repeat: Infinity }}
                  className='h-[15px] w-[15px] rounded-full bg-[red]' 
              />

              <p className='font-semibold'>{formatTime(recordingTime)}</p>

              <Button onClick={stopRecording} variant="outline" size="icon">
                <BsFillStopCircleFill size={20} />
              </Button>
            </>
          )
        }
    </div>
  )
}

export default audioRecorder