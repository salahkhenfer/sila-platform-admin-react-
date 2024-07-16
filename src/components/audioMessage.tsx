import React, { useState, useRef, useEffect } from 'react';
import { PiWaveform } from "react-icons/pi";
import { Button } from "../components/ui/button";
import { IoPauseCircle } from "react-icons/io5";
import { IoPlayCircle } from "react-icons/io5";
import { IoTime } from "react-icons/io5";
import { BsCheckAll } from "react-icons/bs";
import moment from "moment";

const audioMessage = ({ msg } : { msg: any }) => {
    
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const handlePlayPause = () => {
        if (audioRef.current) {
          if (isPlaying) {
            audioRef.current.pause();
          } else {
            audioRef.current.play();
          }
          setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
      const audio = audioRef.current;
  
      const updateCurrentTime = () => {
        if (audio) {
          setCurrentTime(audio.currentTime);
        }
      };
  
      const handleAudioEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };
  
      if (audio) {
        audio.addEventListener('timeupdate', updateCurrentTime);
        audio.addEventListener('ended', handleAudioEnded);
      }
  
      return () => {
        if (audio) {
          audio.removeEventListener('timeupdate', updateCurrentTime);
          audio.removeEventListener('ended', handleAudioEnded);
        }
      };
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

  return (
    <div className='flex items-end gap-1 w-full justify-end relative'>
        <div className='absolute left-0 bottom-0 flex items-center gap-1'>
          <p className='text-[14px] font-semibold text-[#7538D4]'>{moment(msg.created_at).format('LT')}</p>
          {
            msg.sending ? (
              <IoTime color='#7538D4' />
            ) : (
              <BsCheckAll color='#7538D4' />
            )
          }
        </div>
        <div className='bg-[#7538D4] flex items-center gap-2 rounded-2xl p-3'>
            <audio ref={audioRef} src={msg.content}></audio>
            <PiWaveform size={30} color='#fff' />
            <p className='font-semibold text-white text-[15px]'>{formatTime(currentTime)}</p>
            <Button onClick={handlePlayPause} className='hover:bg-transparent' variant="ghost" size="icon">
                {
                    isPlaying ? (
                        <IoPauseCircle size={30} color='#fff' />
                    ) : (
                        <IoPlayCircle size={30} color='#fff' />
                    )
                }
            </Button>
        </div>
    </div>
  )
}

export default audioMessage