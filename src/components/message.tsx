import { IoTime } from "react-icons/io5";
import { BsCheckAll } from "react-icons/bs";
import moment from "moment";

const message = ({ msg } : { msg: any }) => {
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
        <div className='bg-[#7538D4] p-2 w-fit rounded-2xl rounded-br-none max-w-[60%] break-words text-white'>
            <p>{msg.content}</p>
        </div>
    </div>
  )
}

export default message