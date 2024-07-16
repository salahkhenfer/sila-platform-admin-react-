import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import moment from "moment";

const receivedMessage = ({ msg } : { msg: any }) => {
  return (
    <div className='flex items-end gap-1 w-full relative'>
        <p className='absolute right-0 bottom-0 text-[14px] font-semibold text-[#7538D4]'>{moment(msg.created_at).format('LT')}</p>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='bg-[#eeeeee] p-2 w-fit rounded-2xl rounded-bl-none max-w-[70%] break-words'>
            <p>{msg.content}</p>
        </div>
    </div>
  )
}

export default receivedMessage