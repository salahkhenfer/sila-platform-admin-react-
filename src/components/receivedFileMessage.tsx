import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ImAttachment } from "react-icons/im";
import moment from "moment";

const receivedFileMessage = ({ msg } : { msg: any }) => {
  return (
    <div className='flex items-end gap-1 w-full relative'>
        <p className='absolute right-0 bottom-0 text-[14px] font-semibold text-[#7538D4]'>{moment(msg.created_at).format('LT')}</p>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='bg-[#eeeeee] max-w-[60%] flex items-center gap-2 rounded-2xl p-3'>
            <div className='h-[30px] w-[30px] min-h-[30px] min-w-[30px] rounded-full bg-[#7538D4] flex justify-center items-center'>
                <ImAttachment color='#fff' />
            </div>
            <a href={msg.content} target='_blank' className='truncate underline'>File Attachment</a>
        </div>
    </div>
  )
}

export default receivedFileMessage