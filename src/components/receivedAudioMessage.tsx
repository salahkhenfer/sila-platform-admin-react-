import React, { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { PiWaveform } from "react-icons/pi";
import { Button } from "../components/ui/button";
import { IoPauseCircle } from "react-icons/io5";
import { IoPlayCircle } from "react-icons/io5";
import moment from "moment";

const receivedAudioMessage = ({ msg } : { msg: any }) => {

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
    <div className='flex items-end gap-1 w-full relative'>
        <p className='absolute right-0 bottom-0 text-[14px] font-semibold text-[#7538D4]'>{moment(msg.created_at).format('LT')}</p>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='bg-[#eeeeee] flex items-center gap-2 rounded-2xl p-3'>
            <audio ref={audioRef} src={msg.content}></audio>
            <PiWaveform size={30} color='#7538D4' />
            <p className='font-semibold text-[#7538D4] text-[15px]'>{formatTime(currentTime)}</p>
            <Button onClick={handlePlayPause} className='hover:bg-transparent' variant="ghost" size="icon">
                {
                    isPlaying ? (
                        <IoPauseCircle size={30} color='#7538D4' />
                    ) : (
                        <IoPlayCircle size={30} color='#7538D4' />
                    )
                }
            </Button>
        </div>
    </div>
  )
}

export default receivedAudioMessage