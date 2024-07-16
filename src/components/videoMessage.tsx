import { IoTime } from "react-icons/io5";
import { BsCheckAll } from "react-icons/bs";
import moment from "moment";

const videoMessage = ({ msg } : { msg: any }) => {
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
        <div className='h-[10rem] w-[40%] rounded-2xl overflow-hidden'>
            <video className='w-full h-full object-cover' src={msg.content} controls></video>
        </div>
    </div>
  )
}

export default videoMessage