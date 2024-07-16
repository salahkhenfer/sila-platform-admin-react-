import { FaFileCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { motion } from 'framer-motion';
import { TbPhotoSquareRounded } from "react-icons/tb";
import { IoVideocam } from "react-icons/io5";

const fileInspector = ({ 
    photo, 
    setPhoto, 
    video, 
    setVideo, 
    file, 
    setFile } : { 
    photo: any, 
    setPhoto: any, 
    video: any, 
    setVideo: any, 
    file: any, 
    setFile: any }) => {

        const removeFiles = () => {
            setPhoto(null);
            setVideo(null);
            setFile(null);
        };
  return (
    <motion.div 
        initial={{ y: "100%" }} 
        animate={{ y: 0 }}
        transition={{ type: "tween", duration: .3 }} 
        className='h-full w-full flex justify-center'>
        {
            photo != null && (
                <div className='h-full w-fit max-w-[15rem] bg-[#7438d43c] rounded-2xl flex items-center gap-2 p-3 relative'>
                    <div className='h-[30px] w-[30px] min-h-[30px] min-w-[30px] rounded-full bg-[#7538D4] flex justify-center items-center'>
                        <TbPhotoSquareRounded color='#fff' />
                    </div>
                    <p className='truncate'>{photo.name}</p>

                    <div onClick={removeFiles} className='absolute top-[-8px] right-0 cursor-pointer'><IoIosCloseCircle size={20} color='#7538D4' /></div>
                </div>
            )
        }
        
        {
            video != null && (
                <div className='h-full w-fit max-w-[15rem] bg-[#7438d43c] rounded-2xl flex items-center gap-2 p-3 relative'>
                    <div className='h-[30px] w-[30px] min-h-[30px] min-w-[30px] rounded-full bg-[#7538D4] flex justify-center items-center'>
                        <IoVideocam color='#fff' />
                    </div>
                    <p className='truncate'>{video.name}</p>

                    <div onClick={removeFiles} className='absolute top-[-8px] right-0 cursor-pointer'><IoIosCloseCircle size={20} color='#7538D4' /></div>
                </div>
            )
        }
        
        {
            file != null && (
                <div className='h-full w-fit max-w-[15rem] bg-[#7438d43c] rounded-2xl flex items-center gap-2 p-3 relative'>
                    <div className='h-[30px] w-[30px] min-h-[30px] min-w-[30px] rounded-full bg-[#7538D4] flex justify-center items-center'>
                        <FaFileCircleCheck color='#fff' />
                    </div>
                    <p className='truncate'>{file.name}</p>

                    <div onClick={removeFiles} className='absolute top-[-8px] right-0 cursor-pointer'><IoIosCloseCircle size={20} color='#7538D4' /></div>
                </div>
            )
        }
    </motion.div>
  )
}

export default fileInspector