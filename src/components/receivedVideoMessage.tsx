import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import moment from "moment";

const receivedVideoMessage = ({ msg } : { msg: any }) => {
  return (
    <div className='flex items-end gap-1 w-full relative'>
        <p className='absolute right-0 bottom-0 text-[14px] font-semibold text-[#7538D4]'>{moment(msg.created_at).format('LT')}</p>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='h-[10rem] w-[40%] rounded-2xl overflow-hidden'>
            <video className='w-full h-full object-cover' src={msg.content} controls></video>
        </div>
    </div>
  )
}

export default receivedVideoMessage